import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

let search = window.location.search;
let params = new URLSearchParams(search);
let email = params.get("email");

const Hiring = () => {
  const handleLogin = async (googleData) => {
    const json = JSON.stringify({
      email: email,
      work_email: googleData.profileObj.email,
      creds: googleData.qc,
    });

    await axios
      .post(`https://api.workdock.app/work-connection/work-email`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (data) => {
        setFinished(true);
      });
  };

  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const json = JSON.stringify({
      email: email,
    });

    axios.post(`https://api.workdock.app/work-connection/user`, json, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  return (
    <>
      <div className="flex h-screen max-w-xl mx-auto">
        <div className="m-auto">
          <img
            src="meetings-apple-touch-icon.png"
            alt="logo"
            className="w-24 h-24 m-auto mb-4"
          />
          <div className="font-black text-4xl text-center">
            Product Design Role: Workdock
          </div>
          <div className="font-semibold text-2xl text-center mt-4">
            Connect with your work e-mail
          </div>
          {finished && (
            <div className="">
              Thanks, we will contact you shortly about the role and to get
              feedback on using this
            </div>
          )}
          {finished === false && (
            <>
              <div className="mt-4 text-center">
                This is so we can check if we have any common connections. It'll
                help move your application go to the top of the list if we do.
              </div>
              <div className="mt-4 text-center">
                <GoogleLogin
                  clientId="751585965793-qr0a79nj4ln6g7ot93qncb8mdc2lc7rb.apps.googleusercontent.com"
                  buttonText="Log in with Google"
                  accessType="offline"
                  onSuccess={handleLogin}
                  onFailure={(error) => {
                    console.log(JSON.stringify(error));
                  }}
                  cookiePolicy={"single_host_origin"}
                  scope="https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email"
                />
              </div>
              <div className="mt-4 text-xs text-center text-gray-700 w-72 m-auto">
                p.s. We don't use this data for anything else, and we won't
                contact anyone from your list until we ask you if it is ok.
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Hiring;
