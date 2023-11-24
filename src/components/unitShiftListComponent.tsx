import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IUnitShiftData {
  unitName: string;
  shiftDate: string;
  shiftType: string;
}

interface IData {
  shiftId: string;
  data: IUnitShiftData;
}

export const UnitShiftListComponent = (unitName) => {
    console.log("unitName", unitName);
    const unitNameString = unitName.unitName;
    console.log("unitNameString", unitNameString);
  const navigate = useNavigate();
  const hospitalNameJSON = localStorage.getItem("Hospital Data");
  const [hospitalData, setHospitalData] = useState<IHospitalData>(
    hospitalNameJSON
      ? JSON.parse(hospitalNameJSON)
      : { hospitalName: "", hospitalUnits: [] }
  );
  const hospitalUnits = hospitalData.hospitalUnits;
  console.log("hospital units", hospitalUnits)
  const matchingUnit = hospitalUnits.find((unit) => {
    return unit.unitName === unitNameString;
  });
  console.log("matching unit", matchingUnit)
  const existingData = matchingUnit?.shifts;

const [shifts, setShifts] = useState(existingData)
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

  existingData.sort((a: IData, b: IData) => {
    const dateA = parseInt(a.data.shiftDate);
    const dateB = parseInt(b.data.shiftDate);
    return dateB - dateA;
  });

  console.log(existingData);

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

    localStorage.setItem(
      "Hospital Data",
      JSON.stringify(hospitalData)
    );
    setShifts(updatedShiftList);
  }

  if (shifts.length !== 0) {
    return (
      <div className="flex flex-col md:flex-col items-center max-w-sm sm:max-w-2xl">
        <div className="flex flex-col lg:flex-col text-sm ms:text-md md:flex-col items-center max-w- sm:max-w-2xl">
          {existingData.map((existingData: IData) => (
            <div
              className="sm:my-4 mx-2 sm:p-4 my-4 py-4 flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 md:duration-500"
              key={existingData.shiftId}
            >
              <div className="flex flex-row">
                <div className="p-2">{existingData.data.unitName}</div>
                <div className="p-2">
                  {formatDate(existingData.data.shiftDate)}
                </div>
                <div className="p-2">{existingData.data.shiftType}</div>
              </div>

              <div className="flex flex-row lg:flex-row items-center justify-evenly">
                {" "}
                <button
                  className="sm:mx-2 mx-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 px-2  sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => viewShift(existingData.shiftId)}
                >
                  View
                </button>
                <button
                  className="sm:mx-2 mx-1 bg-sky-600 hover:bg-sky-500 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => editShift(existingData.shiftId)}
                >
                  Edit
                </button>
                <button
                  className="sm:mx-2 mx-1 bg-red-700 hover:bg-red-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => deleteShift(existingData.shiftId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    console.log("no shifts entered yet");
  }
};

export default UnitShiftListComponent;
