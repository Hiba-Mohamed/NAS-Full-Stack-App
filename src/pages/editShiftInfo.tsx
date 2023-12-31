import EditShiftForm from "../components/editShiftInfoForm";
import { useParams } from "react-router-dom";
export function EditShiftInfo() {
  const { unitName } = useParams();
  console.log("unitName", unitName);

  return (
    <div className="flex flex-col items-center sm:pt-12 pt-14 gap-8 font-OpenSans min-h-screen bg-slate-50">
      <img src="images/NAS-logo.png" className="sm:w-24 w-12" alt="" />
      <p className="w-screen flex flex-col items-center justify-center text-nunito-900 font-extrabold text-2xl sm:text-3xl tracking-tight text-center">
        Editing Shift
      </p>
      <EditShiftForm />{" "}
    </div>
  );
}
