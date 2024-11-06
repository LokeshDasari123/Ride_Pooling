import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";

function JoinedPage() {
  const [rides, setRides] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [submittingFeedback, setSubmittingFeedback] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user._id) {
      setIsLoading(true);
      axios
        .get(`/joined?userId=${user._id}`)
        .then((response) => {
          setRides(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch rides:", error);
          setError("Failed to fetch rides");
          setIsLoading(false);
        });
    }
  }, [user]);

  const cancelRide = async (rideId) => {
    try {
      await axios.patch(`/rides/${rideId}/cancel`, { userId: user._id });
      setRides((prevRides) => prevRides.filter((ride) => ride._id !== rideId));
    } catch (error) {
      console.error("Failed to cancel the ride:", error);
      setError("Failed to cancel the ride");
    }
  };

  const handleFeedbackChange = (rideId, value) => {
    setFeedback({ ...feedback, [rideId]: value });
  };

  const submitFeedback = (rideId) => {
    if (!feedback[rideId] || feedback[rideId].trim() === "") {
      toast("Please enter some feedback before Submitting", {
        style: { backgroundColor: "blue", color: "white" },
      });
      // alert("Please enter some feedback before submitting.");
      return;
    }

    setSubmittingFeedback({ ...submittingFeedback, [rideId]: true });

    axios
      .post(`/rides/${rideId}/feedback`, {
        userId: user._id,
        comment: feedback[rideId],
      })
      .then((response) => {
        toast.success("Feedback submitted successfully!");
        // alert("Feedback submitted successfully!");
        setRides(
          rides.map((ride) => {
            if (ride._id === rideId) {
              let updatedRide = { ...ride };
              updatedRide.feedbacks = response.data.feedbacks;
              return updatedRide;
            }
            return ride;
          })
        );
        setFeedback({ ...feedback, [rideId]: "" });
        setSubmittingFeedback({ ...submittingFeedback, [rideId]: false });
      })
      .catch((error) => {
        console.error("Failed to submit feedback:", error);
        toast.error("Failed to submit feedback. Please try again");
        // alert("Failed to submit feedback. Please try again.");
        setSubmittingFeedback({ ...submittingFeedback, [rideId]: false });
      });
  };

  if (isLoading)
    return <div className="flex justify-center items-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`w-full max-w-4xl ${
          rides.length > 3 ? "scrollable-rides" : ""
        }`}
      >
        <h1 className="text-red-700 text-2xl font-bold mb-4 text-center">
          Joined Rides
        </h1>
        {rides.length > 0 ? (
          rides.map((ride) => {
            const userBooking = ride.passengers.find(
              (p) => p.userId._id.toString() === user._id
            );
            const now = new Date();
            const departure = new Date(ride.departure);
            const arrival = new Date(ride.arrival);
            const isRideInProgress = now > departure && now < arrival;
            const isRideCompleted = now > arrival;
            const existingFeedback = ride.feedbacks.find(
              (f) => f.userId === user._id
            );
            return (
              <div
                key={ride._id}
                className="border bg-gray-200 p-4 rounded-xl mb-4 flex flex-col md:flex-row justify-between"
              >
                <div>
                  <h2 className="font-bold text-lg">
                    {ride.from} to {ride.to}
                  </h2>
                  <p>Date: {departure.toLocaleDateString()}</p>
                  {userBooking && (
                    <p>Seats Booked: {userBooking.seatsBooked}</p>
                  )}
                </div>
                <div className="text-right space-y-2 mt-4 md:mt-0">
                  <p className="text-lg font-bold">₹{ride.price}</p>
                  {isRideInProgress && (
                    <p className="text-blue-500">Ride in Progress</p>
                  )}
                  {isRideCompleted && existingFeedback ? (
                    <p className="text-green-500">
                      Your Feedback: "{existingFeedback.comment}"
                    </p>
                  ) : (
                    isRideCompleted && (
                      <>
                        <p className="text-green-500">Ride Completed</p>
                        <textarea
                          className="border p-2 rounded-xl w-2/3 mt-2"
                          placeholder="Enter your feedback"
                          value={feedback[ride._id] || ""}
                          onChange={(e) =>
                            handleFeedbackChange(ride._id, e.target.value)
                          }
                          disabled={submittingFeedback[ride._id]}
                        />
                        <button
                          onClick={() => submitFeedback(ride._id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2 disabled:bg-blue-300"
                          disabled={submittingFeedback[ride._id]}
                        >
                          {submittingFeedback[ride._id]
                            ? "Submitting..."
                            : "Submit Feedback"}
                        </button>
                      </>
                    )
                  )}
                  {new Date(ride.departure).getTime() >
                    new Date().getTime() && (
                    <button
                      onClick={() => cancelRide(ride._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                    >
                      Cancel Ride
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No rides joined yet.</p>
        )}
      </div>
    </div>
  );
}

export default JoinedPage;
