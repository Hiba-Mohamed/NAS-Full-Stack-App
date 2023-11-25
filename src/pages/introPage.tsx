import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="min-h-screen items-center bg-gray-50 font-nunito pt-12 flex flex-col max-w-xl sm:max-w-full p-6">
      <div className="max-w-3xl">

        <div className="rounded-3xl bg-white flex flex-col items-center mx-4 shadow-lg p-4 text-lg sm:text-2xl text-center font-bold">
          Welcome to the Electronic NAS (Nurses Assignment Sheet)
        </div>
        <div className="rounded-3xl bg-white flex flex-col items-center mx-4 shadow-lg p-4 text-start mt-20 mb-20 p-12">
          <p>
            My name is Hiba, a Get Coding Full-Stack Software Developer student.
            Due to my experience in healthcare and my passion for healthcare
            innovation and efficiency, I chose to recreate an Electronic Nurses
            Assignment Sheet for the React.js module of the Get Coding training
            program. I want to express my gratitude to Get Coding coach{" "}
            <strong>Mitchell Hynes</strong> for the guidance and support
            throughout this project. The first version was simplified using
            vanilla JavaScript that I completed in the introduction module. I'd
            also like to extend my thanks to Get Coding coach{" "}
            <strong>Clark Oake</strong>, who guided me through the introductory
            module of the program, and UI/UX Get Coding coach{" "}
            <strong>Matt Kennedy</strong> for providing invaluable UI/UX instructions.
          </p>
    
          <Link
            to="/getStarted"
            className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-3xl my-12 focus:outline-none focus:shadow-outline"
          >
            {" "}
            Get Started
          </Link>
        </div>
      </div>

      <div className="flex flex-row items-center gap-4 sm:mt-28 mx-4 p-4 text-start text-lg my-4">
        <img src="images/NAS-logo-icon.png" alt="NAS logo" className="h-12" />
        <p className="font-bold text-xl">A quick guide to get started below:</p>
      </div>
      <div className="flex flex-col justify-evenly sm:text-xl p-2 items-center">
        <p className="font-bold text-xl pt-12 pb-4">Step 1: Navigate</p>
        <div className="flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4 shadow-lg p-4 text-start mb-16 max-w-xl">
          <div className="flex flex-col items-center">
            <img src="images/features1.png" alt="" className="rounded-3xl" />
            <div>
              <div className="flex flex-row p-4 gap-2">
                <img src="images/NAS-logo-icon.png" alt="" className="h-4 mt-2" />
                <p>Choose from the menu on the header above to get started.</p>
              </div>
              <div className="flex flex-row p-4 gap-2">
                <img src="images/NAS-logo-icon.png" alt="" className="h-4 mt-2" />
                <p>Click on "Create New Shift".</p>
              </div>
            </div>
          </div>
        </div>

        <p className="font-bold text-xl pt-12 pb-4">
          Step 2: Create your shift
        </p>

        <div className="flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4  shadow-lg p-4 text-start mb-16 max-w-xl">
          <div className="flex flex-col items-center">
            <img src="images/features2.png" alt="" className="rounded-3xl" />
            <div className="flex flex-row p-4 gap-2">
              <img src="images/NAS-logo-icon.png" alt="" className="h-4 mt-2" />
              <p>Fill in the three steps form to create a new shift.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4 shadow-lg p-4 text-start mb-16 max-w-xl">
          <div className="flex flex-col items-center">
            <img src="images/features6.png" alt="" className="rounded-3xl" />
            <div className="flex flex-row p-4 gap-2">
              <img src="images/NAS-logo-icon.png" alt="" className="h-4 mt-2" />
              <p>
                Duplication safeguards in place to prevent shift Duplication.
              </p>
            </div>
          </div>
        </div>

        <p className="font-bold text-xl pt-12 pb-4">
          Step 3: Add staff and patients to the shift
        </p>

        <div className="flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4 shadow-lg p-4 text-start mb-16 max-w-xl">
          <div className="flex flex-col items-center">
            <img src="images/features5.png" alt="" className="rounded-3xl" />
            <div>
              <div className="flex flex-row p-4 gap-2">
                <img src="images/NAS-logo-icon.png" alt="" className="h-4 mt-2" />
                <p>
                  Use the nurse's information form to dynamically add nurses to
                  your shift.
                </p>
              </div>
              <div className="flex flex-row p-4 gap-2">
                <img src="images/NAS-logo-icon.png" alt="" className="h-4 mt-2" />
                <p>
                  Duplication safeguards in place to prevent duplication of
                  nurse's name, patient's name, and room number.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4 shadow-lg p-4 text-start mb-16 max-w-xl">
          <div className="flex flex-col items-center">
            <img src="images/features4.png" alt="" className="rounded-3xl" />
            <div className="flex flex-row p-4 gap-2">
              <img src="images/NAS-logo-icon.png" alt="" className="h-4 mt-2" />
              <p>
                Manange shift staff and edit nurse's assignment information.
              </p>
            </div>
          </div>
        </div>

        <p className="font-bold text-xl pt-12 pb-4">
          Step 4: Access the list of the shifts you created
        </p>

        <div className="flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4 shadow-lg p-4 text-start mb-16 max-w-xl">
          <div className="flex flex-col items-center">
            <img src="images/features1.png" alt="" className="rounded-3xl" />
            <div className="flex flex-row p-4 gap-2">
              <img src="images/NAS-logo-icon.png" alt="" className="h-4 mt-2" />
              <p>
                Use the menu bar to click on "Shift Record" to access your shift
                list.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4 shadow-lg p-4 text-start mb-16 max-w-xl">
          <div className="flex flex-col items-center">
            <img src="images/features3.png" alt="" className="rounded-3xl" />
            <div>
              <div className="flex flex-row p-4 gap-2">
                <img src="images/NAS-logo-icon.png" alt="" className="h-4 mt-2" />
                <p>
                  Your shifts are autosaved and organized from newest to oldest.
                </p>
              </div>
              <div className="flex flex-row p-4 gap-2">
                <img src="images/NAS-logo-icon.png" alt="" className="h-4 mt-2" />
                <p>
                  You can always search a specific shift using the search bar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold text-xl pt-12 pb-4 text-start">
          Step 5: Do it all over again as much as you'd like!{" "}
        </p>
      </div>
      <div className="flex flex-col items-center ">
        <p className="max-w-xl  flex flex-col rounded-3xl bg-white flex flex-row items-center gap-4 mx-4 shadow-lg p-8 text-center my-16 ">
          please use the menu to navigate through, no need to have an account to
          use it as of now.
          <Link
            to="/home"
            className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
          >
            {" "}
            Visit NAS home page
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
