import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";

const EditRide = () => {
  const [rideDetails, setRideDetails] = useState({
    from: "",
    to: "",
    seats: 1,
    price: "",
    departure: "",
    arrival: "",
    carDetails: "",
  });
  const [redirect, setRedirect] = useState(false);
  const { user } = useContext(UserContext);
  const { rideId } = useParams();

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await axios.get(`/myrides/${rideId}`);
        setRideDetails({
          ...response.data,
          departure: new Date(response.data.departure),
          arrival: new Date(response.data.arrival),
        });
      } catch (error) {
        console.error("Failed to fetch ride details:", error);
      }
    };
    fetchRideDetails();
  }, [rideId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRideDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setRideDetails((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      await axios.put(`/myrides/${rideId}`, rideDetails, config);
      // alert("Ride updated successfully!");
      toast.success("Ride updated successfully!");
      setRedirect(true);
    } catch (error) {
      toast.error("Failed to update ride: " + error.message);
      // alert("Failed to update ride: " + error.message);
      // alert(
      //   `Failed to update ride: ${
      //     error.response ? error.response.data.message : error.message
      //   }`
      // );
    }
  };

  //Delete Function
  async function deleteRide(id) {
    // console.log({ rideId });
    // console.log({ id });
    await axios.delete(`/myrides/${rideId}`).then((response) => {
      toast.success(`Ride ${response.data}`);
      // alert(response.data);
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/account/myrides" />;
  }

  return (
    <div className="flex flex-col items-center p-2">
      <h1 className="text-2xl text-sky font-bold mb-4">Edit Your Ride</h1>

      <div className="flex flex-col md:flex-row w-full justify-center p-5 border">
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
          <div className="flex justify-end space-x-2">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
              type="submit"
              //   onClick={EditRide}
            >
              Update Ride
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
              onClick={() => deleteRide(rideDetails._id)}
            >
              Delete Ride
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRide;
