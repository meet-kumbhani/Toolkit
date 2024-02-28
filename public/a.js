import React, { useEffect, useState } from "react";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.min.css";
import { useDispatch } from "react-redux";
import { addToCart, updateQuantity } from "../toolkit/slice";
import { productURL, cartURL } from "../config/url";
import axios from "axios";

const ProductDetail = () => {
  const [clothInfo, setClothInfo] = useState(null);
  const [addcart, setAddCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${productURL} / ${id}`)
      .then((result) => {
        setClothInfo(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${cartURL} / ${id}`)
      .then((result) => {
        if (result.data && result.data.quantity > 0) {
          setAddCart(true);
          setQuantity(result.data.quantity);
        } else {
          setAddCart(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  let addProduct = () => {
    if (!addcart) {
      dispatch(addToCart(clothInfo));
      Swal.fire({
        position: "top-end",
        width: "420px",
        icon: "success",
        title: "Product added in cart",
        showConfirmButton: false,
        timer: 1500
      });
      setAddCart(true);
    } else {
      console.log("already added");
    }
  };

  const qtyupdate = (newQuantity) => {
    setQuantity(newQuantity);
    dispatch(updateQuantity({ itemId: clothInfo.id, quantity: newQuantity }));
  };

  return (
    <>
      {clothInfo ? (
        <div className="container mt-5 mb-3">
          <div className="row">
            <div className="col-md-12 col-lg-6 col-sm-12 mt-5 mb-5">
              <div>
                <img src={clothInfo.image}
                  alt="Not Found"
                  width={"70%"}
                  height={"400px"}
                />
              </div>
            </div>
            <div className="col-md-12 col-lg-6 col-sm-12 mt-5">
              <div>
                <h2>{clothInfo.type}</h2>
                <h6>Brand : {clothInfo.brand}</h6>
                <h6>Color : {clothInfo.color}</h6>
                <h6>Size : {clothInfo.size}</h6>
                <h6>Price: ₹ {clothInfo.price}</h6>
                <h6>Description : {clothInfo.description}</h6>
              </div>
              <div className="mt-5">
                {addcart ? (
                  <div className="d-flex align-items-center">
                    <button className="me-5 btn btn-success">Buy Now</button>
                    <button className="btn btn-warning">
                      <FaMinusSquare className="fs-5 me-2" onClick={() => qtyupdate(quantity - 1)} />
                      Quantity: {quantity}
                      <FaPlusSquare className="fs-5 ms-2" onClick={() => qtyupdate(quantity + 1)} />
                    </button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <button className="me-5 btn btn-success">Buy Now</button>
                    <button
                      className="me-5 btn btn-warning"
                      onClick={addProduct}>
                      Add To Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductDetail;