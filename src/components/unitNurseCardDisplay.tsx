import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

export function UnitNurseCardDisplay({
  staffData,
  unitName,
}: {
  staffData: IStaffData[];
  unitName: string;
}) {
  const { ShiftId } = useParams();
  const navigate = useNavigate();
  // Retrieve existing data from localStorage or create an empty array
  const hospitalNameJSON = localStorage.getItem("Hospital Data");
  const [hospitalData, setHospitalData] = useState<IHospitalData>(
    hospitalNameJSON
      ? JSON.parse(hospitalNameJSON)
      : { hospitalName: "", hospitalUnits: [] }
  );

  const [showPopup, setShowPopup] = useState(false);
  const [nurseToDelete, SetNurseToDelete] = useState<IStaffData>();
  const [nurses, setNurses] = useState(staffData);

  function confirmDelete() {
    console.log(nurses)
    console.log("deleting  Nurse", nurseToDelete);
    const updatedNurseList = staffData.filter((items: IStaffData) => {
      return items.nurseId !== nurseToDelete?.nurseId;
    });
    console.log("Updated Nurse List after deletion",updatedNurseList)
    if (matchingShift) {
      matchingShift.staff = updatedNurseList;
      console.log("updatedNurseList", updatedNurseList);
      // Update the state
      setNurses(updatedNurseList);
      // Update localStorage
      localStorage.setItem("Hospital Data", JSON.stringify(hospitalData));
      setHospitalData(hospitalData);
      setShowPopup(false);
      console.log(hospitalData)
    }
  }

  const matchingUnit = hospitalData.hospitalUnits.find((item) => {
    return item.unitName === unitName;
  });
  console.log("matching unit", matchingUnit);
  const matchingShift = matchingUnit?.shifts.find((item) => {
    return item.shiftId === ShiftId;
  });
  console.log("matching Shift", matchingShift);

  console.log(staffData);

  const deleteNurse = (nurseData: IStaffData) => {
    if (matchingShift) {
      console.log("nurse to be deleted: ", nurseData);
      setShowPopup(true);
      SetNurseToDelete(nurseData);
    }
  };
  function cancelDelete() {
    // Close the popup without performing the delete operation
    setShowPopup(false);
  }

  useEffect(() => {
    setNurses(staffData);
  }, staffData);

  const editNurse = (ShiftId: string, nurseId: string) => {
    navigate(`/editUnitNurse/${unitName}/${ShiftId}/${nurseId}`);
  };
  console.log(staffData);
  if (ShiftId && nurses.length !== 0) {
    return (
      <div className="flex flex-row flex-wrap justify-evenly">
        {showPopup && nurseToDelete ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ">
            <div className="bg-white p-8 rounded-lg max-w-sm sm:max-w-lg">
              <p className="text-xl font-bold mb-4">
                Are you sure you want to delete this Nurse?
              </p>
              <div className="flex flex-row p-2 gap-8 pb-6">
                {" "}
                <p className="font-bold text text-lg ">
                  {" "}
                  Nurse Being Deleted: {nurseToDelete.nurseData.nurseName}
                </p>
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
        {nurses.map((nurses: IStaffData, nurseIndex: number) => (
          <div
            key={nurseIndex}
            className="bg-white shadow-lg rounded-lg sm:px-8 sm:pt-6 sm:pb-8 my-4  max-w-sm mx-2 text-sm"
          >
            <div className="flex flex-col m-4">
              <div className="flex flex-col justify-center items-center text-center font-bold">
                {nurses.nurseData.nurseName}
              </div>
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td className="font-semibold text-cyan-700">Break:</td>
                    <td>{nurses.nurseData.nurseBreak}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-cyan-700">Relief:</td>
                    <td>{nurses.nurseData.reliefName}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-cyan-700">
                      Extra Duties:
                    </td>
                    <td>{nurses.nurseData.extraDuties}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-cyan-700">Fire Code:</td>
                    <td className="text-red-500">
                      {nurses.nurseData.fireCode}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div>
                {nurses.nurseData.assignedPatient.length !== 0 &&
                  nurses.nurseData.assignedPatient.length !== undefined && (
                    <table className="mb-4">
                      <thead>
                        <tr className="border border-stone-700 bg-stone-400 text-white">
                          <th className="border border-stone-700 px-2 py-1">
                            Room
                          </th>
                          <th className="border border-stone-700 px-2 py-1">
                            Patient
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {nurses.nurseData.assignedPatient.map(
                          (patient: IpatientObject, patientIndex: number) => (
                            <tr key={patientIndex}>
                              <td className="border px-2 py-1">
                                {patient.patientRoom}
                              </td>
                              <td className="border px-2 py-1">
                                {patient.patientName}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  )}
              </div>
              <div className="flex flex-row gap-6 items-center sm:py-4">
                {" "}
                <button
                  type="submit"
                  className="flex flex-row items-center gap-2 mx-auto hover:bg-red  hover:text-white text-red font-bold  sm:px-1 sm:py-1 sm:text-sm py-1 px-2 sm:px-4 rounded rounded-sm focus:outline-none focus:shadow-outline bg-white border-solid border-2 border-red  sm:mt-0 mt-6"
                  onClick={() => deleteNurse(nurses)}
                >
                  <img className="h-6 lg:h-4" src="images/delete-icon.png" />
                  <p className="">Delete</p>
                </button>
                <button
                  className="flex flex-row gap-2 items-center mx-auto hover:bg-lblue hover:text-blue text-white font-bold py-1 sm:px-4 px-4  border-solid border-2 border-blue rounded-sm hover:border-lblue sm:px-10 sm:py-1 bo sm:text-sm rounded focus:outline-none focus:shadow-outline bg-blue sm:mt-0 mt-6"
                  onClick={() => editNurse(ShiftId, nurses.nurseId)}
                >
                  <img className="h-6 lg:h-4" src="images/edit-blue.png" />
                  <p> Edit</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    console.log("no nurses added to this shift yet");
  }
}

export default UnitNurseCardDisplay;
