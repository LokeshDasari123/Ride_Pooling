import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DateInput = ({ value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={onChange}
        className="border rounded-2xl p-2"
      />
    </div>
  );
};

function SearchFunc() {
  const [leavingFrom, setLeavingFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const navigate = useNavigate();

  const handleSearch = () => {
    axios
      .get("/search", {
        params: {
          from: leavingFrom,
          to: goingTo,
          date: date,
          seats: passengers,
        },
      })
      .then((response) => {
        navigate("/results", { state: { searchResults: response.data } });
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  return (
    <div className="search-bar mx-auto my-auto p-4 gap-2">
      <input
        type="text"
        placeholder="Leaving from"
        value={leavingFrom}
        onChange={(e) => setLeavingFrom(e.target.value)}
        className="rounded-2xl border px-2"
      />
      <input
        type="text"
        placeholder="Going to"
        value={goingTo}
        onChange={(e) => setGoingTo(e.target.value)}
        className="rounded-2xl border px-2"
      />
      <DateInput value={date} onChange={(e) => setDate(e.target.value)} />
      <input
        className="rounded-2xl border px-2"
        type="number"
        min="1"
        value={passengers}
        onChange={(e) => setPassengers(e.target.value)}
      />
      <button className="bg-primary rounded-xl p-3" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchFunc;
