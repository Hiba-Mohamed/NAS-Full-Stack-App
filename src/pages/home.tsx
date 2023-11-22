import { Link } from "react-router-dom";

export function Home() {
  return (
    <div
      className="bg-cover bg-repeat bg-opacity-10 h-screen mx-auto"
    >
      <div className="font-nunito flex flex-row relative max-w-3xl sm:max-w-5xl mx-auto mb-16 pt-20">
        <div className="flex flex-col items-center w-screen mb-8">
          <img
            src="images/NAS-logo.png"
            className="w-20 sm:w-20"
            alt="Nurses Assignment Sheet logo"
          />
          <img
            src="images/nurse-pic.png"
            className="w-72 sm:w-80"
            alt="A picture of two pictures side by side, on the left, two nurses in nursing station, and on the right a picture of a nurse caring for a patient"
          />

          <p className="text-nunito-900 font-extrabold text-xl sm:text-4xl lg:text-4xl tracking-tight text-center p-4 max-w-sm sm:max-w-2xl">
            Generate electronic Nurses Assignment Sheets now using NAS
          </p>

          <div className="flex items-center flex-col sm:flex-row gap-4 sm:pt-4 pt-10">
            <Link
              className="bg-slate-200 hover:bg-slate-100 text-cyan-700 font-bold sm:py-4 sm:px-8 py-4 px-16 rounded lg:text-xl text-md"
              to="/account"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold sm:py-4 sm:px-14 py-4 px-24 rounded lg:text-xl text-md"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
