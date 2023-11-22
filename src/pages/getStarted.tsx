import { Controller, useForm, SubmitHandler } from "react-hook-form";

interface IHospitalName {
  hospitalName: String;
}



export function GetStarted() {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<IHospitalName>();

  const onSubmit: SubmitHandler<IHospitalName> = (data, event) => {
    event?.preventDefault()
  alert("hello")}


  return (
    <div className=" flex flex-col items-center font-nunito bg-slate-50 min-h-screen">
      <h1 className="text-center font-bold text-2xl sm:text-5xl p-12">
        Getting started
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-12 sm:justify-center items-center sm:gap-2 flex flex-col sm:flex-row bg-white m-4 shadow-lg rounded-xl sm:max-w-4xl"
      >
        <label className="font-bold text-xl text-center pb-4">
          Hospital's Name:
        </label>
        <input
          {...register("hospitalName", { required: true, maxLength: 50 })}
          type="text"
          className="w-full px-2 appearance-none py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:h-12 sm:w-80"
        ></input>
        <button
          type="submit"
          className="mx-auto hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-orange-500 sm:ml-6 sm:mt-0 mt-6"
        >
          Submit
        </button>
      </form>
      {errors?.hospitalName?.type === "required" && (
        <p className="text-peach text-sm">This field is required</p>
      )}
    </div>
  );
}

export default GetStarted;
