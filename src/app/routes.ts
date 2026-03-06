import { createBrowserRouter } from "react-router";
import LandingLayout from "./layouts/LandingLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/landing/Home";
import DashboardOverview from "./pages/dashboard/Overview";
import Fleet from "./pages/dashboard/Fleet";
import Missions from "./pages/dashboard/Missions";
import Modules from "./pages/dashboard/Modules";
import Reports from "./pages/dashboard/Reports";
import Login from "./pages/auth/Login";

// Module Detail Pages
import HerdingModule from "./pages/dashboard/modules/HerdingModule";
import InspectionModule from "./pages/dashboard/modules/InspectionModule";
import AgricultureModule from "./pages/dashboard/modules/AgricultureModule";
import SecurityModule from "./pages/dashboard/modules/SecurityModule";
import EducationModule from "./pages/dashboard/modules/EducationModule";
import GeneralModule from "./pages/dashboard/modules/GeneralModule";
import GroundStationParameters from "./pages/dashboard/modules/GroundStationParameters";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingLayout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardOverview },
      { path: "fleet", Component: Fleet },
      { path: "missions", Component: Missions },
      { 
        path: "modules", 
        children: [
            { index: true, Component: Modules },
            { path: "herding", Component: HerdingModule },
            { path: "forestry", Component: InspectionModule },
            { path: "solar", Component: InspectionModule },
            { path: "mining", Component: InspectionModule },
            { path: "pipeline", Component: InspectionModule },
            { path: "agriculture", Component: AgricultureModule },
            { path: "security", Component: SecurityModule },
            { path: "education", Component: EducationModule },
            { path: ":moduleId/parameters", Component: GroundStationParameters },
            { path: ":moduleId", Component: GeneralModule },
        ]
      },
      { path: "reports", Component: Reports },
    ],
  },
], { basename: "/drone-os-demo" });
