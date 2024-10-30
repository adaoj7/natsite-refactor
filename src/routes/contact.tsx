// import React from "react";
import Spacer from "../components/Spacer";
import MapPicture from "../assets/site-images/Screenshot 2024-03-19 212513.png";

export default function Contact() {
  return (
    <>
      <Spacer />
      <div className="w-full justify-center phone:flex desktop:hidden">
        <ContactMobile />
      </div>
      {/* Maybe change the breakpoint */}
      <div className="hidden w-full justify-center desktop:flex">
        <ContactDesktop />
      </div>
    </>
  );
}

function ContactMobile() {
  return (
    <>
      <div className="card">
        <div className="card-body flex flex-col justify-center align-middle text-xl">
          <h2 className="card-title flex justify-center text-3xl">Contact</h2>
          <div>
            <div className="mt-4">
              <p className="">
                For any questions or feedback please contact us
              </p>
              <p className="my-4">
                Email:{" "}
                <button
                  onClick={() =>
                    // @ts-expect-error window is not defined
                    (window.location = "mailto:peorianativities@gmail.com")
                  }
                  className=""
                >
                  peorianativities@gmail.com
                </button>
              </p>
              <p className="">Ruth Thompson</p>
              <p className="">Tel: 309-361-9956</p>
            </div>
          </div>
          <div className="mt-4 font-semibold">Address:</div>
          <button
            onClick={() =>
              window.open(
                `https://www.google.com/maps/place/The+Community+Festival+of+Nativities/@40.7352662,-89.6539589,15.5z/data=!4m6!3m5!1s0x880a5c39a382250d:0x6fcfa24cada00e1b!8m2!3d40.732102!4d-89.651485!16s%2Fg%2F11f63xgxt0?entry=ttu`
              )
            }
            className="btn flex justify-center whitespace-nowrap font-bold shadow-sm"
            title="Address in Google Maps"
          >
            3700 West Reservoir Boulevard
          </button>
        </div>
      </div>
    </>
  );
}

function ContactDesktop() {
  return (
    <div className="card justify-center">
      <div className="card-body">
        <h2 className="card-title justify-center text-2xl">Contact</h2>
        <div className="my-8 flex flex-row justify-center">
          <div className="mt-8 text-xl">
            <div>For any questions or feedback please contact us</div>
            <div className="my-4">
              Email:{" "}
              <button
                onClick={() =>
                  // @ts-expect-error window is not defined
                  (window.location = "mailto:peorianativities@gmail.com")
                }
                className=""
              >
                peorianativities@gmail.com
              </button>
            </div>
            <div className="">
              <p className="">Ruth Thompson</p>
              <p className="">Tel: 309-361-9956</p>
            </div>
          </div>
          <button
            onClick={() =>
              window.open(
                `https://www.google.com/maps/place/The+Community+Festival+of+Nativities/@40.7352662,-89.6539589,15.5z/data=!4m6!3m5!1s0x880a5c39a382250d:0x6fcfa24cada00e1b!8m2!3d40.732102!4d-89.651485!16s%2Fg%2F11f63xgxt0?entry=ttu`
              )
            }
            title="Link to Google Maps"
            className="mx-10 flex w-1/3 justify-end"
          >
            <img src={MapPicture} className="w-full" />
          </button>
        </div>
      </div>
    </div>
  );
}
