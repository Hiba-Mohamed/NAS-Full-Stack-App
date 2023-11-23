import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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

interface IDatesWithTypes{
  shiftDate:string;
  shiftType:string;
}

const ShiftForm = (unitName:string|undefined) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUnitShiftData>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IUnitShiftData> = (data, event) => {
    // Format the date as "YYYYMMDD"
    const formattedDate = data.shiftDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");

    const modifiedData = {
      ...data,
      shiftDate: formattedDate,
    };

    event?.preventDefault();
    console.log(data);
    const ShiftId = uuidv4(); // Generate a unique ID using uuid

    // Retrieve existing data from localStorage or create an empty array
    const existingDataJSON = localStorage.getItem("startShiftDataArray");
    const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];
    const existingDatesWithTypes = existingData.map((item: IData) => {
      const { shiftDate, shiftType } = item.data; // Remove the first property (unitName)
      return { shiftDate, shiftType }; // Create a new object without the first property
    });
    console.log("existingDatesWithTypes", existingDatesWithTypes);

    const currentShift = {
      shiftDate: formattedDate,
      shiftType: data.shiftType,
    };

    console.log("currentShift", currentShift);

    const isDuplicateShift = existingDatesWithTypes.some(
      (item: IDatesWithTypes) =>
        item.shiftDate === currentShift.shiftDate &&
        item.shiftType === currentShift.shiftType
    );
    if (!isDuplicateShift) {
      existingData.push({ ShiftId, data: modifiedData });

      // Store the updated array back in localStorage
      localStorage.setItem("startShiftDataArray", JSON.stringify(existingData));

      // Redirect to the new page with the unique ID
      navigate(`/manageStaff/${ShiftId}`);
    } else {
      setErrorMessage(
        "Duplicate shift, please select a different date, or shift Type"
      );
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
        <div className="mb-6  flex flex-col justify-center">
          <label className="font-bold">Unit's name:</label>
          <input
            {...register("unitName", { required: true, maxLength: 30 })}
            type="text"
            className="w-full px-2 appearance-none py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></input>
          {errors?.unitName?.type === "required" && (
            <p className="text-peach text-sm">This field is required</p>
          )}
          {errors?.unitName?.type === "maxLength" && (
            <p className="text-peach text-sm">
              Unit's name cannot exceed 30 characters
            </p>
          )}
        </div>
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

export default ShiftForm;
