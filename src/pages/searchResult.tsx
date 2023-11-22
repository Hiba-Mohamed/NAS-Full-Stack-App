import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";


interface IUnitShiftData {
  unitName: string;
  shiftDate: string;
  shiftType: string;
}

interface IData {
  ShiftId: string;
  data: IUnitShiftData;
}




export const SearchResults = () => {
  const { shiftDate, shiftType } = useParams();
  const navigate = useNavigate();
  const existingDataJSON = localStorage.getItem("startShiftDataArray");
  const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];
    const [shifts, setShifts] = useLocalStorage(
      "startShiftDataArray",
      existingData
    );
  const matchingShift = existingData.find(
    (shift: IData) =>
      formatDate(shift.data.shiftDate) === shiftDate && shift.data.shiftType === shiftType
  );

  function viewShift(shiftId: string) {
    console.log("View shift", shiftId);
    navigate(`/viewShift/${shiftId}`);
  }

  function editShift(shiftId: string) {
    console.log("edit Shift", shiftId);
    navigate(`/manageStaff/${shiftId}`);
  }

  function deleteShift(shiftId: string) {
    console.log("delete Shift", shiftId);
    const updatedShiftList = existingData.filter((items: IData) => {
      return items.ShiftId !== shiftId;
    });

    localStorage.setItem(
      "startShiftDataArray",
      JSON.stringify(updatedShiftList)
    );
    setShifts(updatedShiftList);
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

  console.log("matching shift", matchingShift);
  if (shifts && matchingShift) {
    return (
      <div className="flex flex-col bg-slate-100 items-center min-h-screen">
        <h1 className="font-nunito text-center text-2xl sm:text-4xl font-bold py-8 items-center">
          Search Result
        </h1>{" "}
        <div
          className="sm:my-4 mx-2 sm:p-4 my-4 py-4 flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 md:duration-500"
          key={existingData.ShiftId}
        >
          <div className="flex flex-row font-nunito">
            <div className="p-2">{matchingShift.data.unitName}</div>
            <div className="p-2">{formatDate(matchingShift.data.shiftDate)}</div>
            <div className="p-2">{matchingShift.data.shiftType}</div>
          </div>

          <div className="flex flex-row lg:flex-row items-center justify-evenly">
            {" "}
            <button
              className="sm:mx-2 mx-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 px-2  sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => viewShift(matchingShift.ShiftId)}
            >
              View
            </button>
            <button
              className="sm:mx-2 mx-1 bg-sky-600 hover:bg-sky-500 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => editShift(matchingShift.ShiftId)}
            >
              Edit
            </button>
            <button
              className="sm:mx-2 mx-1 bg-red-700 hover:bg-red-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => deleteShift(matchingShift.ShiftId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col bg-slate-100 items-center min-h-screen">
        <h1 className="font-nunito text-center text-2xl sm:text-4xl font-bold py-8 items-center">
          Search Result
        </h1>{" "}
        <div className="items-center flex w-full justify-evenly">
          <img src="images/shifthistory.png" alt="" />
        </div>
      </div>
    );
  }
};

export default SearchResults;
