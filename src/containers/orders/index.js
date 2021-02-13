import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import './style.scss'
import Layout from './../../components/layout/index';
import Card from './../../components/ui/input/Card/index';
import { updateOrder } from "../../actions/order.action";


import { FcCheckmark } from "react-icons/fc";
/**
 * @author
 * @function Orders
 **/

const Orders = (props) => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  
  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };
 

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };
  console.log(order)
  return (
    <Layout sidebar >
      <div className="for_font layoo">
      {order.orders && order.orders.map((orderItem, index) => (
        <Card
          style={{
            margin: "10px 0",
          }}
          key={index}
          headerLeft={`Order-Id:  ${orderItem._id}`}
        >
          <div className="orders_wrap">
          <div
            className="order_wraper"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "30px 30px",
              alignItems: "center",
            }}
          >
            <div>
              <div className="title for_font">Items</div>
              {orderItem.items.map((item, index) => (
                <div className="value" key={index}>
                  {item.productId.name}
                </div>
              ))}
            </div>
            <div>
              <span className="title for_font">Total Price</span>
              <br />
              <span className="value for_font">{orderItem.totalAmount}</span>
            </div>
            <div>
              <span className="title for_font">Payment Type</span> <br />
              <span className="value for_font">{orderItem.paymentType}</span>
            </div>
            <div>
              <span className="title for_font">Payment Status</span> <br />
              <span className="value for_font">{orderItem.paymentStatus}</span>
            </div>
          </div>
                <div
                  className="order_footer_wraper"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "30px 30px",
                    alignItems: "center",
                  }}
                >
                  <div>
                  <span className="title for_font">Username</span>
                  <br />
                  <span className="value for_font">
                  {
                      order.addres.map(element => 
                        element.address.find(elem=>elem._id == orderItem.addressId) &&
                       (
                         <div className="he">
                             {
                             element.address.find(elem=>elem._id == orderItem.addressId).name  && element.address.find(elem=>elem._id == orderItem.addressId).name
                              }
                         </div>
                       ))
                            

                  }

                  </span>
                </div>
                <div>
                  <span className="title for_font">Addres</span> <br />
                  <span className="value for_font">

                  {
                      order.addres.map(element => 
                        element.address.find(elem=>elem._id == orderItem.addressId) &&
                       (
                         <div className="he">
                             {
                             
                             element.address.find(elem=>elem._id == orderItem.addressId).address &&  element.address.find(elem=>elem._id == orderItem.addressId).address
                              }
                         </div>
                       ))
                            

                  }
                  </span>
                </div>
                <div>
                  <span className="title for_font">Tel:</span> <br />
                  <span className="value for_font">
                  {/* {
                    order.addres.forEach(element => {
                      element.address.find((elem)=>elem._id == orderItem.addressId) &&
                      console.log("find",element.address.find((elem)=>elem._id == orderItem.addressId).name)  
                    })}{
                    console.log(orderItem.addressId)
                  } */}
                  {
                      order.addres.map(element => 
                        element.address.find(elem=>elem._id == orderItem.addressId) &&
                       (
                         <div className="he">
                             {
                            element.address.find(elem=>elem._id == orderItem.addressId).mobileNumber &&  element.address.find(elem=>elem._id == orderItem.addressId).mobileNumber
                              }
                         </div>
                       ))
                            

                  }
                    </span>
                </div>
                  
                
              </div>

          <div
            className="bottom_wraper_order"
            style={{
              boxSizing: "border-box",
              padding: "30px 40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="orderTrack">
              {orderItem.orderStatus.map((status) => (
                <div
                  className={`orderStatus ${
                    status.isCompleted ? "active" : ""
                  }`}
                >
                  <div
                    className={`point ${status.isCompleted ? "active" : ""}`}
                  ></div>
                  <div className="orderInfo">
                    <div className="status">{status.type}</div>
                    <div className="date">{formatDate(status.date)}</div>
                  </div>
                </div>
              ))}
            </div>

           
            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <select className="select_order" onChange={(e) => setType(e.target.value)}>
                <option value={""}>select status</option>
                {orderItem.orderStatus.map((status) => {
                  return (
                    <>
                      {!status.isCompleted ? (
                        <option className="select_option_order" key={status.type} value={status.type}>
                          {status.type}
                        </option>
                      ) : null}
                    </>
                  );
                })}
              </select>
            </div>
            

            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <button className="confirm_btn_order" onClick={() => onOrderUpdate(orderItem._id)}>
               confirm
              </button>
            </div>
          </div>
          </div>
          
        </Card>
      ))}
      </div>
    </Layout>
  );
};

export default Orders;
