import { Link, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NurseInfoForm from "../components/nurseForm";
import { useState } from "react";


interface IFormInput {
  nurseName: string;
  nurseBreak: string;
  reliefName: string;
  extraDuties: string;
  fireCode: string;
  assignedPatient: IpatientObject[];}
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

export function EditUnitNursePage() {
  const { unitName, ShiftId, nurseId } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hospitalNameJSON = localStorage.getItem("Hospital Data");
  const [hospitalData, setHospitalData] = useState<IHospitalData>(
    hospitalNameJSON
      ? JSON.parse(hospitalNameJSON)
      : { hospitalName: "", hospitalUnits: [] }
  );

  const matchingUnit =
    hospitalData.hospitalUnits.find((item) => {
      return item.unitName === unitName;
    }) ?? [];
  console.log("matching unit", matchingUnit);
  
  const matchingShift = matchingUnit.shifts.find((item:IUnitShiftObject) => {
    return item.shiftId === ShiftId;
  });
  console.log("matching Shift", matchingShift);
  const matchingStaff = matchingShift.staff ?? [];
  const validationArray = matchingStaff.filter(
    (nurse: IStaffData) => nurse.nurseId !== nurseId
  );
  const onSubmitEdit: SubmitHandler<IFormInput> = (data) => {
    const isnotDuplicate = validatePatientsfieldsAgainstEachOther(data);

    if (isnotDuplicate) {
      console.log("data of the edited nurse", data);
      const targetNurse = matchingStaff.find(
        (nurse: IStaffData) => nurse.nurseId === nurseId
      );
      console.log("target nurse", targetNurse);
      targetNurse.nurseData = data;
      setHospitalData(hospitalData);
      localStorage.setItem("Hospital Data", JSON.stringify(hospitalData));
      navigate(`/manageUnitStaff/${unitName}/${ShiftId}`);
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

  console.log("validationArray", validationArray);

  console.log("matching Staff:", matchingStaff);

  console.log("matching staff from edit nurse page", matchingStaff);
  const matchingNurse = matchingStaff.find(
    (nurse: IStaffData) => nurse.nurseId === nurseId
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
          to={`/manageUnitStaff/${unitName}/${ShiftId}`}
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

export default EditUnitNursePage;
