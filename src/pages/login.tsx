import { Link } from "react-router-dom";

export function Login() {
  return (
    <div
      className="font-nunito relative flex flex-1 flex-col overflow-hidden justify-center items-center mb-12"
      style={{ backgroundImage: `url('images/banner-pic.png')` }}
    >
      <div className="">
        <form action="" className="max-w-sm">
          <div className="max-w-2xl">
            <div className="flex flex-col items-center">
              <img
                src="images/NAS-logo.png"
                className="sm:h-24 h-20 mt-12 sm:mt-18"
                alt="Nurses Assignment Sheet logo"
              />
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-[-0.04em] text-black sm:text-5xl sm:leading-[3.5rem]">
                Login
              </h2>
            </div>

            <div className="mb-4 mt-6">
              <label className="block font-semibold leading-6 text-gray-900 lg:text-lg text-md sm:text-md">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 appearance-none text-nunito-900 bg-white rounded-md block w-full p-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-nunito-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-nunito-200"
              ></input>
            </div>
            <div className="">
              <label className="block font-semibold leading-6 text-gray-900 lg:text-lg text-md sm:text-md">
                Password
              </label>
              <input
                type="password"
                id="pass"
                className="mt-2 appearance-none text-nunito-900 bg-white rounded-md block w-full p-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-nunito-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-nunito-200"
              ></input>
            </div>
            <div className="">
              <Link
                className="inline-flex justify-center rounded-lg border border-green font-semibold py-2.5 px-4 bg-nunito-900 text-green hover:bg-nunito-700 w-full bg-white mt-6 mb-2 lg:text-lg text-md sm:text-md"
                to="/unitNav"
              >
                Login
              </Link>

              <Link
                className="inline-flex justify-center rounded-lg font-semibold py-2.5 px-4 bg-nunito-900 text-white hover:bg-nunito-700 w-full bg-green mt-6 mb-2 lg:text-lg text-md sm:text-md"
                to="/unitNav"
              >
                Login as a guest
              </Link>
            </div>
            <div className="flex items-center flex-col lg:text-lg text-md sm:text-md">
              <Link className="hover:text-green" to="#">
                Forgot password?
              </Link>
              <div className="flex flex-col items-center mt-6">
                <p className="lg:text-xl sm:text-l hover:text-green">
                  No account?
                </p>
                <button className="inline-flex justify-center rounded-lg border border-green font-semibold py-2.5 px-4 bg-nunito-900 text-green hover:bg-nunito-700 w-full bg-white mt-6 mb-2 lg:text-xl sm:text-l">
                  <Link to="/account">Create an Account</Link>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
