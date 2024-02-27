import React from 'react'
import Mynavbar from './Components/Mynavbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Productlist from "./Components/Productlist"
import Cart from './Components/Cart';
import Productdetails from './Components/Productdetails';
import "./App.css"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Mynavbar />
        <Routes>
          <Route path='/' element={< Productlist />}></Route >
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/productdetails/:id' element={<Productdetails />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
