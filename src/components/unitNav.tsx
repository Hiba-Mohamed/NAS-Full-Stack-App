import { Link } from "react-router-dom";

export default function UnitNav() {
  return (
    <div className="font-nunito min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="pt-10 text-nunito-900 font-extrabold text-2xl sm:text-5xl lg:text-6xl tracking-tight text-center p-4">
          Welcome to Your Nursing Unit
        </h1>
        <h2 className="text-nunito-900 font-extrabold text-md sm:text-2xl  tracking-tight text-center p-10">
          Please select from the options below
        </h2>
      </div>
      <div className="flex flex-row flex-wrap justify-evenly sm:py-10 pb-10 gap-4">
        <div>
          <Link
            to="/startSheet"
            className="flex flex-col items-center justify-center"
          >
            <img
              className="sm:w-40 w-16 rounded-lg "
              src="images/create-logo.png"
              alt=""
            />
            <p className="text-md sm:text-lg rounded-lg p-2 bg-white text-green font-bold mt-2">
              Create A New Shift
            </p>
          </Link>
        </div>
        <div>
          <Link
            to="/shiftHistory"
            className="flex flex-col items-center justify-center"
          >
            <img
              className="sm:w-40 w-16 rounded-lg "
              src="images/history-logo.png"
              alt=""
            />
            <p className="text-md sm:text-lg rounded-lg p-2 bg-white text-green font-bold mt-2">
              Past/Future shifts
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
