import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

interface IUnitShiftData {
  unitName: string;
  shiftDate: string;
  shiftType: string;
}

interface IData {
  shiftId: string;
  data: IUnitShiftData;
}

export const UnitShiftListComponent = (unitName: { unitName: string }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shiftToDelete, SetShiftToDelete] = useState<IUnitShiftObject>();

  function confirmDelete() {
    console.log("deleting Shift", shiftToDelete);
    console.log("delete Shift", shiftToDelete);
    const updatedShiftList = existingData.filter((items: IUnitShiftObject) => {
      return items.shiftId !== shiftToDelete?.shiftId;
    });
    matchingUnit.shifts = updatedShiftList;
    console.log("updatedShiftList", updatedShiftList);
    // Update the state
    setShifts(updatedShiftList);

    // Update localStorage
    localStorage.setItem("Hospital Data", JSON.stringify(hospitalData));
    setShowPopup(false);
  }

  function deleteShift(shift: IUnitShiftObject) {
    console.log("Shift:", shift);
    SetShiftToDelete(shift);
    setShowPopup(true);
  }
  console.log("unitName", unitName);
  const unitNameString = unitName.unitName;
  console.log("unitNameString", unitNameString);
  const navigate = useNavigate();
  const hospitalNameJSON = localStorage.getItem("Hospital Data");
  const hospitalData = hospitalNameJSON
    ? JSON.parse(hospitalNameJSON)
    : { hospitalName: "", hospitalUnits: [] };

  const hospitalUnits = hospitalData.hospitalUnits;
  console.log("hospital units", hospitalUnits);
  const matchingUnit = hospitalUnits.find((unit: IUnitObject) => {
    return unit.unitName === unitNameString;
  });
  console.log("matching unit", matchingUnit);
  const existingData = matchingUnit?.shifts;

  const [shifts, setShifts] = useState(existingData);
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

  existingData?.sort((a: IData, b: IData) => {
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
  function cancelDelete() {
    // Close the popup without performing the delete operation
    setShowPopup(false);
  }

  if (shifts?.length !== 0) {
    return (
      <div className="flex flex-col md:flex-col items-center max-w-sm sm:max-w-2xl">
        {showPopup && shiftToDelete ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ">
            <div className="bg-white p-8 rounded-lg max-w-sm sm:max-w-lg">
              <p className="text-xl font-bold mb-4">
                Are you sure you want to delete this shift?
              </p>
              <div className="flex flex-row p-2 gap-8 pb-6">
                {" "}
                <p>{formatDate(shiftToDelete.data.shiftDate)}</p>
                <p>{shiftToDelete.data.shiftType}</p>
              </div>

              <div className="flex justify-between">
                <button
                  className="bg-white hover:bg-rose-700 hover:text-white text-rose-700 border-solid border-2 border-rose-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-blue hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col lg:flex-col text-sm ms:text-md md:flex-col items-center max-w- sm:max-w-2xl">
          {existingData?.map((existingData: IUnitShiftObject) => (
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
                  onClick={() => deleteShift(existingData)}
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
