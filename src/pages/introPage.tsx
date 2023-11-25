import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="min-h-screen items-center bg-slate-50 font-nunito pt-12 flex flex-col max-w-xl sm:max-w-full py-6 px-2">
      <div className="max-w-3xl flex flex-col items-center">
        <div className="flex sm:pt-12 flex-col lg:text-5xl items-center mx-4 py-4 text-xl sm:text-4xl text-center font-bold">
          <p>Welcome to the Electronic NAS </p>
          <p> (Nurses Assignment Sheet)!</p>
        </div>
        <div className="flex flex-col items-center mx-4 p-4 text-start mt-8 mb-10 p-12">
          <p className="text-center text-md sm:text-xl lg:text-2xl">
            The NAS is an elctronic document that replaces the paper based
            nurses assignment sheet used in some healthcare settings. It is used
            to communicate vital information to nurses and other staff
            throughout the shift.
          </p>
        </div>
        <Link
          to="/getStarted"
          className="bg-slate-700 lg:text-lg hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-3xl my-12 focus:outline-none focus:shadow-outline"
        >
          {" "}
          Get Started
        </Link>
      </div>

      <div className="flex flex-row items-center gap-4 sm:mt-28 mx-4 p-4 text-start text-lg">
        <p className="font-bold text-xl sm:text-2xl lg:text-4xl">
          A Quick Guide to Get Started Below:
        </p>
      </div>
      <div className="flex flex-col  justify-evenly sm:text-xl p-2 items-center">
        <div className=" flex flex-col w-full justify-evenly lg:flex-row lg:gap-24 my-6">
          <div className="flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4 shadow-lg text-start mb-16 max-w-xl">
            <p className="font-bold md:text-2xl  text-2xl text-center text-white rounded-t-3xl  bg-slate-600 w-full p-2">
              Step 1: Navigate
            </p>
            <div className="flex lg:flex-row-reverse flex-col items-center p-4">
              <img
                src="images/features1.png"
                alt=""
                className="rounded-3xl lg:w-64"
              />
              <div className="lg:w-40 lg:text-lg py-4">
                <p>Click on "Create New Shift" in the top navigation bar.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4 shadow-lg text-start mb-16 max-w-xl">
            <p className="font-bold md:text-2xl  text-2xl text-center text-white rounded-t-3xl  bg-slate-600 w-full p-2">
              Step 2: Create New shift
            </p>
            <div className="flex lg:flex-row-reverse flex-col items-center p-4">
              <img
                src="images/features6.png"
                alt=""
                className="rounded-3xl lg:w-64"
              />
              <div className="lg:w-40 lg:text-lg py-4">
                <p>Fill in the three steps form.</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col lg:flex-row lg:gap-24 my-6">
          <div className="flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4 shadow-lg text-start mb-16 max-w-xl">
            <p className="font-bold md:text-2xl  text-2xl text-center text-white rounded-t-3xl  bg-slate-600 w-full p-2">
              Step 3: Add staff and patients
            </p>
            <div className="flex lg:flex-row-reverse flex-col items-center p-4">
              <img
                src="images/features5.png"
                alt=""
                className="rounded-3xl lg:w-64"
              />
              <div className="lg:w-40 lg:text-lg py-4">
                <p>
                  Use the nurse's information form to dynamically add nurses to
                  your shift.
                </p>
                <p className="pt-4">
                  * Duplication of nurse's name, patient's name, and room number
                  will be prevented.
                </p>{" "}
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4 shadow-lg text-start mb-16 max-w-xl">
            <p className="font-bold md:text-2xl  text-2xl text-center text-white rounded-t-3xl  bg-slate-600 w-full p-2">
              Step 4: Manage Shifts Assignments
            </p>
            <div className="flex lg:flex-row-reverse flex-col items-center p-4">
              <img
                src="images/features4.png"
                alt=""
                className="rounded-3xl lg:w-64"
              />
              <div className="lg:w-40 lg:text-lg py-4">
                <p>Edit shift and assignment information as necessary.</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col lg:flex-row lg:gap-24 my-6">
          <div className="flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4 shadow-lg text-start mb-16 max-w-xl">
            <p className="font-bold md:text-2xl  text-2xl text-center text-white rounded-t-3xl  bg-slate-600 w-full p-2">
              Step 5: Access All Created Shifts
            </p>
            <div className="flex lg:flex-row-reverse flex-col items-center p-4">
              <img
                src="images/features1.png"
                alt=""
                className="rounded-3xl lg:w-64"
              />
              <div className="lg:w-40 lg:text-lg py-4">
                <p>Click on "Shift Record" in the top navigation bar.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4 shadow-lg text-start mb-16 max-w-xl">
            <p className="font-bold md:text-2xl  text-2xl text-center text-white rounded-t-3xl  bg-slate-600 w-full p-2">
              Step 6: Review or Search for Shifts
            </p>
            <div className="flex lg:flex-row-reverse flex-col items-center p-4">
              <img
                src="images/features3.png"
                alt=""
                className="rounded-3xl lg:w-64"
              />
              <div className="lg:w-40 lg:text-lg py-4">
                <p>Shifts are autosaved and organized from newest to oldest.</p>
                <p>Use the search bar to quickly find a specific shift.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <Link
          to="/home"
          className="my-6 text-xl sm:text-2xl bg-slate-700 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
        >
          {" "}
          Try it Now!
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
