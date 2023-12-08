import { useParams } from "react-router-dom";
import UnitShiftForm from "../components/shiftFormUnitNameDefined";

export function StartUnitSheet() {
  const { unitName } = useParams();

  console.log(unitName);
  if (unitName) {
    return (
      <div className="flex flex-col items-center sm:pt-12 pt-14 gap-8 font-OpenSans min-h-screen bg-slate-50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 px-4">
          <div className="flex flex-row gap-2 items-center text-blue text-lg font-bold">
            <p className="py-2 sm:py-1 px-4 sm:px-3 text-white font-bold sm:text-lg bg-blue rounded-full">
              1
            </p>
            <p>Date & Shift Type</p>
          </div>
          <hr className="w-32 bg-black hidden sm:block border-1 border-black"></hr>
          <div className="flex flex-row gap-2 items-center text-faint text-lg font-bold">
            <p className="py-2 sm:py-1 px-4 sm:px-3 text-white font-bold sm:text-lg bg-faint rounded-full">
              2
            </p>
            <p>Staff & Patient Info</p>
          </div>
          <hr className="w-32 bg-black hidden sm:block border-1 border-black"></hr>

          <div className="flex flex-row gap-2 items-center text-faint text-lg font-bold">
            <p className="py-2 sm:py-1 px-4 sm:px-3 text-white font-bold sm:text-lg bg-faint rounded-full">
              3
            </p>
            <p>Shift Overview</p>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl text-center font-bold">
          New Shift{" "}
        </h1>

        <UnitShiftForm unitName={unitName} />
      </div>
    );
  }
}
