import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

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

interface IHospitalName {
  hospitalName: string;
}

export function GetStarted() {
  const hospitalNameJSON = localStorage.getItem("Hospital Data");

  const [hospitalData, setHospitalData] = useState<IHospitalData>(
    hospitalNameJSON
      ? JSON.parse(hospitalNameJSON)
      : { hospitalName: "", hospitalUnits: [] }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IHospitalName>({
    defaultValues: { hospitalName: hospitalData.hospitalName },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IHospitalName> = (data, event) => {
    event?.preventDefault();
    const hospitalNameString = data.hospitalName;

    const updatedHospitalData: IHospitalData = {
      hospitalName: hospitalNameString,
      hospitalUnits: hospitalData.hospitalUnits || [],
    };

    // Update the localStorage with the updated hospital data
    localStorage.setItem("Hospital Data", JSON.stringify(updatedHospitalData));

    setHospitalData(updatedHospitalData);
    navigate(`/addingNewUnit`);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center font-OpenSans lg:pt-24 bg-sky-50 min-h-screen">
      <h1 className="text-center font-bold text-2xl  sm:text-4xl py-16 p-12">
        Create a Hospital Profile
      </h1>
      <p className="p-2 pb-8 text-center max-w-xl">
        Enter your hospital's name below to create a Hospital Profile. Once
        created, you will be able to organize all your shifts by Hopsital Unit
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-12 sm:p-6 justify-center sm:gap-2 flex flex-col bg-white m-4 shadow-lg rounded-xl sm:max-w-4xl"
      >
        <label className="font-bold text-xl sm:text-lg text-start">
          Hospital Name:
        </label>
        <div className="flex flex-col items-center">
          {" "}
          <input
            {...register("hospitalName", { required: true, maxLength: 50 })}
            type="text"
            className="w-full px-2 appearance-none sm:py-0 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:h-10 sm:w-80"
            placeholder="Enter your hospital's name"
          ></input>
          {errors?.hospitalName?.type === "required" && (
            <p className="text-peach text-sm">This field is required</p>
          )}
        </div>
        <div className="flex flex-row gap-6 items-center sm:py-4">
          {" "}
          <Link
            to="/introPage"
            type="submit"
            className="mx-auto hover:bg-blue  hover:text-white text-blue font-bold sm:px-10 sm:py-1 sm:text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-white border-solid border-2 border-blue  sm:mt-0 mt-6"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="mx-auto hover:bg-lblue hover:text-blue text-white font-bold py-2 px-4  border-solid border-2 border-blue hover:border-lblue sm:px-10 sm:py-1 bo sm:text-sm rounded focus:outline-none focus:shadow-outline bg-blue sm:mt-0 mt-6"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default GetStarted;
