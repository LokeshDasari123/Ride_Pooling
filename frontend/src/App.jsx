import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContextProvider } from "./UserContext.jsx";
import Layout from "./Layout.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PublishRide from "./pages/PublishRide.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Services from "./pages/ServicesPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import SearchResults from "./pages/SearchResultsPage.jsx";
import EditRide from "./pages/EditPage.jsx";

import axios from "axios";
import { ProtectedRoute, PublicRoute } from "./RouteProtectors.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/account/:subpage?" element={<AccountPage />} />
            <Route path="/publride" element={<PublishRide />} />
            <Route path="/edit-ride/:rideId" element={<EditRide />} />
            <Route path="/results" element={<SearchResults />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contactus" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
