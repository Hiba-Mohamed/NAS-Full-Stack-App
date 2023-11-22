import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import ShiftListComponent from "../components/shiftListComponent";
import { useNavigate } from "react-router-dom";

interface IShiftSearch {
  shiftDate: Date;
  shiftType: string;
}

function NoShiftFound() {
  return (
    <div className="flex flex-col bg-slate-100 items-center min-h-screen">
      <h1 className="font-nunito text-center text-2xl sm:text-4xl font-bold py-8 items-center">
        Shift Record
      </h1>{" "}
      <div className="items-center flex w-full justify-evenly">
        <img src="./images/shifthistory.png" alt="" />
      </div>
    </div>
  );
}

export function ShiftHistory() {
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IShiftSearch>();

  const onSubmit: SubmitHandler<IShiftSearch> = (data, event) => {
    event?.preventDefault();
    console.log(data);
    const formattedDate = data.shiftDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");

    navigate(`/searchResult/${formattedDate}/${data.shiftType}`);
  };

  console.log(watch("shiftType"));
  const existingDataJSON = localStorage.getItem("startShiftDataArray");
  const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

  if (existingData.length === 0 || existingData == undefined) {
    return <NoShiftFound />;
  }

  return (
    <div className="bg-slate-100 font-nunito min-h-screen text-sm smm:text-md">
      <div className="">
        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl sm:text-4xl font-bold py-8">
            Shift Record
          </h1>

          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-lg my-6 max-w-sm sm:max-w-xl">
            <div className="">
              <div className="flex items-center pointer-events-none"></div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <div>
                  <Controller
                    control={control}
                    name="shiftDate"
                    render={({ field }) => (
                      <DatePicker
                        placeholderText="Enter shift date"
                        onChange={(date) => field.onChange(date)}
                        className="pl-2 py-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm sm:max-w-md"
                        selected={field.value}
                      />
                    )}
                  />
                </div>
                <div className="basis-1/2 mr-2">
                  <select
                    {...register("shiftType", { required: true })}
                    className={`px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
                      !watch("shiftType") && "opacity-50"
                    }`}
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="text-slate-400"
                    >
                      Enter shift type
                    </option>
                    <option value="Day Shift">Day Shift</option>
                    <option value="Night Shift">Night Shift</option>
                  </select>{" "}
                  {errors?.shiftType?.type === "required" && (
                    <p className="text-peach">
                      {errors?.shiftType?.message || "This field is required"}
                    </p>
                  )}
                </div>{" "}
                <button
                  className="mx-2 flex items-center justify-center bg-cyan-600 py-2 px-4 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer text-center"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <ShiftListComponent />
        </div>
      </div>
    </div>
  );
}
