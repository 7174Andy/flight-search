"use client";

import { useRouter } from "next/navigation";
import style from "./home.module.css";
import { useState } from "react";

async function getFlights(departureAirport, arrivalAirport) {
  const apiKey = "6747b36a7b3c2ca47e604ffc";
  const departureDate = "20241201";

  const url = `https://api.flightapi.io/trackbyroute/${apiKey}?date=${departureDate}&airport1=${departureAirport}&airport2=${arrivalAirport}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched flights:", data);
    return data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    return [];
  }
}

export default function Page() {
  const router = useRouter();

  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchFlights() {
    if (!departure || !destination) {
      alert("Please enter both departure and destination.");
      return;
    }

    setLoading(true);
    setError("");
    setFlights([]);

    try {
      const flights = await getFlights(departure, destination);
      if (flights.length === 0) {
        setError("No flights found.");
      } else {
        setFlights(flights);
      }
    } catch (err) {
      setError("An error occurred while fetching flights.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.topRight}>
        <button
          className={style.signInButton}
          onClick={() => router.push("/login")}
        >
          Login
        </button>
        <button className={style.signInButton}>Signup</button>
      </div>
      <h1 className={style.title}>Flight Search</h1>
      <input
        className={style.searchBar}
        type="text"
        placeholder="Enter departure"
        onChange={(e) => setDeparture(e.target.value)}
      />
      <input
        className={style.searchBar}
        type="text"
        placeholder="Enter destination"
        onChange={(e) => setDestination(e.target.value)}
      />
      <button className={style.searchButton} onClick={searchFlights}>
        Search
      </button>

      <div className={style.results}>
        {loading ? (
          <p>Loading flights...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : flights.length > 0 ? (
          <ul className={style.listContainer}>
            {flights.map((flight, index) => (
              <li key={index} className={style.listItem}>
                {flight.Airline} - {flight.DepartureTime} - {flight.ArrivalTime}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results yet. Start your search!</p> // Default message
        )}
      </div>
    </div>
  );
}
