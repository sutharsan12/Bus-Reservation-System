import './App.css';
import {Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Buses from './pages/Buses';
import Header from './pages/Header';
import Login from './pages/Login';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import About from './pages/About';
import BusSearch from './pages/BusSearch';
import BookingSuccessful from './pages/BookingDetails';
import Register from './pages/Register';
import HappyRide from './pages/HappyRide';
import BlackPearl from './pages/BlackPearl';
import Vip from './pages/Vip';
import BlueBus from './pages/BlueBus';
import WhitePearl from './pages/WhitePearl';
import React from 'react';
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
        <Route path="/bus/1" element={<HappyRide/>}></Route>
        <Route path="/bus/2" element={<BlackPearl/>}></Route>
        <Route path="/bus/3" element={<Vip/>}></Route>
        <Route path="/bus/4" element={<BlueBus/>}></Route>
        <Route path="/bus/5" element={<WhitePearl/>}></Route>
        <Route path="/BusSearch" element={<BusSearch/>}></Route>
        <Route path="/bookingsuccess" element={<BookingSuccessful/>}></Route>
      </Routes>
    </div>
  );
}

export default App;