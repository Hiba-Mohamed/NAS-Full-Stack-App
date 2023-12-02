import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="min-h-screen items-center bg-sky-50 font-OpenSans pt-12 flex flex-col max-w-xl sm:max-w-full py-6 px-2">
      <div className="max-w-3xl flex flex-col items-center">
        <div className="flex sm:pt-12 flex-col  lg:text-5xl items-center py-4 text-blue text-2xl sm:text-4xl text-center font-bold">
          <p>Welcome to the Electronic NAS </p>
          <p> (Nurses Assignment Sheet)!</p>
        </div>
        <div className="flex flex-col items-center p-4 text-start  mb-6 p-12">
          <p className="text-center text-md sm:text-lg lg:text-xl">
            The NAS is an elctronic document that replaces the paper-based
            nurses assignment sheet used in some healthcare settings. It is used
            to communicate vital information to nurses and other staff
            throughout the shift.
          </p>
        </div>
        <Link
          to="/getStarted"
          className="bg-blue lg:text-lg hover:bg-sky-500 text-white font-bold py-2 px-10 rounded-lg mb-12 focus:outline-none focus:shadow-outline"
        >
          {" "}
          Get Started!
        </Link>
      </div>

      <div className="flex flex-row items-center sm:mt-28 mx-4 p-4 text-start text-lg">
        <p className="font-bold text-blue text-xl sm:text-2xl lg:text-4xl">
          A Quick Guide to Get Started Below:
        </p>
      </div>
      <div className="flex flex-col justify-evenly p-2 items-center">
        <div className=" flex flex-col w-full justify-evenly lg:flex-row">
          <div className="flex flex-col rounded-lg bg-white flex flex-row items-start px-6 shadow-lg text-start max-w-xl m-2 py-4 w-80 lg:w-500">
            <div className="flex lg:flex-row-reverse flex-col gap-2">
              <img
                src="images/features1.png"
                alt=""
                className="rounded-xl lg:w-64"
              />
              <div className="lg:w-56 lg:text-lg">
                <div className="pb-4">
                  <p className="font-extrabold">Step 1: </p>
                  <p className="font-extrabold">Navigate</p>
                </div>
                <p className="sm:text-sm">
                  Click on "Create New Shift" in the top navigation bar.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-white flex flex-row items-start px-6 shadow-lg text-start max-w-xl m-2 py-4 w-80 lg:w-500">
            <div className="flex lg:flex-row-reverse flex-col gap-2">
              <img
                src="images/features6.png"
                alt=""
                className="rounded-xl lg:w-56"
              />
              <div className="lg:w-56 lg:text-lg">
                <div className="pb-4">
                  <p className="font-extrabold">Step 2: </p>
                  <p className="font-extrabold">Create New shift</p>
                </div>
                <p className="sm:text-sm">Fill in the three steps form.</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col lg:flex-row ">
          <div className="flex flex-col rounded-lg bg-white flex flex-row items-start px-6 shadow-lg text-start max-w-xl m-2 py-4 w-80 lg:w-500">
            <div className="flex lg:flex-row-reverse flex-col gap-2">
              <img
                src="images/features5.png"
                alt=""
                className="rounded-xl lg:w-56"
              />
              <div className="lg:w-56 lg:text-lg">
                <div className="pb-4">
                  <p className="font-extrabold">Step 3: </p>
                  <p className="font-extrabold">Add staff and patients</p>
                </div>
                <p className="sm:text-sm">
                  Use the nurse's information form to dynamically add nurses to
                  your shift.
                </p>
                <p className="pt-4 sm:text-sm">
                  * Duplication of nurse's name, patient's name, and room number
                  will be prevented.
                </p>{" "}
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-white flex flex-row items-start px-6 shadow-lg text-start max-w-xl m-2 py-4 w-80 lg:w-500">
            <div className="flex lg:flex-row-reverse flex-col gap-2">
              <img
                src="images/features4.png"
                alt=""
                className="rounded-xl lg:w-64"
              />
              <div className="lg:w-56 lg:text-lg">
                <div className="pb-4">
                  <p className="font-extrabold">Step 4: </p>
                  <p className="font-extrabold">Manage Shifts Assignments</p>
                </div>
                <p className="sm:text-sm">
                  Edit shift and assignment information as necessary.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col lg:flex-row ">
          <div className="flex flex-col rounded-lg bg-white flex flex-row items-start px-6 shadow-lg text-start max-w-xl m-2 py-4 w-80 lg:w-500">
            <div className="flex lg:flex-row-reverse flex-col gap-2">
              <img
                src="images/features1.png"
                alt=""
                className="rounded-xl lg:w-56"
              />
              <div className="lg:w-56 lg:text-lg">
                <div className="pb-4">
                  <p className="font-extrabold">Step 5: </p>
                  <p className="font-extrabold">Access All Created Shifts</p>
                </div>
                <p className="sm:text-sm">
                  Click on "Shift Record" in the top navigation bar.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-white flex flex-row items-start px-6 shadow-lg text-start max-w-xl m-2 py-4 w-80 lg:w-500">
            <div className="flex lg:flex-row-reverse flex-col gap-2">
              <img
                src="images/features3.png"
                alt=""
                className="rounded-xl lg:w-56"
              />
              <div className="lg:w-56 lg:text-lg">
                <div className="pb-4">
                  <p className="font-extrabold">Step 6: </p>
                  <p className="font-extrabold">Review or Search for Shifts</p>
                </div>
                <p className="sm:text-sm">
                  Shifts are autosaved and organized from newest to oldest.
                </p>
                <p className="sm:text-sm pt-2">
                  Use the search bar to quickly find a specific shift.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center py-16">
        <p className="py-10 lg:text-xl max-w-xl text-center">
          There is no need to have an account as of now. You can log in as a
          guest and explore the tool!
        </p>
        <Link
          to="/home"
          className="bg-blue lg:text-lg hover:bg-sky-500 text-white font-bold py-2 px-10 rounded-lg mb-12 focus:outline-none focus:shadow-outline"
        >
          {" "}
          Try it Now!
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
