import { useParams } from "react-router-dom";

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

interface IstaffData {
  nurseId: string;
  nurseData: IFormInput;
}


export function ViewNurseCard({ staffData }: { staffData: IstaffData[] }) {
  const { ShiftId } = useParams();
  console.log(staffData);

  console.log(staffData);
  if (ShiftId && staffData.length !== 0) {
    return (
      <div className="flex flex-row flex-wrap justify-evenly">
        {staffData?.map((staffData: IstaffData, nurseIndex: number) => (
          <div
            key={nurseIndex}
            className="bg-white shadow-lg rounded-lg sm:px-4 sm:pt-2 sm:pb-4 my-4  max-w-sm mx-2 text-sm  lg:text-l sm:text-md"
          >
            <div className="flex flex-col m-4">
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
                          <th className="border border-stone-700 px-2">Room</th>
                          <th className="border border-stone-700 px-2">
                            Patient
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {staffData.nurseData.assignedPatient.map(
                          (patient: IPatientData, patientIndex: number) => (
                            <tr key={patientIndex}>
                              <td className="border px-2">
                                {patient.patientRoom}
                              </td>
                              <td className="border px-2">
                                {patient.patientName}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  )}
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

export default ViewNurseCard;
