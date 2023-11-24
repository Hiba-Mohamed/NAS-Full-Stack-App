import NurseInfoForm from "../components/nurseForm";
import { useParams } from "react-router-dom";
import UnitNurseCardDisplay from "../components/unitNurseCardDisplay";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

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


export function UnitNurseForm() {
  const { unitName, ShiftId } = useParams();
  const nurseId = uuidv4();
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

    if (matchingUnit && matchingShift){

      matchingShift.staff.push({ nurseId, nurseData });
            localStorage.setItem(
              "Hospital Data",
              JSON.stringify(hospitalData)
            );
            setHospitalData(hospitalData)

    }
  }

  if (ShiftId) {
  
    if (unitName && ShiftId && matchingShift&& matchingUnit) {


      return (
        <div className="font-nunito bg-greygreen sm:max-w-full min-h-screen">
          <div className="flex flex-col items-center justify-center">
            <div className="text-nunito-900 font-extrabold text-lg sm:text-lg lg:text-xl tracking-tight text-center py-1 bg-white shadow-lg rounded-lg sm:px-4 sm:pt-3 sm:pb-4 sm:py-2 m-8 text-green">
              <p>{unitName}</p>
              <div className="flex sm:flex-row items-center flex-col">
                {" "}
                <p className="px-4">{formatDate(matchingShift.data.shiftDate)}</p>
                <p className="px-4">{matchingShift.data.shiftType}</p>
              </div>
            </div>
          </div>

          <div>
            {" "}
            <UnitNurseCardDisplay unitName = {unitName} staffData={matchingShift.staff} />{" "}
          </div>
          <div className="flex flex-col items-center">
            {" "}
            <NurseInfoForm
              onSubmit={onSubmitForm}
              Shifturl={ShiftId}
              form={form}
              validationArray={matchingShift.staff}
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

export default UnitNurseForm;
