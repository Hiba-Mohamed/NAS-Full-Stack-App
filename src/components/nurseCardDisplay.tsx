import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


interface IUnitShiftData {
  unitName: string;
  shiftDate: Date;
  shiftType: string;
}

interface IData{
  ShiftId: string;
  data: IUnitShiftData;
}
interface IPatientData {
  patientName: string;
  patientRoom: string;
}

interface IFormInput {
  nurseName: string;
  nurseBreak: string;
  reliefName: string;
  extraDuties: string;
  fireCode: string;
  assignedPatient: IPatientData[];
}

interface IstaffData{
  nurseId: string;
  nurseData: IFormInput;
}

export function NurseCardDisplay({ staffData }: { staffData: IstaffData[] }) {
  const { ShiftId } = useParams();
  const navigate = useNavigate();
  const existingDataJSON = localStorage.getItem("startShiftDataArray");
  const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

  console.log("existing Data", existingData);

  // Find the shift data object with the matching shiftId
  const matchingData = existingData.find(
    (data: IData) => data.ShiftId === ShiftId
  );
  const [nurses, setNurses] = useState(staffData);


  console.log("matching Data:", matchingData);

  console.log(staffData);

  const deleteNurse = (nurseId: string) => {

    const exsitingNurseArray = nurses;
    // get the index of the nurse card

    const updatedNurseList = exsitingNurseArray.filter((item: IstaffData) => {
      return item.nurseId !== nurseId;
    });

    matchingData.staff = updatedNurseList;
    
   


    console.log("Updated Nurse List", updatedNurseList);
    //  update the local storage
    localStorage.setItem("startShiftDataArray", JSON.stringify(existingData));

    console.log(updatedNurseList);
    setNurses(updatedNurseList);
    
  };
 useEffect(() => {
   setNurses(staffData);
 }, staffData);

  const editNurse = (ShiftId: string, nurseId: string) => {
    navigate(`/editNurse/${ShiftId}/${nurseId}`);

    // 2- have the form autopopulated with the nurse info using nurseId
    // 3- on form submission is handled through the onSubmitEdit function that is in the editNurse page.
    // 4- have to find a way to send the  ShiftId to the editNurse page to be passed in as a prop there.
  };
  console.log(staffData);
  if (ShiftId && staffData.length !== 0) {
    
    return (
      <div className="flex flex-row flex-wrap justify-evenly">
        {nurses.map((staffData: IstaffData, nurseIndex: number) => (
          <div className="bg-white shadow-lg rounded-lg sm:px-8 sm:pt-6 sm:pb-8 my-4  max-w-sm mx-2 text-sm">
            <div key={nurseIndex} className="flex flex-col m-4">
              <div className="flex flex-col justify-center items-center text-center font-bold">
                {staffData.nurseData.nurseName}
              </div>
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td className="font-semibold text-cyan-700">Break:</td>
                    <td>{staffData.nurseData.nurseBreak}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-cyan-700">Relief:</td>
                    <td>{staffData.nurseData.reliefName}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-cyan-700">
                      Extra Duties:
                    </td>
                    <td>{staffData.nurseData.extraDuties}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-cyan-700">Fire Code:</td>
                    <td className="text-red-500">
                      {staffData.nurseData.fireCode}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div>
                {staffData.nurseData.assignedPatient.length !== 0 &&
                  staffData.nurseData.assignedPatient.length !== undefined && (
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
                        {staffData.nurseData.assignedPatient.map(
                          (patient: IPatientData, patientIndex: number) => (
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

              <div className="flex flex-row justify-evenly items-center gap-1">
                <button
                  className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => editNurse(ShiftId, staffData.nurseId)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => deleteNurse(staffData.nurseId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ); } else {
    console.log("no nurses added to this shift yet");
  }
}

export default NurseCardDisplay;
