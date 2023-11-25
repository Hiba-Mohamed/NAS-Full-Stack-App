import { useState } from "react";
import { Link } from "react-router-dom";

export function Heading() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="border-slate-50 bg-white font-nunito py-2">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 max-w-7xl">
        <Link to="/home" className="flex items-center">
          <img
            src="images/NAS-logo.png"
            className="sm:h-10 mr-3 h-6"
            alt="Nurses Assignment Sheet logo"
          />
        </Link>

        <div id="navbar-hamburger">
          <ul className="hidden text-sm md:flex flex  gap-6 flex-row items-center font-medium mt-4 rounded-lg">
            <li>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-900 rounded-3xl hover:text-white hover:bg-slate-500 border-solid border-2 border-slate-500"
                onClick={() => setOpen(!open)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/hospitalView"
                className="block px-4 py-2 text-gray-900 rounded-3xl hover:text-white hover:bg-slate-500 border-solid border-2 border-slate-500"
                onClick={() => setOpen(!open)}
              >
                Hospital Units{" "}
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="block px-4 py-2 text-gray-900 rounded-3xl hover:text-white hover:bg-slate-500 border-solid border-2 border-slate-500"
                onClick={() => setOpen(!open)}
              >
                About NAS
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row items-center gap-4 hidden md:flex">
          <Link>
            <img className="h-4 md:h-6" src="images/settings-icon.png"></img>
          </Link>
          <Link>
            <img className="h-8 md:h-12"  src="images/profile-icon.png"></img>
          </Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-hamburger"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${open ? "block" : "hidden"} w-full`}
          id="navbar-hamburger"
        >
          <ul className="md:hidden flex flex-col items-center font-medium mt-4 rounded-lg">
            <li>
              <Link
                to="/home"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-slate-500"
                aria-current="page"
                onClick={() => setOpen(!open)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-slate-500"
                onClick={() => setOpen(!open)}
              >
                Create an Account
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-slate-500"
                onClick={() => setOpen(!open)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/hospitalView"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-slate-500"
                onClick={() => setOpen(!open)}
              >
                Hospital Units{" "}
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-slate-500"
                onClick={() => setOpen(!open)}
              >
                About NAS
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Heading;
