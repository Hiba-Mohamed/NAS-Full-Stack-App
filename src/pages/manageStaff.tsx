import NurseInfoForm from "../components/nurseForm";
import { useParams } from "react-router-dom";
import NurseCardDisplay from "../components/nurseCardDisplay";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";
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

function retriveShiftDataLSwithShiftId(ShiftId: string) {
  // Retrieve shift data array from localStorage
  const existingDataJSON = localStorage.getItem("startShiftDataArray");
  const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

  console.log("existing Data", existingData);

  // Find the shift data object with the matching shiftId
  const matchingData = existingData.find(
    (data: IData) => data.ShiftId === ShiftId
  );

  console.log("matching Data:", matchingData);

  return matchingData ? matchingData.data : null;
}

export function NurseForm() {
  const { ShiftId } = useParams();
  const nurseId = uuidv4();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<IFormInput>({ defaultValues: { assignedPatient: [] } });
  const onSubmitForm: SubmitHandler<IFormInput> = (nurseData, event) => {
    event?.preventDefault();
    const isnotDuplicate = validatePatientsfieldsAgainstEachOther(nurseData);
    if (isnotDuplicate) {
      makeAndAddNurseDataToLS(nurseData);
      form.reset();
      console.log(nurseData);
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

  function makeAndAddNurseDataToLS(nurseData: IFormInput) {
    console.log("nurse data manage staff", nurseData);
    // Retrieve the existing shift data array from localStorage
    const existingDataJSON = localStorage.getItem("startShiftDataArray");
    const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

    // Find the shift data object with the matching ShiftId
    const matchingDataIndex = existingData.findIndex(
      (data: IData) => data.ShiftId === ShiftId
    );

    if (matchingDataIndex !== -1) {
      // If a matching shift data is found, update its "staff" property
      existingData[matchingDataIndex].staff =
        existingData[matchingDataIndex].staff || [];
      existingData[matchingDataIndex].staff.push({ nurseId, nurseData });

      // Update the localStorage with the modified data
      localStorage.setItem("startShiftDataArray", JSON.stringify(existingData));
    } else {
      console.log("Matching shift data not found for the provided ShiftId.");
    }
  }

  if (ShiftId) {
    // Check if ShiftId is defined
    const shiftData = retriveShiftDataLSwithShiftId(ShiftId);

    console.log("shiftData", shiftData);

    console.log(shiftData);
    if (ShiftId) {
      const existingDataJSON = localStorage.getItem("startShiftDataArray");
      const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];
      const matchingData = existingData.find(
        (data: IData) => data.ShiftId === ShiftId
      );

      const staffData = matchingData.staff ?? [];

      console.log("staffData", staffData);

      return (
        <div className="font-OpenSans bg-greyblue sm:max-w-full min-h-screen">
          <div className="flex flex-col items-center justify-center">
            <div className="text-nunito-900 font-extrabold text-lg sm:text-lg lg:text-xl tracking-tight text-center py-1 bg-white shadow-lg rounded-lg sm:px-4 sm:pt-3 sm:pb-4 sm:py-2 m-8 text-blue">
              <p>{shiftData.unitName}</p>
              <div className="flex sm:flex-row items-center flex-col">
                {" "}
                <p className="px-4">{formatDate(shiftData?.shiftDate)}</p>
                <p className="px-4">{shiftData.shiftType}</p>
              </div>
            </div>
          </div>

          <div>
            {" "}
            <NurseCardDisplay staffData={staffData} />{" "}
          </div>
          <div className="flex flex-col items-center">
            {" "}
            <NurseInfoForm
              onSubmit={onSubmitForm}
              Shifturl={ShiftId}
              form={form}
              validationArray={staffData}
            />
            {errorMessage && (
              <div className="text-peach bg-peach text-white shadow-lg rounded-lg max-w-sm m-4 p-4">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      );
    } else {
      console.log("ShiftId is undefined.");
    }
  } else {
    console.log("ShiftId is undefined.");
  }
}

export default NurseForm;
