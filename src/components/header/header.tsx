import { useState } from "react";
import { Link } from "react-router-dom";

export function Heading() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="border-slate-50 bg-slate-50 font-nunito">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
        <Link to="/home" className="flex items-center">
          <img
            src="images/NAS-logo.png"
            className="sm:h-12 mr-3 h-8"
            alt="Nurses Assignment Sheet logo"
          />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
          <ul className="flex flex-col items-center font-medium mt-4 rounded-lg bg-gray-50">
            <li>
              <Link
                to="/home"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-green"
                aria-current="page"
                onClick={() => setOpen(!open)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-green"
                onClick={() => setOpen(!open)}
              >
                Create an Account
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-green"
                onClick={() => setOpen(!open)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/startSheet"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-green"
                onClick={() => setOpen(!open)}
              >
                Create New Shift
              </Link>
            </li>
            <li>
              <Link
                to="/shiftHistory"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-green"
                onClick={() => setOpen(!open)}
              >
                Shift Record
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-green"
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
