import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Listurl } from "../Config/Urls";

const Productdetails = () => {
  const [productdata, setProductdata] = useState([]);
  let { id } = useParams();

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
  return (
    <>
      {productdata ? (
        <>
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
                    <button className="buynow-btn me-2">Buy Now</button>
                    <button className="cart-btn">Add To Cart</button>

                    {/* <ControlPointIcon fontSize="small" className="ms-2" /> */}
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
