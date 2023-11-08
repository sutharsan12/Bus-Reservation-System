import React, { useState, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HappyRide.css';

const BlackpearlBusDescription = () => {
  const [busLayoutData, setBusLayoutData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsSelected, setSeatsSelected] = useState(false);
  const [totalFare, setTotalFare] = useState(0);

  const fixedBookedSeats = [
    '03', '04', '05', '18', '19', '20', '41', '42', '46', '47', '23' , '24' , '25'
  ];

  const location = useLocation();
  const { date } = location.state || {};

  useEffect(() => {
    const rows = Math.ceil(50 / 5); 
    const newData = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        const seatNumber = (i * 5 + (j) + 1).toString().padStart(2, '0');
        const seatObject = {
          type: 'seat',
          number: seatNumber,
          occupied: false,
        };
        row.push(seatObject);
      }
      newData.push(row);
    }

    fixedBookedSeats.forEach(seatNumber => {
      const rowIndex = Math.floor((parseInt(seatNumber, 10) - 1) / 5);
      const seatIndex = (parseInt(seatNumber, 10) - 1) % 5;
      newData[rowIndex][seatIndex].occupied = true;
    });

    setBusLayoutData(newData);
    // eslint-disable-next-line
  }, []);

  const amenitiesData = [
    { name: 'Wi-Fi', description: 'Stay connected with free Wi-Fi during the journey', icon: '📶' },
    { name: 'Air Conditioning', description: 'Enjoy a comfortable ride with air conditioning', icon: '❄' },
    { name: 'Refreshments', description: 'Complimentary snacks and drinks available', icon: '🍔' },
    { name: 'Luggage Storage', description: 'Store your luggage securely during the journey', icon: '🧳' },
    { name: 'On-board Attendant', description: 'Enjoy personalized assistance from an on-board attendant throughout the trip', icon: '👷‍♂' },
    { name: 'Power Outlets', description: 'Charge your devices with available power outlets', icon: '🔌' },
    { name: 'Complimentary Blankets', description: 'Stay warm and cozy during the journey with complimentary blankets', icon: '🛌' },
 
  ];

  const handleSeatClick = (rowIndex, seatIndex) => {
    const newBusLayout = [...busLayoutData];
    const seat = newBusLayout[rowIndex][seatIndex];

    if (seat.type === 'seat') {
      seat.occupied = !seat.occupied;
      setBusLayoutData(newBusLayout);

      const updatedSelectedSeats = newBusLayout
        .flatMap(row => row.filter(seat => seat.occupied))
        .map(seat => seat.number);

      setSelectedSeats(updatedSelectedSeats);
      setSeatsSelected(updatedSelectedSeats.length > 0);

       // Calculate fare based on selected seats only
       let newTotalFare = updatedSelectedSeats.filter(seat => !fixedBookedSeats.includes(seat)).length * 1200;
       setTotalFare(newTotalFare);
    }
  };

  const handleDeselectAll = () => {
    const newBusLayout = busLayoutData.map(row =>
      row.map(seat => {
        if (seat.occupied && !fixedBookedSeats.includes(seat.number)) {
          return {
            ...seat,
            occupied: false,
          };
        } else {
          return seat;
        }
      })
    );

    setBusLayoutData(newBusLayout);
    setSelectedSeats([]);
    setSeatsSelected(false);

    setTotalFare(0); // Clear the total fare when deselecting all seats
  };

  const handleBookNow = () => {
    const selectedSeatsParam = selectedSeats.filter((seat) => !fixedBookedSeats.includes(seat)).join(',');
    const bookingurl = `/booking?busId=${encodeURIComponent('2')}&selectedSeats=${selectedSeatsParam}&date=${date}&fare=${totalFare}`;
    window.location.href = bookingurl;
  };


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <img
              src="https://wallpapercave.com/wp/wp9185666.jpg"
              className="card-img-top"
              alt="BlackPearl Bus"
            />
            <div className="card-body">
              <h2 className="card-title">Bus Name: Blackpearl</h2>
              <h3 className="card-subtitle mb-2 text-muted">Amenities</h3>
              <ul className="list-group">
                {amenitiesData.map((amenity, index) => (
                  <li key={index} className="list-group-item">
                    {amenity.icon} {amenity.name}: {amenity.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Bus Layout</h3><br></br>
              <h4 className="card-subtitle mb-2 ">Coimbatore To Chennai</h4><br></br>
              <div className="bus-layout">
                {busLayoutData.map((row, rowIndex) => (
                  <div className="bus-row" key={rowIndex}>
                    {row.slice(0, 2).map((seat, seatIndex) => (
                      <div
                        key={seatIndex}
                        className={`bus-${seat.type} ${seat.occupied ? 'occupied' : 'available'} ${seat.occupied && fixedBookedSeats.includes(seat.number) ? 'fixed-booked' : ''}`}
                      >
                        {seat.type === 'seat' && !seat.occupied ? (
                          <button
                            className="seat-button"
                            onClick={() => handleSeatClick(rowIndex, seatIndex)}
                          >
                            💺{seat.number.padStart(2, '0')}
                          </button>
                        ) : (
                          <span className="seat-occupied">💺</span>
                        )}
                      </div>
                    ))}
                    <div className="bus-aisle empty" /> {/* Gap */}
                    {row.slice(2).map((seat, seatIndex) => {
                      const seatNumber = rowIndex * 5 + 2 + seatIndex + 1;
                      const formattedSeatNumber = seatNumber.toString().padStart(2, '0');
                      
                      return (
                        <div
                          key={seatIndex + 2}
                          className={`bus-${seat.type} ${seat.occupied ? 'occupied' : 'available'} ${seat.occupied && fixedBookedSeats.includes(seat.number) ? 'fixed-booked' : ''}`}
                        >
                          {seat.type === 'seat' && !seat.occupied ? (
                            <button
                              className="seat-button"
                              onClick={() => handleSeatClick(rowIndex, seatIndex + 2)}
                            >
                              💺{formattedSeatNumber}
                            </button>
                          ) : (
                            <span className="seat-occupied">💺</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div><div>
              <h3>Total Fare: Rs.{totalFare}</h3>
              <p>Bus Name : Blackpearl</p>
                <p>Date: {date}</p>
                <p>Selected Seats: {selectedSeats.filter(seat => !fixedBookedSeats.includes(seat)).join(', ')}</p>
      </div>
      <br></br>
              <Link to="/booking"
              className={`btn btn-primary ${seatsSelected ? '' : 'disabled'}`} 
              onClick={handleBookNow}>
              Proceed
              </Link>
              <button className="btn btn-danger ml-2" onClick={handleDeselectAll}>
                Deselect All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackpearlBusDescription;