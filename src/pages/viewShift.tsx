import { useParams } from "react-router-dom";
import ViewNurseCard from "../components/viewNursesComponent";


interface IUnitShiftData {
  unitName: string;
  shiftDate: Date;
  shiftType: string;
}

interface IData {
  ShiftId: string;
  data: IUnitShiftData;
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

export function ViewShift() {
  const { ShiftId } = useParams();

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
        <div className="font-nunito bg-greygreen sm:max-w-full min-h-screen">
          <div className="flex flex-col items-center justify-center">
            <div className="text-nunito-900 font-extrabold text-lg sm:text-lg lg:text-xl tracking-tight text-center py-1 bg-white shadow-lg rounded-lg sm:px-4 sm:pt-3 sm:pb-4 sm:py-2 m-8 text-green">
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
            <ViewNurseCard staffData={staffData} />{" "}
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

export default ViewShift;
