import { useParams } from "react-router-dom";
import UnitShiftForm from "../components/shiftFormUnitNameDefined";

export function StartUnitSheet() {
  const { unitName } = useParams();

  console.log(unitName);

  return (
    <div className="flex flex-col items-center sm:pt-12 pt-14 gap-8 font-nunito min-h-screen bg-slate-50">
      <img src="images/NAS-logo.png" className="sm:w-24 w-12" alt="" />
      <h1 className="text-2xl sm:text-5xl text-center font-bold">{unitName}</h1>
      <p className="w-screen flex flex-col items-center justify-center text-nunito-900  text-2xl sm:text-3xl tracking-tight text-center">
        Start a New Shift
      </p>
      <UnitShiftForm unitName={unitName} />
    </div>
  );
}
