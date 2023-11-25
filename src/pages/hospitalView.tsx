import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

export default function HospitalView(){
  const navigate = useNavigate();
    const hospitalNameJSON = localStorage.getItem("Hospital Data");

  const hospitalData = hospitalNameJSON
    ? JSON.parse(hospitalNameJSON)
    : { hospitalName: "", hospitalUnits: [] };
  const hospitalUnitsList = hospitalData.hospitalUnits
  console.log("hospital Units", hospitalUnitsList)

  const [units, setUnits] = useState(hospitalUnitsList)
    function viewUnit(unitName: string) {
      navigate(`/specificUnitNav/${unitName}`);
    }


  function editUnit(unitName: string) {
    console.log(unitName)
    const modifiedUnitName = unitName.replace(/ /g, "-");
    navigate(`/editUnitName/${modifiedUnitName}`);
  }

  function deleteUnit(unitName: string) {
    console.log("deleting Unit", unitName);
    const updatedUnitsList = hospitalUnitsList.filter((items: IUnitObject) => {
      return items.unitName !== unitName;
    });

    hospitalData.hospitalUnits = updatedUnitsList;
    console.log("updatedUnitsList", updatedUnitsList);
    // Update the state
    setUnits(updatedUnitsList);

    // Update localStorage
    localStorage.setItem("Hospital Data", JSON.stringify(hospitalData));
  }
if (units){
  return (
    <div className="font-nunito flex flex-col items-center min-h-screen pb-24 sm:pb-32">
      <h1 className="p-12 text-2xl font-bold sm:text-5xl ">
        {hospitalData.hospitalName}
      </h1>
      <div className="flex flex-col sm:flex-row flex-wrap justify-evenly pb-6">
        {hospitalUnitsList.map((unit: IUnitObject) => (
          <div className="shadow-lg rounded-lg my-6 sm:my-12  max-w-sm mx-2 text-sm sm:text-xl w-56 sm:w-80 p-4 sm:p-6">
            {" "}
            <p className="text-md font-bold  sm:text-xl text-center flex justify-center p-4 sm:p-12 ">
              {unit.unitName}
            </p>
            <div className="flex flex-row text-sm sm:text-md lg:flex-row items-center justify-evenly">
              {" "}
              <button
                className="sm:mx-2 mx-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 px-2  sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => viewUnit(unit.unitName)}
              >
                Explore
              </button>
              <button
                className="sm:mx-2 mx-1 bg-sky-600 hover:bg-sky-500 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => editUnit(unit.unitName)}
              >
                Edit
              </button>
              <button
                className="sm:mx-2 mx-1 bg-red-700 hover:bg-red-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => deleteUnit(unit.unitName)}
              >
                Delete
              </button>
            </div>
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
else{
  return (
    <div>
      {" "}
      <p className="p-12 text-2xl font-bold sm:text-5xl">
        No Units Have been added yet, to start adding units, please click
        button below.
      </p>{" "}
      <Link
        to="/getStarted"
        className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold sm:py-4 sm:px-14 py-4 px-24 rounded sm:text-xl text-md"
      >
        Get Started
      </Link>
    </div>
  );
}
}