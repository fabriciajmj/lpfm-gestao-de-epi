import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react"; // <-- Importe lazy do React
import AppLayout from "../components/layout/AppLayout";

const HomeView = lazy(() => import("../views/Home/HomeView"));
const EpiListView = lazy(() => import("../views/Epi/EpiListView"));
const EpiDetailsView = lazy(() => import("../views/Epi/EpiDetailsView"));
const FuncListView = lazy(() => import("../views/Funcionario/FuncListView"));
const FuncDetailsView = lazy(() => import("../views/Funcionario/FuncDetailsView"));
const MovListView = lazy(() => import("../views/Mov/MovListView"));
const PrivacyView = lazy(() => import("../views/Static/PrivacyView"));
const AboutView = lazy(() => import("../views/Static/AboutView"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomeView /> },
      { path: "epis", element: <EpiListView /> },
      { path: "epis/:id", element: <EpiDetailsView /> },

      { path: "funcionarios", element: <FuncListView /> },
      { path: "funcionarios/:id", element: <FuncDetailsView /> },

      { path: "movimentacoes", element: <MovListView /> },

      { path: "privacy", element: <PrivacyView /> },
      { path: "about", element: <AboutView /> }
    ],
  },
]);
