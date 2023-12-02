import { useParams } from "react-router-dom";
import UnitShiftForm from "../components/shiftFormUnitNameDefined";

export function StartUnitSheet() {
  const { unitName } = useParams();

  console.log(unitName);
  if (unitName) {
    return (
      <div className="flex flex-col items-center sm:pt-12 pt-14 gap-8 font-OpenSans min-h-screen bg-slate-50">
        <div className="flex lg:flex-row flex-col">
          <img
            src="images/step1-blue.png"
            alt=""
            className="w-56 sm:w-80 lg:w-56 lg:h-12"
          />
          <img
            src="images/line.png"
            alt=""
            className="lg:w-60 lg:block hidden"
          />
          <img
            src="images/step2-grey.png"
            alt=""
            className="w-56 sm:w-80 lg:w-56 lg:h-12"
          />
          <img
            src="images/line.png"
            alt=""
            className="lg:w-60 lg:block hidden"
          />
          <img
            src="images/step3-grey.png"
            alt=""
            className="w-56 sm:w-80 lg:w-56 lg:h-12"
          />
        </div>
        <h1 className="text-2xl sm:text-5xl text-center font-bold">
          New Shift{" "}
        </h1>

        <UnitShiftForm unitName={unitName} />
      </div>
    );
  }
}
