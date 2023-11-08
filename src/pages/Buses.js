import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Buses.css';

const Buses = () => {
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        axios.get('/api/buses/')
            .then(response => {
                setBuses(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h2 className="text-info">Bus Details</h2>
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
                    {buses.map(bus => (
                        <tr key={bus.id}>
                            <td>{bus.name}</td>
                            <td>{bus.source}</td>
                            <td>{bus.destination}</td>
                            <td>{bus.departure_time}</td>
                            <td>{bus.arrival_time}</td>
                            <td>{bus.fare}</td>
                            <td>{bus.total_seats}</td>
                            <td>{bus.available_seats}</td>
                            <td><img src={bus.img} alt="" height="150" width="190" /></td>
                            <td><Link to={`/bus/${bus.id}`} className="btn btn-warning">Book Now</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Buses;