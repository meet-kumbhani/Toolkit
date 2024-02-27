import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateQuantity } from "../Redux/Slice";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Cart = () => {
  let data = useSelector((state) => state.user.product);
  console.log(data);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      // Dispatch the updateQuantity action
      await dispatch(updateQuantity({ productId, quantity: newQuantity }));
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error updating quantity:", error.message);
    }
  };

  return (
    <div className="container">
      {data?.map((item) => (
        <>
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

                <button className="btn btn-outline-danger rounded-pill">
                  Remove item
                </button>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Cart;
