import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carturl, Listurl } from "../Config/Urls";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../Redux/Slice";

const Productdetails = () => {
  const [productdata, setProductdata] = useState([]);
  const [addtocart, setAddtocart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${Listurl}/${id}`)
      .then((responce) => {
        setProductdata(responce.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  let handelcart = () => {
    dispatch(addToCart(productdata));
    setAddtocart(true);
  };

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(productdata.id, newQuantity);
    setQuantity(newQuantity);
    axios
      .patch(`${Carturl}/${id}`, { quantity: newQuantity })
      .then((response) => {
        console.log("qty updated cart", response.data);
      })
      .catch((error) => {
        console.error("qty error cart", error);
      });
  };

  return (
    <>
      {productdata ? (
        <>
          {quantity}
          <div className="container mb-3">
            <div className="row">
              <div className="col-md-12 col-lg-6 col-sm-12 mt-5">
                <div className="image-part">
                  <img
                    src={productdata.image}
                    alt=""
                    width="70%"
                    height="500px"
                  />
                  <div className="buttons mt-4">
                    {addtocart ? (
                      <>
                        <button className="buynow-btn me-2">Buy Now</button>

                        {/* <h5 className="d-flex align-items-center">
                          Quantity:-
                          <RemoveCircleOutlineIcon
                            fontSize="small"
                            className="me-2"
                          />
                          {quantity}
                          <ControlPointIcon fontSize="small" className="ms-2" />
                        </h5> */}
                        <h6 className="d-flex align-items-center quntity-btn">
                          Quantity:-
                          <RemoveCircleOutlineIcon
                            fontSize="small"
                            className="me-2"
                            onClick={() => handleQuantityChange(quantity - 1)}
                          />
                          {quantity}
                          <ControlPointIcon
                            fontSize="small"
                            className="ms-2"
                            onClick={() => handleQuantityChange(quantity + 1)}
                          />
                        </h6>
                      </>
                    ) : (
                      <>
                        <button className="buynow-btn me-2">Buy Now</button>
                        <button className="cart-btn" onClick={handelcart}>
                          Add To Cart
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12 mt-5">
                <div className="discription-part">
                  <h2>{productdata.fullname}</h2>
                  <h5>Model: {productdata.model}</h5>
                  <h5>{productdata.review}</h5>
                  <h5>Price: ₹{productdata.price} 10% Off</h5>
                  <h5>PackingFee: ₹{productdata.packaging_fee}</h5>

                  <h2 className="mt-5">Offers</h2>

                  <h5>{productdata.offers}</h5>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>hello</p>
      )}
    </>
  );
};

export default Productdetails;
