import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

interface IUnitShiftData {
  shiftDate: string;
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
interface IShiftSearch {
  shiftDate: Date;
  shiftType: string;
}



export const SearchUnitResults = () => {
  const { unitName, shiftDate, shiftType } = useParams();
      console.log("shiftType", shiftType);
            console.log("shiftDate", shiftDate);

      const formattedShiftType = shiftType?.replace(/-/g, " ");
      console.log("formattedShiftType", formattedShiftType);

    console.log("unitName", unitName);
    const navigate = useNavigate();
    const hospitalNameJSON = localStorage.getItem("Hospital Data");
    const [hospitalData, setHospitalData] = useState<IHospitalData>(
      hospitalNameJSON
        ? JSON.parse(hospitalNameJSON)
        : { hospitalName: "", hospitalUnits: [] }
    );

    const hospitalUnits = hospitalData.hospitalUnits;
    console.log("hospital units", hospitalUnits);
    const matchingUnit = hospitalUnits.find((unit) => {
      return unit.unitName === unitName;
    });
    console.log("matching unit", matchingUnit);
    const existingData = matchingUnit?.shifts;
    console.log("exsiting data",existingData)

    const [shifts, setShifts] = useState(existingData);

  const matchingShift = existingData.find(
    (shift) =>{
     return shift.data.shiftDate === shiftDate && shift.data.shiftType === formattedShiftType}
  );

  console.log("matching shift", matchingShift)

  function viewShift(shiftId: string) {
    console.log("View shift", shiftId);
    navigate(`/viewUnitShift/${unitNameString}/${shiftId}`);
  }

  function editShift(shiftId: string) {
    console.log("edit Shift", shiftId);
    navigate(`/manageUnitStaff/${unitNameString}/${shiftId}`);
  }

  function deleteShift(shiftId: string) {
    console.log("delete Shift", shiftId);
    const updatedShiftList = existingData.filter((items: IData) => {
      return items.shiftId !== shiftId;
    });
    matchingUnit.shifts = updatedShiftList;
    console.log("updatedShiftList", updatedShiftList);
    // Update the state
    setShifts(updatedShiftList);

    // Update localStorage
    localStorage.setItem("Hospital Data", JSON.stringify(hospitalData));
  }

    function formatDate(dateString: string): string {
      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6);
      const day = dateString.slice(6, 8);

      return `${day} ${getMonthName(month)}, ${year}`;
    }

    function getMonthName(month: string): string {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Subtract 1 from the month because JavaScript Date months are zero-based
      const monthIndex = parseInt(month, 10) - 1;

      return months[monthIndex];
    }

  console.log("matching shift", matchingShift);
  if (shifts && matchingShift) {
    return (
      <div className="flex flex-col bg-slate-100 items-center min-h-screen">
        <h1 className="font-nunito text-center text-2xl sm:text-4xl font-bold py-8 items-center">
          Search Result
        </h1>{" "}
        <div
          className="sm:my-4 mx-2 sm:p-4 my-4 py-4 flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 md:duration-500"
          key={existingData.ShiftId}
        >
          <div className="flex flex-row font-nunito">
            <div className="p-2">{matchingShift.data.unitName}</div>
            <div className="p-2">{formatDate(matchingShift.data.shiftDate)}</div>
            <div className="p-2">{matchingShift.data.shiftType}</div>
          </div>

          <div className="flex flex-row lg:flex-row items-center justify-evenly">
            {" "}
            <button
              className="sm:mx-2 mx-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 px-2  sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => viewShift(matchingShift.shiftId)}
            >
              View
            </button>
            <button
              className="sm:mx-2 mx-1 bg-sky-600 hover:bg-sky-500 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => editShift(matchingShift.shiftId)}
            >
              Edit
            </button>
            <button
              className="sm:mx-2 mx-1 bg-red-700 hover:bg-red-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => deleteShift(matchingShift.shiftId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col bg-slate-100 items-center min-h-screen">
        <h1 className="font-nunito text-center text-2xl sm:text-4xl font-bold py-8 items-center">
          Search Result
        </h1>{" "}
        <div className="items-center flex w-full justify-evenly">
          <img src="images/shifthistory.png" alt="" />
        </div>
      </div>
    );
  }
};

export default SearchUnitResults;
