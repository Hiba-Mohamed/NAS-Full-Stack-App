import { Link } from "react-router-dom";
export default function HospitalView(){
    return (
      <div className="font-nunito flex flex-col items-center min-h-screen">
        <h1 className="p-12 text-2xl font-bold sm:text-5xl ">Hospital Name</h1>
        <div className="flex flex-col justify-center">
          {" "}
          <Link to="/addingNewUnit" className="text-lg font-bold  sm:text-xl text-center flex justify-center p-12 bg-gray-100 shadow-lg rounded-xl">+ Add New Unit</Link>
        </div>
      </div>
    );
}