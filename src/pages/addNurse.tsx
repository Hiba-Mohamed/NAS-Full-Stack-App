import { useParams } from "react-router-dom";
import NurseInfoForm from "../components/newNurseForm";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";
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

interface IHospitalData {
  hospitalName: string;
  hospitalUnits: IUnitObject[];
}
interface IFormInput {
  nurseName: string;
  nurseBreak: string;
  reliefName: string;
  extraDuties: string;
  fireCode: string;
  assignedPatient: IpatientObject[];
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

export function StartStaff() {
  const { unitName, ShiftId } = useParams();
  const nurseId = uuidv4();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  console.log(unitName);

  // Retrieve existing data from localStorage or create an empty array
  const hospitalNameJSON = localStorage.getItem("Hospital Data");
  const [hospitalData, setHospitalData] = useState<IHospitalData>(
    hospitalNameJSON
      ? JSON.parse(hospitalNameJSON)
      : { hospitalName: "", hospitalUnits: [] }
  );

  const matchingUnit = hospitalData.hospitalUnits.find((item) => {
    return item.unitName === unitName;
  });
  console.log("matching unit", matchingUnit);
  const matchingShift = matchingUnit?.shifts.find((item) => {
    return item.shiftId === ShiftId;
  });
  console.log("matching Shift", matchingShift);

  const form = useForm<IFormInput>({ defaultValues: { assignedPatient: [] } });
  const onSubmitForm: SubmitHandler<IFormInput> = (nurseData, event) => {
    event?.preventDefault();
    const isnotDuplicate = validatePatientsfieldsAgainstEachOther(nurseData);
    if (isnotDuplicate) {
      makeAndAddNurseDataToLS(nurseData);
      form.reset();
      console.log(nurseData);
      setErrorMessage(null);
        navigate(`/manageUnitStaff/${unitName}/${ShiftId}`);
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

    if (matchingUnit && matchingShift) {
      matchingShift.staff.push({ nurseId, nurseData });
      localStorage.setItem("Hospital Data", JSON.stringify(hospitalData));
      setHospitalData(hospitalData);
    }
  }

  if (ShiftId) {
    if (unitName && ShiftId && matchingShift && matchingUnit) {
      return (
        <div className="flex flex-col items-center sm:pt-12 pt-14 gap-8 font-OpenSans min-h-screen bg-slate-50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 px-4">
            <div className="flex flex-row gap-2 items-center text-blue text-lg font-bold">
              <p className="py-2 sm:py-2 px-4 sm:px-3 text-white font-bold sm:text-sm bg-blue rounded-full">
                &#10004;
              </p>
              <p>Date & Shift Type</p>
            </div>
            <hr className="w-32 bg-black hidden sm:block border-1 border-black"></hr>
            <div className="flex flex-row gap-2 items-center text-blue text-lg font-bold">
              <p className="py-2 sm:py-1 px-4 sm:px-3 text-blue font-bold sm:text-lg border-2 border-blue rounded-full">
                2
              </p>
              <p>Staff & Patient Info</p>
            </div>
            <hr className="w-32 bg-black hidden sm:block border-1 border-black"></hr>

            <div className="flex flex-row gap-2 items-center text-faint text-lg font-bold">
              <p className="py-2 sm:py-1 px-4 sm:px-3 text-white font-bold sm:text-lg bg-faint rounded-full">
                3
              </p>
              <p>Shift Overview</p>
            </div>
          </div>
          <h1 className="font-bold text-xl sm:text-2xl">Add New Nurse</h1>
          <div className="flex flex-row items-center justify-center "></div>

          <div className="flex flex-col items-center">
            {" "}
            <NurseInfoForm
              onSubmit={onSubmitForm}
              Shifturl={ShiftId}
              form={form}
              validationArray={matchingShift.staff}
              shiftType={matchingShift.data.shiftType}
              shiftDate={formatDate(matchingShift.data.shiftDate)}
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

export default StartStaff;
