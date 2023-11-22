import { Link } from "react-router-dom";

export function Account() {
  return (
    <div
      className="font-nunito relative flex flex-1 flex-col overflow-hidden justify-center items-center mb-12 sm:max-w-screen h-screen"
      // style={{ backgroundImage: `url('images/banner-pic.png')` }}
    >
      <div className="flex flex-col items-center">
        <img
          src="images/NAS-logo.png"
          className="sm:h-24 h-20 mt-12 sm:mt-18"
          alt="Nurses Assignment Sheet logo"
        />
        <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-black sm:text-4xl sm:leading-[3.5rem]">
          Create an Account
        </h2>
      </div>
      <div className="form-wrap">
        <form action="" className="sm:max-w-screen">
          <div className="create-card">
            <div className="create-input">
              <input
                required
                type="text"
                id="fname"
                placeholder="First name"
                className="mt-4 appearance-none text-nunito-900 bg-white rounded-md block w-full p-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-nunito-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-nunito-200"
              ></input>
            </div>
            <div className="create-input">
              <input
                required
                type="text"
                id="lname"
                placeholder="Last name"
                className="mt-4 appearance-none text-nunito-900 bg-white rounded-md block w-full p-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-nunito-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-nunito-200"
              ></input>
            </div>
            <div className="create-input">
              <input
                required
                type="email"
                id="email"
                placeholder="Email address"
                className="mt-4 appearance-none text-nunito-900 bg-white rounded-md block w-full p-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-nunito-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-nunito-200"
              ></input>
            </div>
            <div className="create-input">
              <input
                required
                type="password"
                id="pass"
                placeholder="Password"
                className="mt-4 appearance-none text-nunito-900 bg-white rounded-md block w-full p-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-nunito-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-nunito-200"
              ></input>
            </div>
            <div className="create-input">
              <input
                required
                type="password"
                id="cpass"
                placeholder="Confirm Password"
                className="mt-4 appearance-none text-nunito-900 bg-white rounded-md block w-full p-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-nunito-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-nunito-200"
              ></input>
            </div>
            <div id="create-button">
              <button
                id="create-btn"
                className="inline-flex justify-center rounded-lg font-semibold py-2.5 px-4 bg-nunito-900 text-white hover:bg-nunito-700 w-full bg-green mt-6 lg:text-xl sm:text-l"
              >
                Submit
              </button>
            </div>
            <div className="mt-6">
              <Link id="login-direct" className="hover:text-green" to="/login">
                Have an account? please login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
