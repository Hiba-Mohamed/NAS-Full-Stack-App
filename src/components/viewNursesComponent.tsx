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
        {staffData.map((staffData: IstaffData, nurseIndex: number) => (
          <div
            key={nurseIndex}
            className="bg-white shadow-lg rounded-lg sm:px-4 sm:pt-2 sm:pb-2 my-4  max-w-sm mx-2 text-sm"
          >
            <div className="flex flex-col m-4">
              <div className="flex flex-col justify-center items-center text-center font-bold sm:text-lg pb-4">
                {staffData.nurseData.nurseName}
              </div>
              <table className="table-auto">
                <tbody className="flex flex-col gap-4 pb-2">
                  <div className="flex flex-row gap-12">
                    <tr className="flex flex-col">
                      <td className="font-semibold">Break:</td>
                      <td>{staffData.nurseData.nurseBreak}</td>
                    </tr>
                    <tr className="flex flex-col">
                      <td className="font-semibold">Relief:</td>
                      <td>{staffData.nurseData.reliefName}</td>
                    </tr>
                  </div>
                  <div className="flex flex-row gap-4">
                    <tr className="flex flex-col">
                      <td className="font-semibold">Extra Duties:</td>
                      <td>{staffData.nurseData.extraDuties}</td>
                    </tr>
                    <tr className="flex flex-col">
                      <td className="font-semibold">Fire Code:</td>
                      <td className="text-red-500">
                        {staffData.nurseData.fireCode}
                      </td>
                    </tr>
                  </div>
                </tbody>
              </table>

              <div className="">
                {staffData.nurseData.assignedPatient.length !== 0 &&
                  staffData.nurseData.assignedPatient.length !== undefined && (
                    <div className="">
                      <p className="font-bold py-2">
                        Assigned Patients: (
                        {staffData.nurseData.assignedPatient.length})
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
                            {staffData.nurseData.assignedPatient.map(
                              (patient: IPatientData, patientIndex: number) => (
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
