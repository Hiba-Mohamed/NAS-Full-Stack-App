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
              <div className="flex flex-col items-center ">
                <img
                  src="images/danger-icon.png"
                  alt="danger sign icon"
                  className="w-24"
                />
                <p className="text-xl font-bold mb-4">Are you sure?</p>
                <p className="text-lg mb-4 text-center">
                  This action cannot be undone. Only click confirm if you are
                  certain you would like to delete this nurse
                </p>
                <p className="text text-lg ">
                  {" "}
                  Nurse Being Deleted:{" "}
                  <strong>{nurseToDelete.nurseData.nurseName}</strong>
                </p>
              </div>

              <div className="flex flex-row p-2 gap-8 pb-6"> </div>

              <div className="flex justify-between flex-col gap-4">
                <button
                  className="bg-red hover:text-red hover:bg-white hover:border-solid hover:border-2 hover:border-red border-solid border-2 border-red text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={confirmDelete}
                >
                  Confirm & Delete
                </button>
                <button
                  className="bg-white hover:bg-blue hover:text-white text-blue border-solid border-2 border-blue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
            className="bg-white shadow-lg rounded-lg sm:px-4 sm:pt-2 sm:pb-2 my-4  max-w-sm mx-2 text-sm"
          >
            <div className="flex flex-col m-4">
              <div className="flex flex-col justify-center items-center text-center font-bold sm:text-lg pb-4">
                {nurses.nurseData.nurseName}
              </div>
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td className="font-semibold">Break:</td>
                    <td>{nurses.nurseData.nurseBreak}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Relief:</td>
                    <td>{nurses.nurseData.reliefName}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Extra Duties:</td>
                    <td>{nurses.nurseData.extraDuties}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Fire Code:</td>
                    <td className="text-red-500">
                      {nurses.nurseData.fireCode}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="">
                {nurses.nurseData.assignedPatient.length !== 0 &&
                  nurses.nurseData.assignedPatient.length !== undefined && (
                    <div className="">
                      <p className="font-bold py-2">
                        Assigned Patients:{" "}
                         ({nurses.nurseData.assignedPatient.length})
                      </p>
                      <div className="border border-sky-200 rounded-lg ">
                        <table className="min-w-full divide-y divide-sky-200">
                          <thead className="">
                            <tr className="text-sm sm:text-md bg-sky-100 text-blue text-start">
                              <th className="px-2 py-1">Room</th>
                              <th className=" px-2 py-1">Patient</th>
                            </tr>
                          </thead>
                          <tbody className="divide-sky-200 divide-y">
                            {nurses.nurseData.assignedPatient.map(
                              (
                                patient: IpatientObject,
                                patientIndex: number
                              ) => (
                                <tr key={patientIndex}>
                                  <td className="px-2  py-1">
                                    {patient.patientRoom}
                                  </td>
                                  <td className="px-2 py-1">
                                    {patient.patientName}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
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
