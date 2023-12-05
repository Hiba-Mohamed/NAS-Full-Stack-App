import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface IUnitName {
  unitName: string;
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
export function EditUnit() {
  const hospitalNameJSON = localStorage.getItem("Hospital Data");
  const navigate = useNavigate();
  const unitURLName = useParams();
  console.log(unitURLName);
  const unitName = unitURLName.unitName;
  console.log(unitName);

  const [hospitalData, setHospitalData] = useState<IHospitalData>(
    hospitalNameJSON
      ? JSON.parse(hospitalNameJSON)
      : { hospitalName: "", hospitalUnits: [] }
  );

  const [duplicateError, setDuplicateError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUnitName>();

  const onSubmit: SubmitHandler<IUnitName> = (data, event) => {
    event?.preventDefault();
    const unitArray = hospitalData.hospitalUnits;
    console.log("unitArray", unitArray);
    const targetUnit = unitArray.find((unit) => {
      return unit.unitName === unitName;
    });
    console.log("targetUnit", targetUnit);
    const validationUnitArray = unitArray.filter((unit) => {
      return unit.unitName !== unitName;
    });
    if (unitArray && unitArray !== undefined && unitArray.length > 0) {
      const duplicateUnit = validationUnitArray.some(
        (unit) =>
          unit.unitName.toLocaleLowerCase() ===
          data.unitName.toLocaleLowerCase()
      );
      if (!duplicateUnit && targetUnit) {
        console.log(data.unitName);
        targetUnit.unitName = data.unitName;
        // Update the localStorage with the updated hospital data
        localStorage.setItem("Hospital Data", JSON.stringify(hospitalData));

        setHospitalData(hospitalData);
        navigate(`/hospitalView`);
      } else {
        setDuplicateError(
          "Duplicate Unit Name Detected, Enter a Different Unit Name please"
        );
      }
    }
    if ((unitArray && unitArray == undefined) || unitArray.length < 1) {
      console.log(data.unitName);
      const newUnit = { unitName: data.unitName, shifts: [] };
      const exsitingUnitsArray = hospitalData.hospitalUnits;
      console.log(exsitingUnitsArray);
      exsitingUnitsArray.push(newUnit);
      const updatedHospitalData: IHospitalData = {
        hospitalName: hospitalData.hospitalName,
        hospitalUnits: exsitingUnitsArray, // Use spread operator to create a new array
      };
      // Update the localStorage with the updated hospital data
      localStorage.setItem(
        "Hospital Data",
        JSON.stringify(updatedHospitalData)
      );

      setHospitalData(updatedHospitalData);
      navigate(`/hospitalView`);
    }
  };
  return (
    <div className="font-OpenSans min-h-screen">
      <div className="flex flex-col items-center justify-center py-6 sm:py-12">
        {" "}
        <h1 className="p-6 sm:p-6 text-3xl sm:text-5xl text-center font-bold">
          {hospitalData.hospitalName}
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl p-6 text-center">
          Editing {unitName} Unit Name{" "}
        </h1>
        <div className="flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-12 sm:p-6 justify-center sm:gap-2 flex flex-col bg-white m-4 shadow-lg rounded-xl sm:max-w-4xl"
          >
            <label className="font-bold text-xl text-center pb-4">
              New Unit's Name:
            </label>
            <div className="flex flex-col items-center">
              {" "}
              <input
                {...register("unitName", { required: true, maxLength: 50 })}
                type="text"
                placeholder="Enter your new Unit's name"
                className="w-full px-2 appearance-none sm:py-0 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:h-10 sm:w-80"
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
            <div className="flex flex-row gap-6 items-center sm:py-4">
              {" "}
              <Link
                to="/hospitalView"
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
          </form>{" "}
          <div className="bg-white sm:px-8 max-w-sm  sm:max-w-xl text-xsm p-4 sm:text-md text-sm text-center mx-4 my-2">
            {duplicateError ? (
              <p className="text-peach ">{duplicateError}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUnit;
