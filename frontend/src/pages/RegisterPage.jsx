import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import { Avatar, IconButton, Stack } from "@mui/material";
// import { VisuallyHiddenInput } from "../css/StyledComponents";
// import { CameraAlt as CameraAltIcon } from "@mui/icons-material"
// import Profile from "../images/Profile.png";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const [avatar, setAvatar] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    if (!name || !email || !password || !phone) {
      toast.warn("All fields are required");
      // alert("All fields are required");
      return;
    }
    // if (!avatar){
    //   alert("Upload Image");
    //   return;
    // }
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      await axios
        .post(
          "/register",
          {
            name,
            email,
            password,
            phone,
          },
          config
        )
        .then((response) => {
          toast.success(`${response.data}`);
          // alert(response.data);
        });
    } catch (e) {
      toast.error("Registration failed. Check if Email already Used");
      // alert("Registration failed. Check if Email already Used");
    }
  }
  const profilePhoto = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className="mt-4 grow flex items-center justify-around p-10">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto " action="" onSubmit={registerUser}>
          {/* <Stack position={"relative"} width={"10rem"} margin={"auto"}>
            <Avatar sx={{
              width: "10rem",
              height: "10rem",
              objectFit: "contain",
            }} src={avatar} />

            <IconButton sx={{
              position: "absolute",
              bottom: "0",
              right: "0",
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              ":hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }} component="label">
              <>
                <CameraAltIcon />
                <VisuallyHiddenInput type="file" onChange={profilePhoto} />
              </>
            </IconButton>
          </Stack> */}
          <input
            type="text"
            placeholder="John Arbe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="w-1/2 px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              className="w-1/2 px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type="submit" className="primary">
            {" "}
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a Member?{"  "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
