/* eslint-disable react/prop-types */
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const JoinButton = ({ ride, user, onSeatsUpdate }) => {
  const navigate = useNavigate();

  const joinRide = () => {
    const requestedSeats = prompt(
      "How many seats would you like to join with?"
    );
    const seatsToJoin = parseInt(requestedSeats, 10);
    if (!seatsToJoin || seatsToJoin <= 0 || seatsToJoin > ride.seats) {
      toast.error(
        `Invalid number of seats. Please enter a number between 1 and ${ride.seats}.`
      );
      return;
    }

    axios
      .post(`/myrides/join/${ride._id}`, {
        userId: user._id,
        seatsRequested: seatsToJoin,
      })
      .then((response) => {
        toast.success(
          `You have successfully joined the ride. Seats left: ${response.data.seats}`
        );
        navigate("/account/bookings");
        onSeatsUpdate(response.data.seats);
      })
      .catch((error) => {
        console.error("Failed to join the ride:", error);
        toast.error(
          error.response?.data?.message || "Failed to join the ride."
        );
      });
  };

  const hasDeparted = new Date() > new Date(ride.departure);
  const isUserAPassenger = ride.passengers.some((p) => p.userId === user._id);

  if (isUserAPassenger) {
    return <div className="text-green-500">Already Booked</div>;
  }

  if (hasDeparted) {
    return <div className="text-red-500">Ride Started</div>;
  }

  if (ride.seats > 0 && user._id !== ride.creator._id) {
    return (
      <button
        onClick={joinRide}
        className="bg-primary hover:bg-green-300 text-white font-bold py-1 px-3 rounded-full mt-2"
      >
        Join Ride
      </button>
    );
  }

  return null;
};

export default JoinButton;
