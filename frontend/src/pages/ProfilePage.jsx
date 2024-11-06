import React, { useState, useContext, useEffect } from "react";
import {
  Avatar,
  Button,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext"; // Adjust path as necessary
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../css/StyledComponents";
import { toast } from "react-toastify";
export default function ProfilePage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic:
      "https://res.cloudinary.com/duqy1baw3/image/upload/v1714407067/avatars/gsehkkutrpqatsqsw7mt.png",
  });
  const [disabledValue, setDisabledValue] = useState(true);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    // setRedirect("/");
    navigate("/");
  }

  useEffect(() => {
    // Set initial form values only if user is defined
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        profilePic: user.avatar.url,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "profilePhoto" && value) {
        data.append(key, value);
      } else {
        data.append(key, value || ""); // Ensure no undefined or null values are appended
      }
    });

    try {
      const response = await axios.post("/update-profile", object, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(response.data.user); // Update user context
      toast.success("Profile updated successfully!");
      // alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      // alert("Failed to update profile.");
      toast.error("Failed to update profile.");
    }
  };

  const updateProfile = () => {
    setDisabledValue(false);
  };

  const saveProfile = async () => {
    setDisabledValue(true);
    const object = {
      ...formData,
      userID: user._id,
    };
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      await axios.put("/update-profile", object, config).then((response) => {
        toast.success(` ${response.data}`);
        // alert(response.data);
      });
    } catch (e) {
      toast.error("Update Failed");
      // alert("Update Failed");
    }
  };

  const updateProfilePic = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          profilePic: reader.result,
        }));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closePopUp = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setOpen(false);
  };

  const handleClose = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.warning(`All fields are required`);
      // alert("All fields are required");
      return;
    }
    const object = {
      userId: user._id,
      oldPassword,
      newPassword,
      confirmPassword,
    };
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      await axios.put("/changepassword", object, config).then((response) => {
        if (response.data !== "Updated Password Successfully") {
          toast.warning(`${response.data}`);
          // alert(response.data);
        } else {
          // alert(response.data);
          toast.warning(`${response.data}`);
          setOpen(false);
        }
      });
    } catch (e) {
      // alert(e);
      toast.warning(`${e}`);

    }
  };

  return (
    <div className="profile-page flex flex-row justify-center">
      {disabledValue === true && (
        <Stack position={"relative"} className="mr-5">
          <Avatar
            sx={{
              width: "10rem",
              height: "10rem",
              objectFit: "contain",
            }}
            src={formData.profilePic}
          />
        </Stack>
      )}
      {disabledValue === false && (
        <Stack position={"relative"} className="mr-5">
          <Avatar
            sx={{
              width: "10rem",
              height: "10rem",
              objectFit: "contain",
            }}
            src={formData.profilePic}
          />

          <IconButton
            sx={{
              position: "absolute",
              bottom: "0",
              right: "2",
              margin: 13,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              ":hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
            component="label"
          >
            <>
              <CameraAltIcon />
              <VisuallyHiddenInput
                name="profilePic"
                onChange={updateProfilePic}
                type="file"
              />
            </>
          </IconButton>
        </Stack>
      )}
      <form id="profileForm" onSubmit={handleSubmit} className="ml-5">
        <TextField
          margin="normal"
          id="name"
          name="name"
          onChange={handleInputChange}
          label="Full Name"
          variant="outlined"
          value={formData.name}
          disabled={disabledValue}
          fullWidth
        />
        <TextField
          margin="normal"
          id="email"
          name="email"
          onChange={handleInputChange}
          label="Email"
          variant="outlined"
          value={formData.email}
          disabled={disabledValue}
          fullWidth
        />
        <TextField
          margin="normal"
          id="password"
          name="phone"
          onChange={handleInputChange}
          label="Mobile No."
          variant="outlined"
          value={formData.phone}
          disabled={disabledValue}
          fullWidth
        />
        <Stack mt={2} spacing={4} direction="row">
          {disabledValue === true && (
            <Button variant="contained" color="primary" onClick={updateProfile}>
              Edit Profile
            </Button>
          )}
          {disabledValue === false && (
            <Button variant="contained" color="success" onClick={saveProfile}>
              Save Changes
            </Button>
          )}
          <Button variant="contained" onClick={handleClickOpen}>
            Change Password
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            fullWidth
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                marginTop: "2rem",
                marginBottom: "1rem",
              }}
            >
              Update Password
            </Typography>

            <TextField
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              id="old-password"
              label="Old Password"
              variant="outlined"
              margin="normal"
              sx={{
                marginLeft: "2rem",
                marginRight: "2rem",
              }}
            />
            <TextField
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="new-password"
              label="New Password"
              variant="outlined"
              margin="normal"
              sx={{
                marginLeft: "2rem",
                marginRight: "2rem",
              }}
            />
            <TextField
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirm-password"
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              sx={{
                marginLeft: "2rem",
                marginRight: "2rem",
              }}
            />
            <Stack
              sx={{
                margin: "2rem",
              }}
              direction={"row"}
              justifyContent={"flex-end"}
              spacing={2}
            >
              <Button onClick={closePopUp}>Close</Button>
              <Button onClick={handleClose}>Change</Button>
            </Stack>
          </Dialog>
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
        </Stack>
      </form>
    </div>
  );
}
