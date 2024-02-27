import React, { useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { fetchUserData } from "../Redux/Slice";
import { useDispatch, useSelector } from "react-redux";

const Mynavbar = () => {
  // let data = useSelector((state) => state.user.product);
  // let length = data.length;
  // let dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUserData());
  // }, [dispatch]);
  return (
    <Navbar expand="lg" className="bg-body-tertiary px-2">
      <Navbar.Brand>
        <Link className="nav-link" to="/">
          <img
            alt="logo"
            src="../rk.png"
            width="30"
            height="30"
            className="d-inline-block align-top rounded-circle"
          />{" "}
          RK Collection
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/" className="nav-link active">
            Product List
          </Link>
        </Nav>
        <Link to="/cart" className="nav-link">
          <span className="position-absolute translate-middle badge rounded-pill bg-danger">
            {0}
          </span>
          <AddShoppingCartIcon /> Cart
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Mynavbar;
