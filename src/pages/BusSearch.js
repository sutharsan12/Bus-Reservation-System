import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Buses.css';
import Buses from './Buses'; 

const BusSearch = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [busDetails, setBusDetails] = useState([]);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const navigate = useNavigate();
  

  const handleSourceChange = (event) => {
    setSource(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleSearch = () => {
    if (!source || !destination) {
      alert('Please enter both source and destination.');
      return;
    }

    axios
      .get(`/api/buses/?source=${source}&destination=${destination}&date=${date}`)
      .then((response) => {
        console.log(response.data);
        const filteredBuses = response.data.filter(
          (bus) => bus.source === source && bus.destination === destination
        );
        setBusDetails(filteredBuses);
        setIsSearchPerformed(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBookNowClick = (selectedBus) => {
    navigate(`/bus/${selectedBus.id}`, {
      state: { date, fareDetails: { fare: selectedBus.fare } },
    });
  };

  const fetchSourceDestinationOptions = useCallback(() => {
    axios
      .get('/api/buses')
      .then((response) => {
        const uniqueSources = Array.from(new Set(response.data.map((bus) => bus.source)));
        const uniqueDestinations = Array.from(new Set(response.data.map((bus) => bus.destination)));

        setSourceOptions(uniqueSources);
        setDestinationOptions(uniqueDestinations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchSourceDestinationOptions();
  }, [fetchSourceDestinationOptions]);

  const handleSearchButtonClick = () => {
    if (!date) {
      alert('Please enter a date');
      return;
    }

    setIsSearchPerformed(false);
    handleSearch();
  };

  return (
    <div>
      <div>
        <br />
        <label htmlFor="source-input">Source:</label>
        <select
          id="source-input"
          value={source}
          onChange={handleSourceChange}
          style={{
            fontSize: '1.2rem',
            padding: '0.5rem',
            marginBottom: '1rem',
            marginRight: '1rem',
            marginLeft: '0.5rem',
          }}
        >
          <option value="">Select Source</option>
          {sourceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label htmlFor="destination-input">Destination:</label>
        <select
          id="destination-input"
          value={destination}
          onChange={handleDestinationChange}
          style={{
            fontSize: '1.2rem',
            padding: '0.5rem',
            marginBottom: '1rem',
            marginRight: '1rem',
            marginLeft: '0.5rem',
          }}
        >
          <option value="">Select Destination</option>
          {destinationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            fontSize: '1.2rem',
            padding: '0.5rem',
            marginBottom: '1rem',
            marginRight: '1rem',
            marginLeft: '0.5rem',
          }}
        />
        <button className="btn btn-primary" onClick={handleSearchButtonClick}>
          Search
        </button>
      </div>
      
      <div>
        {isSearchPerformed ? (
          busDetails.length > 0 ? (
            <>
              <h2 className="text-info">Bus Details</h2>
              <p>Total Buses: {busDetails.length}</p>
              <br></br>
          <table className="table table-bordered table-dark table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Fare</th>
                <th>Total Seats</th>
                <th>Available Seats</th>
                <th>Image</th>
                <th>Book Now</th>
              </tr>
            </thead>
            <tbody>
              {busDetails.map((bus) => (
                <tr key={bus.name}>
                  <td>{bus.name}</td>
                  <td>{bus.source}</td>
                  <td>{bus.destination}</td>
                  <td>{bus.departure_time}</td>
                  <td>{bus.arrival_time}</td>
                  <td>{bus.fare}</td>
                  <td>{bus.total_seats}</td>
                  <td>{bus.available_seats}</td>
                  <td>
                    <img src={bus.img} alt="" height="150" width="190" />
                  </td>
                  <td>
                  <button className="btn btn-warning" onClick={() => handleBookNowClick(bus)}>
                        Book Now
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
            <p>No bus details found. Please modify your search.</p>
          )
        ) : (
          <div>
        <Buses />
      </div>
        )}
      </div>
    </div>
  );
};

export default BusSearch;