import { useEffect, useState } from "react";
import Firebase from "./Firebase";

const MeetingsMain = () => {
  const [url, setURL] = useState("");

  useEffect(() => {
    Firebase.app()
      .storage("gs://meeting-dock-74871.appspot.com")
      .ref()
      .child("build-files")
      .listAll()
      .then(function (result) {
        let items = result.items
          .filter((x) => x.name.endsWith(".dmg"))
          .filter((x) => x.name.startsWith("Meetings_"))
          .sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });

        if (items.length > 0) {
          items[0].getDownloadURL().then((url) => setURL(url));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  return (
    <>
      <main className="mt-40 px-4 max-w-3xl mx-auto">
        <div className="flex justify-center">
          <span className="text-7xl tracking-tight my-auto font-bold">
            Meetings
          </span>
          <span className="my-auto ml-4 text-4xl font-thin"> by WorkOS</span>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-2xl tracking-tight font-light mt-8 text-center">
            Automatically keep track of notes, tasks and links and save them
            next to the calendar event so they're easier to access
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-xl text-center"></div>
        </div>
        <div className="flex justify-center mt-10">
          <a
            href={url}
            className="shadow w-1/2 flex items-center justify-center border border-transparent font-medium rounded-lg text-white bg-black hover:bg-gray-800 py-4 text-lg px-8"
          >
            <svg
              className="w-6 h-6 ml-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
            <span className="mt-1 ml-5"> Download </span>
          </a>
        </div>
        <div className="mt-3 text-xs text-gray-300 flex justify-center">
          Meetings is built by Workdock | 2261 Market Street #4205, San
          Francisco, CA 94114
        </div>
        <div className="mt-3 text-xs text-gray-600 flex justify-center underline">
          <a href="meeting-privacy.html">
            We care about your privacy. Read our full privacy policy
          </a>
        </div>
        <div className="mt-3 text-xs text-gray-600 flex justify-center">
          <span className="text-center">
            Meetings use of information received from Google APIs will adhere to
            the{" "}
            <a
              className="underline"
              href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </span>
        </div>
      </main>
      <div className="flex justify-items-center mt-20">
        <div className="h-full mx-40 visible">
          <img className="" src="meetings.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default MeetingsMain;
