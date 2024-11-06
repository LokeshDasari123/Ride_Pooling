import  { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import "../css/ridestyle.css";
import { useNavigate, useLocation } from "react-router-dom";
import SearchFunc from "./SearchFunc";
import JoinButton from "../components/JoinButton"; // Import JoinButton component

function SearchResults() {
  const location = useLocation();
  const { searchResults } = location.state || { searchResults: [] };

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

  const handleSeatsUpdate = (rideId, updatedSeats) => {
    setMyRides((prevRides) =>
      prevRides.map((ride) =>
        ride._id === rideId ? { ...ride, seats: updatedSeats } : ride
      )
    );
  };

  const datetime = (dateStr) => {
    const date = dateStr.replace("T", " Time: ");
    return date.slice(0, date.length - 5);
  };

  return (
    <div className="container mx-auto py-8 my-auto">
      <SearchFunc className=""></SearchFunc>
      <h1 className="text-red-700 text-2xl font-bold mb-4 text-center">
        Search Results
      </h1>
      {searchResults.length > 0 ? (
        searchResults.map((ride) => (
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
              <div>Creator-email: {ride.creator.email}</div>
            </div>
            <div className="text-right text-lg font-semibold">
              <div>₹{ride.price}</div>
              <JoinButton
                ride={ride}
                user={user}
                onSeatsUpdate={(updatedSeats) =>
                  handleSeatsUpdate(ride._id, updatedSeats)
                }
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-red-400 text-l font-bold mb-4 text-center">
          No results found.
        </p>
      )}
    </div>
  );
}

export default SearchResults;
