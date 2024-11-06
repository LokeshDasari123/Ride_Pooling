import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Bookings from "./JoinedPage.jsx";
import AllRidesPage from "./AllRidesPage.jsx";
import PostedRides from "./PostedRides.jsx";
import { FaRegHandshake } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { PiCarProfile } from "react-icons/pi";
import ProfilePage from "./ProfilePage.jsx";

export default function AccountPage() {
  const { ready, user } = useContext(UserContext);
  const { redirect, setRedirect } = useState(false);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading.....";
  }
  if (ready && !user) {
    setRedirect("/login");
    return <Navigate to={"/login"}></Navigate>;
  }

  function linkclasses(type = null) {
    let classes = "py-2 px-6 flex items-center";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }
  if (redirect) {
    return <Navigate to={redirect}></Navigate>;
  }
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link to="/account" className={linkclasses("profile")}>
          <CgProfile
            style={{ marginRight: "8px", verticalAlign: "middle" }}
            size={20}
          />
          My Profile
        </Link>
        <Link to="/account/bookings" className={linkclasses("bookings")}>
          <FaRegHandshake
            style={{ marginRight: "8px", verticalAlign: "middle" }}
            size={20}
          />
          My Joined Rides
        </Link>
        <Link to="/account/myrides" className={linkclasses("myrides")}>
          <PiCarProfile
            style={{ marginRight: "8px", verticalAlign: "middle" }}
            size={20}
          />
          My Posted Rides
        </Link>
        <Link to="/account/allrides" className={linkclasses("allrides")}>
          <PiCarProfile
            style={{ marginRight: "8px", verticalAlign: "middle" }}
            size={20}
          />
          All Rides
        </Link>
      </nav>
      {subpage === "profile" && <ProfilePage />}
      {subpage === "bookings" && <Bookings />}
      {subpage === "myrides" && <PostedRides />}
      {subpage === "allrides" && <AllRidesPage />}
    </div>
  );
}
