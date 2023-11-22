import { Link, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NurseInfoForm from "../components/nurseForm";
import { useState } from "react";


interface IUnitShiftData {
  unitName: string;
  shiftDate: Date;
  shiftType: string;
}

interface IData {
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

interface IstaffData {
  nurseId: string;
  nurseData: IFormInput;
}

export function EditNursePage() {
  const { ShiftId, nurseId } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmitEdit: SubmitHandler<IFormInput> = (data) => {
    const isnotDuplicate = validatePatientsfieldsAgainstEachOther(data);
    if (isnotDuplicate) {
      console.log("data of the edited nurse", data);
      const targetNurse = staffData.find(
        (nurse: IstaffData) => nurse.nurseId === nurseId
      );
      console.log("target nurse", targetNurse);
      targetNurse.nurseData = data;
      localStorage.setItem("startShiftDataArray", JSON.stringify(existingData));
      navigate(`/manageStaff/${ShiftId}`);
      setErrorMessage(null);
    } else
      setErrorMessage(
        "Error: duplicate patient name and/or room is being assigned to the same nurse"
      );
  };

  const validatePatientsfieldsAgainstEachOther = (nurseData: IFormInput) => {
    console.log("validate");
    console.log("nurse data validation", nurseData);
    const patientsArray = nurseData.assignedPatient;
    console.log("patients objects array", patientsArray);
    const patientNamesArray: string[] = [];
    const patientRoomsArray: string[] = [];

    for (const patient of patientsArray) {
      // Add patient names to the patientNames array
      patientNamesArray.push(patient.patientName);

      // Add patient rooms to the patientRooms array
      patientRoomsArray.push(patient.patientRoom);

      console.log("Patient Names:", patientNamesArray);
      console.log("Patient Rooms:", patientRoomsArray);
    }

    const isDuplicateName = patientNamesArray.some(
      (name, index) => patientNamesArray.indexOf(name) !== index
    );
    const isDuplicateRoom = patientRoomsArray.some(
      (room, index) => patientRoomsArray.indexOf(room) !== index
    );

    if (!isDuplicateName && !isDuplicateRoom) {
      return true;
    } else return false;
  };

  // Retrieve shift data array from localStorage
  const existingDataJSON = localStorage.getItem("startShiftDataArray");
  const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

  console.log("existing Data", existingData);
  console.log("existing Data", existingData);

  // Find the shift data object with the matching shiftId
  const matchingData = existingData.find(
    (data:IData) => data.ShiftId === ShiftId
  );

  console.log("matching Data:", matchingData);
  console.log("matching staff:", matchingData.staff);

  const staffData = matchingData.staff;
  const validationArray = staffData.filter(
    (nurse: IstaffData) => nurse.nurseId !== nurseId
  );
  console.log("validationArray", validationArray);

  console.log("matching Staff:", staffData);
  console.log("matching data from edit nurse page", matchingData);
  const matchingStaff = matchingData.staff;
  console.log("matching staff from edit nurse page", matchingStaff);
  const matchingNurse = matchingStaff.find(
    (nurse: IstaffData) => nurse.nurseId === nurseId
  );
  console.log("matching nurse", matchingNurse);
  const matchingNurseData = matchingNurse.nurseData;
  console.log("matching nurse data", matchingNurseData);
  const matchingName = matchingNurseData.nurseName;
  console.log("matching name", matchingName);
  const patientArray = matchingNurseData.assignedPatient;
  console.log("patient array", patientArray);

  if (ShiftId && nurseId) {
    const form = useForm<IFormInput>({
      defaultValues: {
        nurseName: matchingName,
        nurseBreak: matchingNurseData.nurseBreak,
        reliefName: matchingNurseData.reliefName,
        extraDuties: matchingNurseData.extraDuties,
        fireCode: matchingNurseData.fireCode,
        assignedPatient: patientArray,
      },
    });

    console.log("You are editing the nurse with nurseId:", nurseId);

    return (
      <div className="bg-greygreen font-nunito min-h-screen lg:px-40 md:px-10 sm:px-10 flex flex-col items-center">
        <h1 className="text-center text-2xl sm:text-3xl p-8 pt-16">
          Editing nurse below
        </h1>{" "}
        <div>
          {" "}
          <NurseInfoForm
            onSubmit={onSubmitEdit}
            Shifturl={ShiftId}
            form={form}
            validationArray={validationArray}
          />
          {errorMessage && (
            <div className="text-peach bg-peach text-white shadow-lg rounded-lg max-w-sm m-4 p-4">
              {errorMessage}
            </div>
          )}
        </div>{" "}
        <Link
          to={`/manageStaff/${ShiftId}`}
          className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 mb-6 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </Link>
      </div>
    );
  } else {
    console.log("shift Id and/or nurse Id not found");
  }
}

export default EditNursePage;
