import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Header from './Components/Header'
import Section from './Components/Section'
import Footer from './Components/Footer'
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import About from './Pages/About';
import Book from './Pages/Book';
import { CartProvider } from './Contexts/CartContexts';
import Cart from './Contexts/Cart';
import ProductDetails from './Contexts/ProductDetails';
import CheckOut from './Components/CheckOut';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function App() {

  return (
    <>
    <PayPalScriptProvider>
      <CartProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/menu" element={<Menu />} />
          <Route path='/about' element={<About/>} />
          <Route path='/book' element={<Book/>} />
          <Route path='/cart' element={<Cart/> }/>
          <Route path='/product/:id' element={<ProductDetails/>} />
          <Route path='/checkout' element={<CheckOut/>} />
        </Routes>
        <Footer/>
      </Router>
    </CartProvider>
    </PayPalScriptProvider>
    
    
    </>
  )
}

export default App