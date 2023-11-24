import { Link } from "react-router-dom";
import { useState } from "react";

interface IUnitShiftData {
  shiftDate: Date;
  shiftType: string;
}
interface IpatientObject {
  patientName: string;
  patientRoom: string;
}

interface IStaffData {
  nurseId: string;
  nurseData: {
    nurseName: string;
    nurseBreak: string;
    reliefName: string;
    extraDuties: string;
    fireCode: string;
    assignedPatient: IpatientObject[];
  };
}

interface IUnitShiftObject {
  shiftId: string;
  data: IUnitShiftData;
  staff: IStaffData[];
}

interface IUnitObject {
  unitName: string;
  shifts: IUnitShiftObject[];
}

interface IHospitalData {
  hospitalName: string;
  hospitalUnits: IUnitObject[];
}


export default function HospitalView(){
    const hospitalNameJSON = localStorage.getItem("Hospital Data");

  const [hospitalData, setHospitalData] = useState<IHospitalData>(
    hospitalNameJSON
      ? JSON.parse(hospitalNameJSON)
      : { hospitalName: "", hospitalUnits: [] }
  );
  const hospitalUnitsList = hospitalData.hospitalUnits
  console.log("hospital Units", hospitalUnitsList)

  return (
    <div className="font-nunito flex flex-col items-center min-h-screen pb-24 sm:pb-32">
      <h1 className="p-12 text-2xl font-bold sm:text-5xl ">
        {hospitalData.hospitalName}
      </h1>
      <div className="flex flex-row flex-wrap justify-evenly pb-6">
        {hospitalUnitsList.map((unit) => (
          <div className=" shadow-lg rounded-lg my-4  max-w-sm mx-2 text-sm sm:text-xl w-32 sm:w-80">
            {" "}
            <Link
              to={`/specificUnitNav/${unit.unitName}`}

              className="text-md font-bold  sm:text-xl text-center flex justify-center p-4 sm:p-12 bg-gray-50 shadow-lg rounded-xl"
            >
              {unit.unitName}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center">
        {" "}
        <Link
          to="/addingNewUnit"
          className="text-md font-bold  sm:text-xl text-center flex justify-center p-4 sm:p-12 bg-gray-100 shadow-lg rounded-xl"
        >
          + Add New Unit
        </Link>
      </div>
    </div>
  );
}