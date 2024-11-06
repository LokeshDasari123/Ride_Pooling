import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function PostedRides() {
  const { user } = useContext(UserContext);
  const [myRides, setMyRides] = useState([]);
  const [expandedDetail, setExpandedDetail] = useState({});

  useEffect(() => {
    if (user && user._id) {
      axios
        .get("/myrides")
        .then(({ data }) => {
          const filteredRides = data.filter(
            (ride) => ride.creator === user._id
          );
          setMyRides(filteredRides);
        })
        .catch((error) => {
          console.error("Failed to fetch rides:", error);
        });
    }
  }, [user._id]);

  const datetime = (date) => {
    return date.replace("T", " Time: ").slice(0, -5);
  };

  const toggleDetail = (rideId, detailType) => {
    setExpandedDetail((prevState) => {
      const isCurrentlyExpanded = prevState[rideId] === detailType;
      return {
        ...prevState,
        [rideId]: isCurrentlyExpanded ? null : detailType,
      };
    });
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
          myRides.map((ride) => {
            const now = new Date();
            const arrival = new Date(ride.arrival);
            const isRideCompleted = now > arrival;

            return (
              <div
                key={ride._id}
                className="border bg-gray-200 p-4 rounded-xl mb-4 flex justify-between items-start"
              >
                <div className="flex-1">
                  <div className="font-bold text-lg">{user.name}</div>
                  <div>
                    Riding from {ride.from} to {ride.to}
                  </div>
                  <div>Seats: {ride.seats}</div>
                  <div>Departure Date: {datetime(ride.departure)}</div>
                  <div>Arrival Date: {datetime(ride.arrival)}</div>
                  <div>Car: {ride.carDetails}</div>
                  <button
                    onClick={() => toggleDetail(ride._id, "passengers")}
                    className="bg-primary hover:bg-green-300 text-white font-bold py-2 px-3 rounded-md mt-2"
                  >
                    View Passengers
                  </button>
                  {isRideCompleted && (
                    <button
                      onClick={() => toggleDetail(ride._id, "feedback")}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-md mt-2 ml-2"
                    >
                      View Feedback
                    </button>
                  )}
                  {expandedDetail[ride._id] === "passengers" && (
                    <ul>
                      {ride.passengers.length > 0 ? (
                        ride.passengers.map((passenger, index) => (
                          <li key={`${passenger.userId._id}-${index}`}>
                            {passenger.userId.name} - {passenger.userId.email}
                          </li>
                        ))
                      ) : (
                        <li>Passengers not available</li>
                      )}
                    </ul>
                  )}
                  {expandedDetail[ride._id] === "feedback" &&
                    isRideCompleted && (
                      <ul>
                        {ride.feedbacks.length > 0 ? (
                          ride.feedbacks.map((feedback, index) => (
                            <li key={`${feedback._id}-${index}`}>
                              {index + 1}: {feedback.comment}
                            </li>
                          ))
                        ) : (
                          <li>Feedback not available</li>
                        )}
                      </ul>
                    )}
                </div>
                <div className="text-right text-lg font-semibold">
                  ₹{ride.price}
                  <div className="sticky bottom-2">
                    <Link
                      to={`/edit-ride/${ride._id}`}
                      className="text-red-500 hover:text-red-300"
                    >
                      Edit Ride
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No rides posted yet.</p>
        )}
      </div>
    </div>
  );
}
