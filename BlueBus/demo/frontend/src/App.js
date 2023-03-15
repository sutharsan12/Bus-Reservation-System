import './App.css';
import {Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Buses from './pages/Buses';
import Header from './pages/Header';
import Login from './pages/Login';
import Booking from './pages/Booking';
import BookingSuccessful from './pages/BookingDetails';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/About';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/Buses" element={<Buses/>}></Route>
        <Route path="/Booking" element={<Booking/>}></Route>
        <Route path="/Contact" element={<Contact/>}></Route>
        <Route path="/About" element={<About/>}></Route>
        <Route path="/bookingsuccess" element={<BookingSuccessful/>}></Route>
      </Routes>
    </div>
  );
}
export default App;