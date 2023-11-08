import React, { useState, useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HappyRide.css';

const WhitepearlBusDescription = () => {
  const [busLayoutData, setBusLayoutData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsSelected, setSeatsSelected] = useState(false);
  const [totalFare, setTotalFare] = useState(0);

  const fixedBookedSeats = [
    '03', '04', '05', '18', '19', '20', '41', '42', '46', '47','06','07','11','16','21','22','26','33','34','38','39','40'
  ]

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
    { name: 'Personal AC Controls', description: 'Adjust the air conditioning according to your preference', icon: '⚙' },
    { name: 'Refreshments', description: 'Complimentary snacks and drinks available', icon: '🍔' },
    { name: 'Premium Seating', description: 'Upgrade to luxurious premium seating', icon: '👑' },
    { name: 'TV Screens', description: 'Entertainment with in-seat TV screens', icon: '📺' },
    { name: 'Meal Service', description: 'Enjoy a delicious meal with on-board meal service', icon: '🍽' },
    { name: 'Multiple Charging Ports', description: 'Charge multiple devices with extra charging ports', icon: '🔌🔌' },
    
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
      let newTotalFare = updatedSelectedSeats.filter(seat => !fixedBookedSeats.includes(seat)).length * 300;
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

    setTotalFare(0);
  };

  const handleBookNow = () => {
    const selectedSeatsParam = selectedSeats.filter((seat) => !fixedBookedSeats.includes(seat)).join(',');
    const bookingUrl = `/booking?busId=${encodeURIComponent('5')}&selectedSeats=${selectedSeatsParam}&date=${date}&fare=${totalFare}`;
    window.location.href = bookingUrl;
  };
  
  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <img
              src="https://i.pinimg.com/originals/e5/2f/0d/e52f0dd914309ad8023bb2ca3b0d5218.png"
              className="card-img-top"
              alt="WhitePearl Bus"
            />
            <div className="card-body">
              <h2 className="card-title">Bus Name: Whitepearl</h2>
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
              <h4 className="card-subtitle mb-2 ">Salem To Bangalore</h4><br></br>
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
              <p>Bus Name : WhitePearl</p>
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

export default WhitepearlBusDescription;