import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface IUnitShiftDataBeforeConversion {
  shiftDate: Date;
  shiftType: string;
}

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

const EditShiftForm = () => {
  const { unitName, ShiftId } = useParams();

  console.log("shiftId", ShiftId);
  console.log("unitName", unitName);

  // Retrieve existing data from localStorage or create an empty array
  const hospitalNameJSON = localStorage.getItem("Hospital Data");
  const [hospitalData, setHospitalData] = useState<IHospitalData>(
    hospitalNameJSON
      ? JSON.parse(hospitalNameJSON)
      : { hospitalName: "", hospitalUnits: [] }
  );
  const hospitalUnitsList = hospitalData.hospitalUnits;
  console.log("hospitalUnitsList", hospitalUnitsList);
  const matchingUnitInfo = hospitalUnitsList.find((unit) => {
    return unit.unitName === unitName;
  });
  console.log("matchingUnitInfo", matchingUnitInfo);

  const unitShifts = matchingUnitInfo.shifts;
  console.log("unitShifts", unitShifts);

  const matchingShift = unitShifts.find((shift) => {
    return shift.shiftId === ShiftId;
  });
  console.log("matching shift", matchingShift);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUnitShiftDataBeforeConversion>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IUnitShiftDataBeforeConversion> = (
    data,
    event
  ) => {
    // Format the date as "YYYYMMDD"
    const formattedDate = data.shiftDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");

    event?.preventDefault();
    console.log(data);
    const ShiftId = uuidv4(); // Generate a unique ID using uuid

    const currentShift: IUnitShiftData = {
      shiftDate: formattedDate,
      shiftType: data.shiftType,
    };

    console.log("current shift", currentShift);

    const matchingUnitShifts = matchingUnitInfo?.shifts;

    const shiftsArray = matchingUnitShifts ?? [];
    const validationArray = shiftsArray.filter((shift) => {
      return shift.shiftId !== matchingShift.shiftId;
    });
    console.log("data", data);
    console.log("validationArray", validationArray);
    console.log("Matching Unit Shifts", matchingUnitShifts);

    // validate for duplicates
    if (matchingUnitInfo && validationArray && validationArray.length > 0) {
      const isDuplicateShift = validationArray.some((item) => { return(
        item.data.shiftDate === currentShift.shiftDate &&
        item.data.shiftType === currentShift.shiftType)
      });
console.log("isDuplicateShift", isDuplicateShift);
      if (isDuplicateShift) {
        setErrorMessage(
          "Duplicate shift, please select a different date, or shift Type"
        );
        console.log("duplicate shift");
      }
      if (!isDuplicateShift) {
        matchingShift.data.shiftDate = currentShift.shiftDate;
        matchingShift.data.shiftType = currentShift.shiftType
              localStorage.setItem(
                "Hospital Data",
                JSON.stringify(hospitalData)
              );
      setHospitalData(hospitalData);
      console.log("valid shift")

        navigate(`/manageUnitStaff/${unitName}/${matchingShift.shiftId}`);
      }
    }
    if (matchingUnitInfo && validationArray && validationArray.length < 1) {
        matchingShift.data.shiftDate = currentShift.shiftDate;
        matchingShift.data.shiftType = currentShift.shiftType;
        localStorage.setItem("Hospital Data", JSON.stringify(hospitalData));
        setHospitalData(hospitalData);
      console.log("valid shift");

        navigate(`/manageUnitStaff/${unitName}/${matchingShift.shiftId}`);
    }
  };

  // Function to disable past dates (including today)
  const disablePastDates = (date: Date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
    return date >= currentDate;
  };

  return (
    <div className="flex flex-col items-center">
      {errorMessage && (
        <div className="bg-white sm:px-8 shadow-lg rounded-lg max-w-sm  sm:max-w-xl text-xsm p-4 sm:text-sm text-center mx-4">
          <p className="text-peach ">{errorMessage}</p>
        </div>
      )}{" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white sm:px-8 px-auto shadow-lg rounded-lg pt-6 pb-8 m-4 sm:max-w-2xl text-sm px-4 px-8 sm:text-lg flex sm:flex-row flex-col gap-4"
        id="unitData-form"
      >
        <div className="mb-6">
          <div>
            <h3 className="font-bold">Shift Date:</h3>
            <Controller
              control={control}
              name="shiftDate"
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  placeholderText=""
                  onChange={(date) => field.onChange(date)}
                  className="w-full px-2 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  filterDate={disablePastDates} // Apply the validation function
                  selected={field.value}
                />
              )}
            />
            {errors?.shiftDate?.type === "required" && (
              <p className="text-peach text-sm">
                {errors?.shiftDate?.message || "This field is required"}
              </p>
            )}
          </div>
        </div>
        <div className="mb-6 basis-1/2 mr-2">
          <label className="font-bold">Shift Type:</label>
          <select
            {...register("shiftType", { required: true })}
            className="w-full px-2 appearance-none py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value=""></option>
            <option value="Day Shift">Day Shift</option>
            <option value="Night Shift">Night Shift</option>
          </select>{" "}
          {errors?.shiftType?.type === "required" && (
            <p className="text-peach text-sm">
              {errors?.shiftType?.message || "This field is required"}
            </p>
          )}
        </div>
        <div className="flex  items-center">
          {" "}
          <button
            className="mx-auto bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditShiftForm;
