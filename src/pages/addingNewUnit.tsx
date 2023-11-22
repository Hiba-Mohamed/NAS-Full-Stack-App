import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";

interface IUnitName {
  unitName: string;
}

const hospitalNameJSON = localStorage.getItem("Hospital Name");
const hospitalName = hospitalNameJSON ? JSON.parse(hospitalNameJSON) : [];

export function NewUnit() {
  const [hospitalNameString, setHospitalName] = useState(hospitalName);
 useEffect(() => {
   setHospitalName(hospitalName);
 }, hospitalName);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUnitName>();

  const onSubmit: SubmitHandler<IUnitName> = (data, event) => {
    event?.preventDefault();
    console.log(data)
    alert("hello");
  };
  return (
    <div className="font-nunito min-h-screen">
      <div className="flex flex-col items-center justify-center py-6 sm:py-12">
        {" "}
        <h1 className="p-6 sm:p-6 text-3xl sm:text-5xl text-center font-bold">
          {hospitalNameString}
        </h1>
        <div>
          {" "}
          <Link
            to="/getStarted"
            className="mx-auto hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-cyan-600"
          >
            Edit Hospital's name
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl p-6">Adding New Unit</h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-12 justify-center items-center sm:gap-2 flex flex-col sm:flex-row bg-white m-4 shadow-lg rounded-xl sm:max-w-4xl"
          >
            <label className="font-bold text-xl text-center pb-4">
              New Unit's Name:
            </label>
            <div className="flex flex-col items-center">
              {" "}
              <input
                {...register("unitName", { required: true, maxLength: 50 })}
                type="text"
                className="w-full px-2 appearance-none py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:h-12 sm:w-80"
              ></input>
              {errors?.unitName?.type === "required" && (
                <p className="text-peach text-sm">This field is required</p>
              )}
            </div>

            <button
              type="submit"
              className="mx-auto hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-orange-500 sm:ml-6 sm:mt-0 mt-6"
            >
              Submit
            </button>
          </form>{" "}
        </div>
      </div>
    </div>
  );
}

export default NewUnit;
