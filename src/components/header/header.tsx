import { useState } from "react";
import { Link } from "react-router-dom";

export function Heading() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="border-slate-50 bg-white font-OpenSans">
      <div className="max-w-2xl flex flex-wrap items-center justify-between mx-auto px-4 max-w-7xl">
        <Link to="/introPage" className="flex items-center">
          <img
            src="images/NAS-logo.png"
            className="sm:h-10 mr-3 h-6"
            alt="Nurses Assignment Sheet logo"
          />
        </Link>

        <div id="navbar-hamburger">
          <ul className="hidden text-sm md:flex flex gap-6 flex-row items-center font-medium rounded-lg">
            <li>
              <Link
                to="/introPage"
                className="block font-bold text-gray-900 hover:text-sky-700 py-4 hover:pb-3 px-4 hover:bg-sky-100  hover: hover:border-b-4 hover:border-sky-600"
                onClick={() => setOpen(!open)}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="block font-bold text-gray-900 hover:text-sky-700 py-4 hover:pb-3 px-4 hover:bg-sky-100  hover: hover:border-b-4 hover:border-sky-600"
                onClick={() => setOpen(!open)}
              >
                About NAS
              </Link>
            </li>

            <li>
              <Link
                to="/hospitalView"
                className="block font-bold text-gray-900 hover:text-sky-700 py-4 hover:pb-3 px-4 hover:bg-sky-100  hover: hover:border-b-4 hover:border-sky-600"
                onClick={() => setOpen(!open)}
              >
                Hospital Units{" "}
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row items-center gap-4 hidden md:flex">
          <Link to="/">
            <img className="h-4 md:h-6" src="images/settings-icon.png"></img>
          </Link>
          <Link to="/">
            <img className="h-8 md:h-12" src="images/profile-icon.png"></img>
          </Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
          <ul className="md:hidden flex flex-col items-center font-medium my-4 rounded-lg">
            <li>
              <Link
                to="/introPage"
                className="block font-bold py-2 pl-3 pr-4 text-gray-900 rounded hover:text-sky-600"
                aria-current="page"
                onClick={() => setOpen(!open)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className="block font-bold py-2 pl-3 pr-4 text-gray-900 rounded hover:text-sky-600"
                onClick={() => setOpen(!open)}
              >
                Create an Account
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block font-bold py-2 pl-3 pr-4 text-gray-900 rounded hover:text-sky-600"
                onClick={() => setOpen(!open)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/hospitalView"
                className="block font-bold py-2 pl-3 pr-4 text-gray-900 rounded hover:text-sky-600"
                onClick={() => setOpen(!open)}
              >
                Hospital Units{" "}
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="block font-bold py-2 pl-3 pr-4 text-gray-900 rounded hover:text-sky-600"
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
