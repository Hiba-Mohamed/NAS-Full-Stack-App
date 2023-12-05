import {
  SubmitHandler,
  useFieldArray,
  Controller,
  UseFormReturn,
} from "react-hook-form";

interface IPatientData {
  patientName: string;
  patientRoom: string;
}

interface IFormInput {
  nurseName: string;
  nurseBreak: string;
  reliefName: string;
  extraDuties: string;
  fireCode: string;
  assignedPatient: IPatientData[];
}

interface IstaffData {
  nurseId: string;
  nurseData: IFormInput;
}

export const NurseInfoForm = ({
  onSubmit,
  Shifturl,
  form,
  validationArray,
}: {
  onSubmit: SubmitHandler<IFormInput>;
  Shifturl: string;
  form: UseFormReturn<IFormInput>;
  validationArray: IstaffData[];
}) => {
  const ShiftId = Shifturl;

  const staffData = validationArray;

  console.log("matching Staff:", staffData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "assignedPatient",
    control,
  });

  const validateNurseName = (nurseName: string) => {
    // Retrieve existing staff data for the current shift from local storage
    console.log(staffData);

    // Check if nurseName already exists in the staff data
    if (staffData.length !== 0 && staffData !== undefined) {
      const isDuplicate = validationArray.some(
        (nurse: IstaffData) =>
          nurse.nurseData.nurseName.toLowerCase() === nurseName.toLowerCase()
      );

      // Return true if nurseName is not a duplicate, false if it's a duplicate
      return isDuplicate ? "Nurse name already exists in this shift" : true;
    }
  };

  const validatePatientName = (patientName: string) => {
    // Retrieve existing staff data for the current shift from local storage

    // Check if the provided patientName already exists in the assignedPatient array
    if (staffData && patientName !== "" && patientName !== undefined) {
      const isDuplicate = validationArray.some((nurse: IstaffData) =>
        nurse.nurseData.assignedPatient.some(
          (patient: IPatientData) =>
            patient.patientName.toLowerCase() === patientName.toLowerCase()
        )
      );
      if (isDuplicate) {
        return "patient assigned to different nurse";
      }
      return true;
    }
    // If no duplicate is found  or if the input is empty string in one of the form inputs, return true
    return true;
  };

  const validatePatientRoom = (patientRoom: string) => {
    // Check if the provided patientName already exists in the assignedPatient array
    if (staffData && patientRoom !== "" && patientRoom !== undefined) {
      const isDuplicate = validationArray.some((nurse: IstaffData) =>
        nurse.nurseData.assignedPatient.some(
          (patient: IPatientData) =>
            patient.patientRoom.toLowerCase() === patientRoom.toLowerCase()
        )
      );
      if (isDuplicate) {
        return "room assigned to different nurse";
      }
      return true;
    }

    // If no duplicate is found in one of the form inputs, return true
    return true;
  };
  console.log(errors);

  if (ShiftId) {
    // Check if ShiftId is defined

    if (ShiftId) {
      if (ShiftId) {
        console.log("staffData", staffData);
        return (
          <div className=" font-OpenSans relative flex flex-row flex-wrap justify-evenly text-sm sm:text-md pb-12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white px-8 pt-6 pb-6 sm:pb-2 max-w-sm rounded-lg sm:max-w-xl"
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Nurse's name
                </label>
                <input
                  {...register("nurseName", {
                    required: true,
                    maxLength: 30,
                    validate: (value: string) => validateNurseName(value),
                  })}
                  type="text"
                  className="mt-2 pl-2 appearance-none text-nunito-900 bg-white rounded-sm block w-full h-8 shadow-sm focus:outline-none placeholder:text-nunito-400 focus:ring-2 focus:ring-slate-400 ring-1 ring-slate-300"
                  id="nurse-name"
                />
                {errors?.nurseName?.type === "required" && (
                  <p className=" text-sm text-peach">This field is required</p>
                )}
                {errors?.nurseName?.type === "maxLength" && (
                  <p className=" text-sm text-peach">
                    Nurse's name cannot exceed 30 characters
                  </p>
                )}
                {errors.nurseName && errors.nurseName.type === "validate" && (
                  <p className=" text-sm text-peach">
                    {errors.nurseName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-row">
                <div className="mb-4 basis-1/2 mr-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Nurse's break
                  </label>
                  <select
                    {...register("nurseBreak", { required: true })}
                    className="mt-2 pl-2 text-nunito-900 bg-white rounded-sm block w-full h-8 shadow-sm focus:outline-none placeholder:text-nunito-400 focus:ring-2 focus:ring-slate-400 ring-1 ring-slate-300"
                    id="nurse-break"
                  >
                    <option value=""></option>
                    <option value="First">First</option>
                    <option value="Second">Second</option>
                    <option value="Third">Third</option>
                  </select>{" "}
                  {errors?.nurseBreak?.type === "required" && (
                    <p className="text-peach text-sm">This field is required</p>
                  )}
                </div>
                <div className="mb-6 basis-1/2 ml-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Nurse's relief
                  </label>
                  <input
                    {...register("reliefName", {
                      required: true,
                      maxLength: 20,
                    })}
                    type="text"
                    className="mt-2 pl-2 text-nunito-900 bg-white rounded-sm block w-full h-8 shadow-sm focus:outline-none placeholder:text-nunito-400 focus:ring-2 focus:ring-slate-400 ring-1 ring-slate-300"
                    id="relief-name"
                  ></input>
                  {errors?.reliefName?.type === "required" && (
                    <p className=" text-sm text-peach">
                      This field is required
                    </p>
                  )}
                  {errors?.reliefName?.type === "maxLength" && (
                    <p className=" text-sm text-peach">
                      Nurse's relief cannot exceed 30 characters
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-row">
                <div className="mb-6 basis-1/2 mr-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Extra Duties
                  </label>
                  <input
                    {...register("extraDuties", {
                      required: false,
                      maxLength: 40,
                    })}
                    type="text"
                    className="mt-2 pl-2 text-nunito-900 bg-white rounded-sm block w-full h-8 shadow-sm focus:outline-none placeholder:text-nunito-400 focus:ring-2 focus:ring-slate-400 ring-1 ring-slate-300"
                    id="extra-duties"
                  ></input>
                  {errors?.extraDuties?.type === "maxLength" && (
                    <p className=" text-sm text-peach">
                      Extra Duties cannot exceed 40 characters
                    </p>
                  )}
                </div>
                <div className="mb-6 basis-1/2 ml-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    Fire Code
                  </label>
                  <select
                    {...register("fireCode", { required: true })}
                    className="mt-2 pl-2 text-nunito-900 bg-white rounded-sm block w-full h-8 shadow-sm focus:outline-none placeholder:text-nunito-400 focus:ring-2 focus:ring-slate-400 ring-1 ring-slate-300"
                    id="fire-code"
                  >
                    <option value=""></option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>{" "}
                  {errors?.fireCode?.type === "required" && (
                    <p className=" text-sm text-peach">
                      This field is required
                    </p>
                  )}
                </div>
              </div>

              <div id="all-patients">
                <label className="block text-gray-700 font-bold mb-2">
                  Assigned Patients Details:
                </label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-row items-center">
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center my-1 mr-1 mt-2 appearance-none text-nunito-900 bg-white rounded-sm block w-full p-3 h-8 shadow-sm focus:outline-none placeholder:text-nunito-400 focus:ring-2 focus:ring-slate-400 ring-1 ring-slate-300">
                        <Controller
                          name={`assignedPatient.${index}.patientRoom`}
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                            maxLength: 20,
                            validate: (value) => validatePatientRoom(value),
                          }}
                          render={({ field: { onChange, value } }) => (
                            <input
                              className="w-24 appearance-none focus:outline-none w-full"
                              type="text"
                              value={value}
                              onChange={onChange}
                              placeholder="Room"
                            />
                          )}
                        />

                        <Controller
                          name={`assignedPatient.${index}.patientName`}
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                            maxLength: 20,
                            validate: (value) => validatePatientName(value),
                          }}
                          render={({ field: { onChange, value } }) => (
                            <input
                              className="w-24 appearance-none focus:outline-none"
                              type="text"
                              value={value}
                              onChange={onChange}
                              placeholder="Patient"
                            />
                          )}
                        />
                        <div>
                          {" "}
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-white px-2 rounded-lg text-red"
                          >
                            &#10005;
                          </button>
                        </div>
                      </div>

                      {errors?.assignedPatient?.[index] && (
                        <div className="flex flex-row justify-between justify-center my-auto mx-2 mb-2 w-full appearance-none text-nunito-900 bg-white rounded-md block h-10">
                          {errors?.assignedPatient?.[index]?.patientRoom
                            ?.type === "validate" && (
                            <p className=" text-xs text-peach w-24 appearance-none focus:outline-none">
                              {
                                errors?.assignedPatient?.[index]?.patientRoom
                                  ?.message
                              }
                            </p>
                          )}
                          {errors?.assignedPatient?.[index]?.patientName
                            ?.type === "validate" && (
                            <p className=" text-xs text-peach w-24 appearance-none focus:outline-none">
                              {
                                errors?.assignedPatient?.[index]?.patientName
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => append({ patientName: "", patientRoom: "" })}
                    className="mt-2 appearance-none text-nunito-900 bg-white rounded-sm block w-full h-8 shadow-sm focus:outline-none   ring-1 ring-blue text-blue"
                  >
                    + Add A Patient
                  </button>
                </div>
              </div>

              <div className="flex flex-row gap-6 items-center sm:py-4">
                <button
                  type="submit"
                  className="mx-auto hover:bg-lblue hover:text-blue text-white font-bold py-2 px-4  border-solid border-2 border-blue rounded-sm hover:border-lblue sm:px-10 sm:py-1 bo sm:text-sm rounded focus:outline-none focus:shadow-outline bg-blue sm:mt-0 mt-6"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        );
      } else {
        console.log("ShiftId is undefined.");
      }
    } else {
      console.log("ShiftId is undefined.");
    }
  }
};

export default NurseInfoForm;
