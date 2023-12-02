import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SpecificUnitNav() {
  const { unitName } = useParams();
  return (
    <div className="flex flex-col items-center font-OpenSans lg:pt-24 bg-sky-50 min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="pt-20 text-nunito-900 font-extrabold text-2xl px-12 sm:text-4xl lg:text-5xl tracking-tight text-center p-4">
          Welcome to Your {unitName} Unit
        </h1>
        <h2 className="text-nunito-900 font-extrabold text-md sm:text-2xl px-16 tracking-tight text-center p-10">
          Please select from the options below
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap justify-evenly sm:py-10 pb-10 gap-4">
        <div className="flex rounded-lg bg-white  flex-row  px-6 shadow-lg text-start max-w-xl m-2 py-4 w-80 sm:w-500">
          <Link
            to={`/startUnitShift/${unitName}`}
            className="flex items-center flex-row-reverse justify-between gap-2 sm:gap-24"
          >
            <img
              className="sm:w-48 w-32 rounded-lg "
              src="images/computer-icon.png"
              alt=""
            />
            <p className="text- sm:text-lg lg:text-2xl rounded-lg p-2 bg-white text-blue font-bold mt-2">
              Create New Shift
            </p>
          </Link>
        </div>
        <div className="flex flex-col rounded-lg bg-white flex flex-row items-start px-6 shadow-lg text-start max-w-xl m-2 py-4 w-80 sm:w-500">
          <Link
            to={`/unitShiftHistory/${unitName}`}
            className="flex items-center flex-row-reverse justify-evenly gap-2"
          >
            <img
              className="sm:w-48 w-32 rounded-lg "
              src="images/computer-right.png"
              alt=""
            />
            <p className="text-md sm:text-lg lg:text-2xl rounded-lg p-2 bg-white text-blue font-bold mt-2">
              Review Past and Future Shifts
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
