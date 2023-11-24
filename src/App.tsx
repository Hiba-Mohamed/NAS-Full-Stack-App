import Home from "./pages/home";
import Login from "./pages/login";
import AboutPage from "./pages/about";
import { Routes, Route } from "react-router-dom";
import Heading from "./components/header/header";
import Footer from "./components/footer/footer";
import Account from "./pages/account";
import NurseForm from "./pages/manageStaff";
import UnitNav from "./components/unitNav";
import { ShiftHistory } from "./pages/shiftHistory";
import { StartSheet } from "./pages/startSheet";
import EditNursePage from "./pages/editNurse";
import ViewShift from "./pages/viewShift";
import SearchResults from "./pages/searchResult";
import LandingPage from "./pages/introPage";
import GetStarted from "./pages/getStarted";
import HospitalView from "./pages/hospitalView";
import NewUnit from "./pages/addingNewUnit";
import { StartUnitSheet } from "./pages/startUnitShift";
import UnitNurseForm from "./pages/manageUnitStaff";
import EditUnitNursePage from "./pages/editUnitNurse";
import SpecificUnitNav from "./pages/specificUnitNav";
import { UnitShiftHistory } from "./pages/unitShiftHistory";
function App() {
  return (
    <div className="App">
      <Heading />
      <Routes>
        <Route path="/addingNewUnit" element={<NewUnit />} />
        <Route path="/hospitalView" element={<HospitalView />} />
        <Route path="getStarted" element={<GetStarted />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/unitShiftHistory/:unitName" element={<UnitShiftHistory />} />

        <Route
          path="/editUnitNurse/:unitName/:ShiftId/:nurseId"
          element={<EditUnitNursePage />}
        />
        <Route
          path="/specificUnitNav/:unitName"
          element={<SpecificUnitNav />}
        />

        <Route
          path="/manageUnitStaff/:unitName/:ShiftId"
          element={<UnitNurseForm />}
        />

        <Route path="/startUnitShift/:unitName" element={<StartUnitSheet />} />
        <Route path="/viewShift/:ShiftId" element={<ViewShift />} />
        <Route
          path="/searchResult/:shiftDate/:shiftType"
          element={<SearchResults />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/manageStaff/:unitName/:ShiftId" element={<NurseForm />} />
        <Route path="/unitNav" element={<UnitNav />} />
        <Route path="/shiftHistory" element={<ShiftHistory />} />
        <Route path="/startSheet/:unitName" element={<StartSheet />} />

        <Route path="/introPage" element={<LandingPage />} />
        <Route
          path="/editNurse/:ShiftId/:nurseId"
          element={<EditNursePage />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
