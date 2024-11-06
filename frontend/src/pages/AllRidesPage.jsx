// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { UserContext } from "../UserContext";
// import { useNavigate } from "react-router-dom";
// import "../css/ridestyle.css";
// import { toast } from "react-toastify";

// export default function PostedRides() {
//   const { user } = useContext(UserContext);
//   const [myRides, setMyRides] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("/myrides/all")
//       .then((response) => {
//         setMyRides(response.data);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch rides:", error);
//       });
//   }, [user._id]);

//   const joinRide = (ride) => {
//     const requestedSeats = prompt(
//       "How many seats would you like to join with?"
//     );
//     const seatsToJoin = parseInt(requestedSeats, 10);
//     if (!seatsToJoin || seatsToJoin <= 0 || seatsToJoin > ride.seats) {
//       toast.error(`Invalid number of seats. Please enter a number between 1 and ${ride.seats}.`);
//       return;
//     }

//     axios
//       .post(`/myrides/join/${ride._id}`, {
//         userId: user._id,
//         seatsRequested: seatsToJoin,
//       })
//       .then((response) => {
//         toast.success(
//           `You have successfully joined the ride. Seats left: ${response.data.seats}`
//         );
//         navigate("/account/bookings");
//         setMyRides((currentRides) =>
//           currentRides.map((r) =>
//             r._id === ride._id ? { ...r, seats: response.data.seats } : r
//           )
//         );
//       })
//       .catch((error) => {
//         console.error("Failed to join the ride:", error);
//         toast.error(
//           error.response?.data?.message || "Failed to join the ride."
//         );
//       });
//   };

//   const datetime = (dateStr) => {
//     return new Date(dateStr).toLocaleString();
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <div
//         className={`w-full max-w-4xl ${
//           myRides.length > 2 ? "scrollable-rides" : ""
//         }`}
//       >
//         <h2 className="text-red-700 text-2xl font-bold mb-4 text-center">
//           Posted Rides
//         </h2>
//         {myRides.length > 0 ? (
//           myRides.map((ride) => {
//             const isUserAPassenger = ride.passengers.some(
//               (p) => p.userId === user._id
//             );
//             const hasDeparted = new Date() > new Date(ride.departure);

//             return (
//               <div
//                 key={ride._id}
//                 className="border bg-gray-200 p-4 rounded-xl mb-4 flex justify-between items-start"
//               >
//                 <div className="flex-1">
//                   <div className="font-bold text-lg">{ride.creatorName}</div>
//                   <div>
//                     Riding from {ride.from} to {ride.to}
//                   </div>
//                   <div>Seats: {ride.seats}</div>
//                   <div>Departure Date: {datetime(ride.departure)}</div>
//                   <div>Arrival Date: {datetime(ride.arrival)}</div>
//                   <div>Car: {ride.carDetails}</div>
//                   <div>Driver-email: {ride.creator.email}</div>
//                   <div>Driver-Phone No: {ride.creator.phone}</div>
//                 </div>
//                 <div className="text-right text-lg font-semibold">
//                   <div>₹{ride.price}</div>

//                   {isUserAPassenger ? (
//                     <div className="text-green-500">Already Booked</div>
//                   ) : hasDeparted ? (
//                     <div className="text-red-500">Ride Started</div>
//                   ) : (
//                     ride.seats > 0 &&
//                     user._id !== ride.creator._id && (
//                       <button
//                         onClick={() => joinRide(ride)}
//                         className="bg-primary hover:bg-green-300 text-white font-bold py-1 px-3 rounded-full mt-2"
//                       >
//                         Join Ride
//                       </button>
//                     )
//                   )}
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center">No rides posted yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// src/components/PostedRides.js

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import "../css/ridestyle.css";
import JoinButton from "../components/JoinButton";
import { toast } from "react-toastify";

export default function PostedRides() {
  const { user } = useContext(UserContext);
  const [myRides, setMyRides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/myrides/all")
      .then((response) => {
        setMyRides(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch rides:", error);
      });
  }, [user._id]);

  const updateSeats = (rideId, newSeats) => {
    setMyRides((currentRides) =>
      currentRides.map((r) =>
        r._id === rideId ? { ...r, seats: newSeats } : r
      )
    );
  };

  const datetime = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-full max-w-4xl ${
          myRides.length > 2 ? "scrollable-rides" : ""
        }`}
      >
        <h2 className="text-red-700 text-2xl font-bold mb-4 text-center">
          Posted Rides
        </h2>
        {myRides.length > 0 ? (
          myRides.map((ride) => (
            <div
              key={ride._id}
              className="border bg-gray-200 p-4 rounded-xl mb-4 flex justify-between items-start"
            >
              <div className="flex-1">
                <div className="font-bold text-lg">{ride.creatorName}</div>
                <div>
                  Riding from {ride.from} to {ride.to}
                </div>
                <div>Seats: {ride.seats}</div>
                <div>Departure Date: {datetime(ride.departure)}</div>
                <div>Arrival Date: {datetime(ride.arrival)}</div>
                <div>Car: {ride.carDetails}</div>
                <div>Driver-email: {ride.creator.email}</div>
                <div>Driver-Phone No: {ride.creator.phone}</div>
              </div>
              <div className="text-right text-lg font-semibold">
                <div>₹{ride.price}</div>
                <JoinButton
                  ride={ride}
                  user={user}
                  onSeatsUpdate={(newSeats) => updateSeats(ride._id, newSeats)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No rides posted yet.</p>
        )}
      </div>
    </div>
  );
}
