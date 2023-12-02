import { useParams } from "react-router-dom";
import ViewNurseCard from "../components/viewNursesComponent";

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

interface IUnitShiftData {
  unitName: string;
  shiftDate: string;
  shiftType: string;
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

export function ViewUnitShift() {
  const { unitName, ShiftId } = useParams();
  console.log("unitName", unitName);
  const hospitalNameJSON = localStorage.getItem("Hospital Data");
  const hospitalData = hospitalNameJSON
    ? JSON.parse(hospitalNameJSON)
    : { hospitalName: "", hospitalUnits: [] };
  const hospitalUnits = hospitalData.hospitalUnits;
  console.log("hospital units", hospitalUnits);
  const matchingUnit = hospitalUnits.find((unit: IUnitObject) => {
    return unit.unitName === unitName;
  });
  console.log("matching unit", matchingUnit);
  const existingData = matchingUnit?.shifts;

  const matchingShift = existingData?.find((shift: IUnitShiftObject) => {
    return shift.shiftId === ShiftId;
  });

  if (ShiftId) {
    // Check if ShiftId is defined

    if (ShiftId) {
      const staffData = matchingShift?.staff ?? [];

      console.log("staffData", staffData);
      if (matchingShift) {
        return (
          <div className="font-OpenSans bg-greyblue sm:max-w-full min-h-screen">
            <div className="flex flex-col items-center justify-center">
              <div className="text-nunito-900 font-extrabold text-lg sm:text-lg lg:text-xl tracking-tight text-center py-1 bg-white shadow-lg rounded-lg sm:px-4 sm:pt-3 sm:pb-4 sm:py-2 m-8 text-blue">
                <p>{unitName}</p>
                <div className="flex sm:flex-row items-center flex-col">
                  {" "}
                  <p className="px-4">
                    {formatDate(matchingShift?.data.shiftDate)}
                  </p>
                  <p className="px-4">{matchingShift?.data.shiftType}</p>
                </div>
              </div>
            </div>

            <div>
              {" "}
              <ViewNurseCard staffData={staffData} />{" "}
            </div>
          </div>
        );
      }
    } else {
      console.log("ShiftId is undefined.");
    }
  } else {
    console.log("ShiftId is undefined.");
  }
}

export default ViewUnitShift;
