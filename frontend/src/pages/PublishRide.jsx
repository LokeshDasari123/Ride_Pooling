import axios from "axios";
import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";

const PublishRide = () => {
  const [rideDetails, setRideDetails] = useState({
    from: "",
    to: "",
    seats: 1,
    price: "",
    departure: null,
    arrival: null,
    carDetails: "",
  });
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // For the "seats" field, ensure the value is a positive number if not empty
    if (name === "seats") {
      if (value.trim() === "" || parseInt(value) > 0) {
        setRideDetails((prevState) => ({
          ...prevState,
          [name]: value.trim() === "" ? "" : parseInt(value),
        }));
      } else {
        // Display a warning or handle the invalid input accordingly
        toast.warning(
          "Please enter a valid positive number of available seats."
        );
      }
    } else {
      // For other fields, update the state normally
      setRideDetails((prevState) => ({
        ...prevState,
        [name]:
          name === "departure" || name === "arrival" ? value.toString() : value,
      }));
    }
  };

  const handleDateChange = (name, date) => {
    // Check if the date is valid and in the future
    const now = new Date();
    if (date && !isNaN(date.getTime()) && date > now) {
      setRideDetails((prevState) => ({
        ...prevState,
        [name]: date,
      }));
    } else {
      // Handle invalid date selection
      toast.warning("Please select a valid future date and time.");
      // You can also reset the state to clear the invalid date
      // setRideDetails((prevState) => ({
      //   ...prevState,
      //   [name]: null,
      // }));
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    let errors = [];
    if (!rideDetails.from.trim()) errors.push("departure location");
    if (!rideDetails.to.trim()) errors.push("destination location");
    if (!rideDetails.price || rideDetails.price <= 0) errors.push("price");
    if (!rideDetails.departure) errors.push("departure time");
    if (!rideDetails.arrival) errors.push("arrival time");
    if (!rideDetails.carDetails.trim()) errors.push("car details");

    if (errors.length > 0) {
      toast.warning(
        "Please complete the following field(s): " + errors.join(", ") + "."
      );
      return;
    }
    const submitRideDetails = {
      ...rideDetails,
      creator: user._id,
      creatorName: user.name,
      departure: rideDetails.departure.toString(),
      arrival: rideDetails.arrival.toString(),
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/myrides", submitRideDetails, config);
    toast.success("Ride Published Successfully");
    setRedirect("/account/myrides");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="flex flex-col items-center p-2">
      <h1 className="text-2xl text-sky font-bold mb-4">
        Publish a Ride in Just Minutes
      </h1>
      <div className="flex flex-col md:flex-row w-full justify-center p-5 border">
        <div className="w-full md:w-1/3 p-4 border ml-0 md:ml-3">
          <h2 className="text-xl font-semibold mb-2">Create a Ride</h2>
          <form className="space-y-1" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block mb-1" htmlFor="from">
                  From:
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="text"
                  id="from"
                  name="from"
                  value={rideDetails.from}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block mb-1" htmlFor="to">
                  To:
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="text"
                  id="to"
                  name="to"
                  value={rideDetails.to}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block mb-1" htmlFor="seats">
                  Available seats:
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="number"
                  id="seats"
                  name="seats"
                  value={rideDetails.seats}
                  onChange={handleChange}
                  min="1"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block mb-1" htmlFor="price">
                  Price:
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="number"
                  id="price"
                  name="price"
                  value={rideDetails.price}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1" htmlFor="departure">
                Departure Time:
              </label>
              <DatePicker
                selected={rideDetails.departure}
                onChange={(date) => handleDateChange("departure", date)}
                showTimeSelect
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className={`form-control 
                }`}
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="arrival">
                Arrival Time:
              </label>
              <DatePicker
                selected={rideDetails.arrival}
                onChange={(date) => handleDateChange("arrival", date)}
                showTimeSelect
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className={`form-control 
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="carDetails"
                className="block text-gray-700 font-bold mb-2"
              >
                Car Details
              </label>
              <textarea
                id="carDetails"
                name="carDetails"
                rows="2"
                className="form-textarea w-full border rounded-md px-4 py-2"
                placeholder="Ex: 2020 Silver Toyota Camry, license plate XYZ-1234"
                value={rideDetails.carDetails}
                onChange={handleChange}
              ></textarea>
             
            </div>
            
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              type="submit"
            >
              Publish Ride
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublishRide;
