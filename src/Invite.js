import { useEffect, useState } from "react";
import Firebase from './Firebase'
import { useClipboard } from "use-clipboard-copy";

const Invite = ({ fromEmail }) => {
    const [name, setName] = useState("");
    const [copied, setCopied] = useState(false);
    const [url, setURL] = useState("");
    const [version, setVersion] = useState("");
    const clipboard = useClipboard({});

    useEffect(() => {
        var db = Firebase.database();

        const _fromEmail = fromEmail.replace(/\./g, "_")
        db.ref(_fromEmail).child("display_name").once('value')
            .then((snapshot) => {
                let v = snapshot.val()
                setName(v.split(" ")[0])

                Firebase.app().storage("gs://work-dock-macos").ref().listAll().then(function (result) {
                    let items = result.items
                        .filter(x => x.name.endsWith(".dmg"))
                        .filter(x => x.name.match(/Workdock_.*\.dmg/g))
                        .sort((a, b) => {
                            if (a.name < b.name) { return 1; }
                            if (a.name > b.name) { return -1; }
                            return 0;
                        })

                    if (items.length > 0) {
                        items[0].getDownloadURL().then(url => setURL(url))
                        setVersion(items[0].name.split('_')[1].split(".dmg")[0])
                    }
                }).catch(function (error) {
                    console.log(error)
                });

            })
    });

    return (
        <div>
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 h-screen">
                    <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
                    <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"></div>
                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-48 lg:px-8">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Chat with {name} on Workdock</span>
                            </h1>
                            <p className="mt-3 text-black sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-2xl lg:mx-0 font-semi">Workdock replaces Zoom for unscheduled calls</p>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">You can see teammates, like {name}, as avatars directly on your MacOS dock and start a voice call or screen-share with one click.</p>
                            {!copied && (
                                <div className="mt-5 sm:mt-8 sm:justify-center lg:justify-start md:w-auto lg:w-96 invisible md:visible">
                                    <div className="rounded-md shadow">
                                        <div onClick={() => {
                                            clipboard.copy(`https://workdock.app/?invitedby=${fromEmail}`);
                                            setCopied(true);
                                        }} className="cursor-pointer w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-7">
                                            <span className="mt-1 ml-5">👍  Accept invite </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {copied && (
                                <iframe src={`workdock://${fromEmail.replace(/@/g, "__")}`} width="0" height="0"></iframe>
                            )}
                            {copied && (
                                <div>
                                    <div className="mt-3 font-bold text-base text-black sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">To accept {name}'s invite, download and sign in below if you haven't done so already</div>
                                    <div className="mt-5 sm:mt-8 sm:justify-center lg:justify-start md:w-auto lg:w-96 invisible md:visible">
                                        <div className="rounded-md shadow">
                                            <a href={url} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-7">
                                                <svg className="w-6 h-6 ml-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>
                                                <span className="mt-1 ml-5"> Workdock </span>
                                            </a>
                                        </div>
                                        <a className="mt-3 cursor-pointer text-sm text-gray-500 underline" href={`workdock://${fromEmail.replace(/@/g, "__")}`}>Didn't work? Click here to launch Workdock</a>
                                    </div>
                                </div>
                            )}
                            <div className="sm:mt-8 sm:justify-center lg:justify-start md:w-auto lg:w-96 visible sm:invisible">
                                <div className="rounded-md shadow">
                                    <span className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-gray-300 md:py-4 md:text-lg md:px-7">
                                        <span className="mt-1 text-center">Use your Mac to download Workdock</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full invisible md:visible mt-5">
                <img className="h-full w-full object-cover object-left sm:h-72 md:h-96 lg:w-full lg:h-full" src="workdock.png" alt="" />
            </div>
        </div>
    );
}

export default Invite;