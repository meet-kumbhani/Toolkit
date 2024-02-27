import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, removeFromCart, updateQuantity } from "../Redux/Slice";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Carturl } from "../Config/Urls";
import axios from "axios";

const Cart = () => {
  let data = useSelector((state) => state.user.product);
  console.log(data);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const deleteproduct = (itemId) => {
    axios
      .delete(`${Carturl}/${itemId}`)
      .then((response) => {
        dispatch(removeFromCart(itemId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await dispatch(updateQuantity({ productId, quantity: newQuantity }));
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  };

  let allitemtotal = data.reduce(
    (total, item) => total + item?.price * item?.quantity,
    0
  );

  if (!allitemtotal) {
    return (
      <>
        <div className="d-flex justify-content-center mt-4">
          <img
            src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
            alt=""
            className="h-50 w-50"
          />
        </div>

        <h2 className="text-center">Your Cart is empty</h2>
        <h5 className="text-center">Shop today's deals</h5>
      </>
    );
  }

  return (
    <div className="container">
      {data?.map((item) => (
        <div className="row mt-5" key={item.id}>
          <div className="col-md-2 col-lg-2 col-sm-12">
            <img
              src={item.image}
              alt="cart-img"
              className="w-100"
              height="250px"
            />
          </div>

          <div className="col-md-10 col-lg-10 col-sm-12">
            <div className="item-details">
              <h5>{item.fullname}</h5>
              <h5>Price:- ₹{item.price}/- Only❣</h5>
              <h5>Variant:- {item.storage}</h5>
              <h5 className="d-flex align-items-center">
                Quantity:-
                <RemoveCircleOutlineIcon
                  fontSize="small"
                  className="me-2"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                />
                {item.quantity}
                <ControlPointIcon
                  fontSize="small"
                  className="ms-2"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                />
              </h5>

              <h4>Total:- ₹{item.price * item.quantity}</h4>

              <button
                className="btn btn-outline-danger rounded-pill"
                onClick={() => deleteproduct(item.id)}
              >
                Remove item
              </button>
            </div>
          </div>
        </div>
      ))}
      <hr />
      <h3 className="text-end">Total Amount: ₹{allitemtotal}</h3>
    </div>
  );
};

export default Cart;
