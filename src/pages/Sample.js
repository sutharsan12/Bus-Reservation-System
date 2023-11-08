import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingSuccessful from "./BookingDetails";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import jsPDF from "jspdf";
import { useLocation } from 'react-router-dom';

const API_URL = "http://127.0.0.1:8000/api/";

const Booking = () => {
  const [buses, setBuses] = useState([]);
  const [busId, setBusId] = useState("");
  const [busName, setBusName] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [passengerAge, setPassengerAge] = useState("");
  const [passengerGender, setPassengerGender] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [totalFare, setTotalFare] = useState("");
  const [errors, setErrors] = useState({});
  const [showBookingSuccessful, setShowBookingSuccessful] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedSeats = (searchParams.get('selectedSeats') || '').split(',');
  const date = searchParams.get('date') || '';
  const fare = searchParams.get('fare') || '';
  const BusName = searchParams.get('BusName') ||'';
  useEffect(() => {
    setBusName(BusName);
    setSeatNumber(selectedSeats[0] || '');
    setBookingDate(date);
    setTotalFare(fare);
  }, [BusName, selectedSeats, date]);

  useEffect(() => {
    fetch("/api/buses")
      .then((response) => response.json())
      .then((data) => {
        setBuses(data);
        if (busId) {
          const selectedBus = data.find((bus) => bus.id === parseInt(busId));
          if (selectedBus) {
            setBusName(selectedBus.name);
          }
        }
      })
      .catch((error) => console.log(error));
  }, [BusName]);

  const handleBusIdChange = (event) => {
    setBusId(event.target.value);
  };

  const handlePassengerNameChange = (event) => {
    setPassengerName(event.target.value);
  };

  const handlePassengerAgeChange = (event) => {
    setPassengerAge(event.target.value);
  };

  const handlePassengerGenderChange = (event) => {
    setPassengerGender(event.target.value);
  };

  const handleSeatNumberChange = (event) => {
    setSeatNumber(event.target.value);
  };

  const handleTotalFareChange = (event) => {
    setTotalFare(event.target.value);
  };

  const handleBookingDateChange = (event) => {
    setBookingDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passengerName === "") {
      setErrors({
        passengerName: "Passenger Name is required",
      });
    } else if (passengerAge === "") {
      setErrors({
        passengerAge: "Passenger Age is required",
      });
    } else if (passengerGender === "") {
      setErrors({
        passengerGender: "Passenger Gender is required",
      });
    } else if (seatNumber === "") {
      setErrors({
        seatNumber: "Seat Number is required",
      });
    } else if (totalFare === "") {
      setErrors({
        totalFare: "Total Fare is required",
      });
    } else if (bookingDate === "") {
      setErrors({
        bookingDate: "Booking Date is required",
      });
    } else {
      setShowAlert(true);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleAlertConfirm = (event) => {
    event.preventDefault();
    axios
      .post(API_URL + "tickets/", {
        bus: busId,
        passenger_name: passengerName,
        passenger_age: passengerAge,
        passenger_gender: passengerGender,
        seat_number: seatNumber,
        total_fare: totalFare,
        booking_date: bookingDate,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("Booking successful");
          setErrors({});
          setShowBookingSuccessful(true);
          setShowModal(true);
          setShowAlert(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrors(error.response.data.errors || {});
        }
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("Ticket", 10, 10);
    doc.text("Bus Name: " + busName, 10, 20);
    doc.text("Passenger Name: " + passengerName, 10, 30);
    doc.text("Passenger Age: " + passengerAge, 10, 40);
    doc.text("Passenger Gender: " + passengerGender, 10, 50);
    doc.text("Seat Number: " + seatNumber, 10, 60);
    doc.text("Total Fare: " + totalFare, 10, 60);
    doc.text("Booking Date: " + bookingDate, 10, 70);
    doc.save("ticket.pdf");
  };

  return (  
    <div className="container">
      <h2 className="text-center">Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Bus</label>
          {errors.bus && <p className="text-danger">{errors.bus}</p>}
          <select
            type="BusName"
            className="form-control"
            value={busId}
            onChange={handleBusIdChange}>
             <option value={BusName}>{BusName}</option>
            
          </select>
        </div>

        <div className="form-group">
          <label>Name</label>
          {errors.passengerName && <p className="text-danger">{errors.passengerName}</p>}
          <input
            type="text"
            name="passenger_name"
            className="form-control"
            value={passengerName}
            onChange={handlePassengerNameChange}/>
        </div>

        <div className="form-group">
          <label>Age</label>
          {errors.passengerAge && <p className="text-danger">{errors.passengerAge}</p>}
          <input
            type="number"
            name="passenger_age"
            className="form-control"
            value={passengerAge}
            onChange={handlePassengerAgeChange}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          {errors.passengerGender && <p className="text-danger">{errors.passengerGender}</p>}
          <select
            name="passenger_gender"
            className="form-control"
            value={passengerGender}
            onChange={handlePassengerGenderChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Seat Number</label>
          {errors.seatNumber && <p className="text-danger">{errors.seatNumber}</p>}
          <input
            type="number"
            name="seat_number"
            className="form-control"
            value={seatNumber}
            onChange={handleSeatNumberChange}
          />
        </div>

        <div className="form-group">
          <label>Total Fare</label>
          {errors.totalFare && <p className="text-danger">{errors.totalFare}</p>}
          <input
            type="number"
            name="total_fare"
            className="form-control"
            value={totalFare}
            onChange={handleTotalFareChange}
          />
        </div>

        <div className="form-group">
          <label>Booking Date</label>
          {errors.bookingDate && <p className="text-danger">{errors.bookingDate}</p>}
          <input
            type="date"
            name="booking_date"
            className="form-control"
            value={bookingDate}
            onChange={handleBookingDateChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Book</button>
        { showBookingSuccessful && 
            <Modal 
            show={showModal} 
            onHide={handleModalClose} 
            backdrop="static" 
            keyboard={false}
            >
            <Modal.Header closeButton>
              <Modal.Title>Booking Successful</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <BookingSuccessful busId={busId} busName={busName} passengerName={passengerName} passengerAge={passengerAge} passengerGender={passengerGender} seatNumber={seatNumber} totalFare={totalFare} bookingDate={bookingDate} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="info" onClick={generatePdf}>Generate PDF</Button>
            </Modal.Footer>
          </Modal>
        }
        {showAlert && 
            <Alert variant="info" onClose={handleAlertClose} dismissible >
                <Alert.Heading>Confirm Booking?</Alert.Heading>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={handleAlertClose} variant="outline-secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAlertConfirm} variant="outline-primary">
                        Confirm
                    </Button>
                </div>
            </Alert>
        }
      </form>
    </div>
  );
}

export default Booking;