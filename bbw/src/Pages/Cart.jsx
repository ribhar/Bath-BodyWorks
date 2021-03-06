import React, { useContext, useState } from "react";
import NavBar from "../Components/NavBar";
import Footer2 from "../Components/Footer/Footer2";
import { Link } from "react-router-dom";
import paypal from "../Images/paypal.png";
import shippingpick from "../Images/shippingpick.PNG";
import close from "../Images/close.png";
import { CartContext } from "../Context/CartProvider";

const Cart = () => {
  const {setCartLength} = useContext(CartContext);
  let cartItems = JSON.parse(localStorage.getItem("cartProducts"));
  // console.log("cartItems:", cartItems);

  const [cart, setCart] = useState(cartItems);
  const totalPrice = () => {
    const totalAmt = cart.reduce((acc, elem) => {
      return acc + Number(elem.Amount) * Number(elem.quantity);
    }, 0);
    let finalAmount = totalAmt;
    localStorage.setItem("totalAmountKey", finalAmount);
    return totalAmt;
  };
  const [totalp, setTotalprice] = useState(totalPrice);

  const handleDecrement = (e) => {
    for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].id === e.id) {
        if (cart[i].quantity > 1) {
          cart[i].quantity--;
          localStorage.setItem("cartProducts", JSON.stringify(cart));
          setCart([...cart]);
          break;
        }
      }
    }
    // console.log("Decrement");
    const tA = totalPrice();
    setTotalprice(tA);
  };

  const handleIncrement = (e) => {
    for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].id === e.id) {
        if (cart[i].quantity < 10) {
          cart[i].quantity++;
          localStorage.setItem("cartProducts", JSON.stringify(cart));
          setCart([...cart]);
          break;
        }
      }
    }
    // console.log("Increment");
    const tA = totalPrice();
    setTotalprice(tA);
  };
  const removeItem = (id) => {
    for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].id === id) {
        cart.splice(i, 1);
        localStorage.setItem("cartProducts", JSON.stringify(cart));
        setCart([...cart]);
        setCartLength(cart.length);
        // console.log("cart:", cart);
        break;
      }
    }
    // console.log("removed");
    const tA = totalPrice();
    setTotalprice(tA);
  };

  if (cart.length == []) {
    return (
      <>
        <NavBar />
        <div className="p-[20px]">
          <Link to={"/"}>
            <h1>
              <i
                className="bx bx-left-arrow-alt"
                style={{ color: "#7a7575", fontSize: "12px" }}
              ></i>{" "}
              <span className="text-[#7a7575] underline text-[12px]">
                CONTINUE SHOPPING
              </span>
            </h1>
          </Link>
        </div>
        <section className="h-[fit-content] w-[955px] m-auto">
          <div className="h-[42px]" style={{ borderBottom: "2px solid black" }}>
            <h1 className="text-center text-[22px] text-[#333333]">
              Your Shopping Bag is Empty
            </h1>
          </div>
          <div className="mt-[35px] h-[35px] w-[200px] m-auto">
            <Link to={"/"}>
              <button
                className="h-full w-full bg-[#333333] text-[14px] text-white hover:bg-[#e5e5e5] hover:text-black"
                style={{ transition: ".3s ease-in" }}
              >
                CONTINUE SHOPPING
              </button>
            </Link>
          </div>
        </section>
        <Footer2 />
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <div className="p-[20px]">
          <Link to={"/"}>
            <h1>
              <i
                className="bx bx-left-arrow-alt"
                style={{ color: "#7a7575", fontSize: "12px" }}
              ></i>{" "}
              <span className="text-[#7a7575] underline text-[12px]">
                CONTINUE SHOPPING
              </span>
            </h1>
          </Link>
        </div>
        <section className="h-[fit-content] w-[955px] m-auto">
          <div className="h-[42px]" style={{ borderBottom: "2px solid black" }}>
            <h1 className=" text-[22px] text-[#333333]">Shopping Bag</h1>
          </div>
        </section>
        <section className="w-[955px] h-[fit-content] m-auto mt-5">
          <div className="h-[55px] flex justify-between">
            <div className="w-[200px] p-[8px]">
              <h1 className="text-[16px] text-[#333333]">
                ITEMS IN SHOPPING BAG
              </h1>
            </div>
            <div
              className="w-[180px] h-[40px] ml-[340px] mt-1"
              style={{ borderRadius: "6px" }}
            >
              <Link to={"/paypal"}>
                <button
                  className="h-full w-full bg-yellow-400 hover:bg-[#e5e5e5]"
                  style={{ borderRadius: "6px", transition: ".2s ease-in" }}
                >
                  <img className="h-[20px] m-auto" src={paypal} alt="paypal" />
                </button>
              </Link>
            </div>
            <div
              className="w-[180px] h-[40px] mt-1"
              style={{ borderRadius: "6px" }}
            >
              <Link to={"/cod"}>
                <button
                  className="h-full w-full"
                  style={{
                    borderRadius: "6px",
                    transition: ".2s ease-in",
                    backgroundColor: "green",
                  }}
                >
                  <i className="bx bxs-lock " style={{ color: "#ffff" }}></i>{" "}
                  <span className="text-white font-semibold">CHECKOUT</span>
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-[955px] m-auto mt-2 h-[fit-content] p-1 bg-[whitesmoke]">
          <div className="w-fit m-auto">
            <h1 className="text-black text-center font-bold">
              YOUR SHIPPING AND PICKUP CHOICES
            </h1>
          </div>
        </section>
        <section
          className="w-[955px] m-auto h-[90px] flex items-center justify-center"
          style={{ borderBottom: "3px solid #e5e5e5" }}
        >
          <div className="w-[200px] h-[70px]">
            <div className="w-fit flex">
              <div className="h-fit mt-[25px]">
                <span className="text-center">
                  <img
                    src="https://cdn-fsly.yottaa.net/5d669b394f1bbf7cb77826ae/www.bathandbodyworks.com/v~4b.216/on/demandware.static/Sites-BathAndBodyWorks-Site/-/en_US/v1651830360721/images/svg-icons/bopis-shipping.svg?yocs=o_s_"
                    alt="shipping icon"
                  />
                </span>
              </div>
              <div className="ml-[5px] h-fit w-fit mt-[20px]">
                <span className="text-[13.5px] text-[#005699]">
                  <span className="font-bold">{cart.length}</span> Item added
                  for <span className="font-bold">Shipping</span>
                </span>
              </div>
            </div>
          </div>
          <div
            className="w-[220px] h-[70px]"
            style={{ borderLeft: "3px solid #e5e5e5" }}
          >
            <img className="h-full w-full" src={shippingpick} alt="" />
          </div>
        </section>
        <section className="w-[955px] m-auto mt-4 h-[fit-content] p-1 bg-[whitesmoke] flex justify-between">
          <div className="w-fit">
            <h1 className="text-black text-center font-semibold">ITEM</h1>
          </div>
          <div className="w-fit">
            <h1 className="text-black text-center font-semibold">PRICE</h1>
          </div>
          <div className="w-fit">
            <h1 className="text-black text-center font-semibold">QTY</h1>
          </div>
          <div className="w-fit">
            <h1 className="text-black text-center font-semibold">
              TOTAL PRICE
            </h1>
          </div>
        </section>
        {cart.map((items) => {
          return (
            <section
              key={items.id}
              className="w-[955px] m-auto h-[fit-content] flex p-5"
              style={{ borderBottom: "1.5px solid black" }}
            >
              <div className="h-[180px] w-[140px]">
                <img
                  className="h-[180px] w-[140px] p-2"
                  src={items.pImg}
                  alt=""
                />
              </div>
              <div className="w-[150px] h-[fit-content]">
                <div className="h-[fit-content] p-2">
                  <h1 className="text-[#333333] text-[16px]">{items.name}</h1>
                </div>
                <div className="h-[fit-content] p-1">
                  <h1 className="text-[#666666] text-[10px]">
                    {items.category1}
                  </h1>
                </div>
              </div>
              <div className="w-[86px] h-[fit-content] p-2">
                <h1 className="text-center">$ {items.Amount}</h1>
              </div>
              <div className="h-[65px] w-[130px] ml-[140px] flex">
                <div className=" w-[40px] h-fit m-auto bg-[whitesmoke]">
                  <button
                    className=" h-fit w-full text-[30px]"
                    onClick={() => handleDecrement(items)}
                  >
                    -
                  </button>
                </div>
                <div className=" w-[40px] h-fit text-center m-auto">
                  {items.quantity}
                </div>
                <div className=" w-[40px] h-fit m-auto bg-[whitesmoke]">
                  <button
                    className=" h-fit w-full text-[30px]"
                    onClick={() => handleIncrement(items)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-[70px]  h-[fit-content] ml-[220px]">
                <h1 className="text-center">$ {items.Amount}</h1>
              </div>
              <div className="mt-1 w-[15px] ml-[5px] h-[15px]">
                <img
                  onClick={() => removeItem(items.id)}
                  className="cursor-pointer"
                  src={close}
                  alt=""
                />
              </div>
            </section>
          );
        })}
        <section
          className="w-[955px] m-auto mt-20 h-[fit-content] flex justify-end p-4"
          style={{ borderTop: "1px solid #e5e5e5" }}
        >
          <div className="w-[500px] h-[fit-content] bg-[whitesmoke]">
            <div className="h-[fit-content] flex justify-between p-2">
              <div className="w-[fit-content] p-2">
                <h1 className="text-[#333333] text-[13px]">
                  MERCHANDISE SUBTOTAL
                </h1>
              </div>
              <div className="w-[fit-content] p-2">
                <h1 className="text-[#333333] text-[13px]">${totalp}</h1>
              </div>
            </div>
            <div className="h-[fit-content] flex justify-between mt-[8px]  p-2">
              <div className="w-[fit-content] p-2">
                <h1 className="text-[#333333] text-[13px]">
                  ESTIMATED SHIPPING & HANDLING - Standard
                </h1>
              </div>
              <div className="w-[fit-content] p-2">
                <h1 className="text-[#333333] text-[13px]">$0.00</h1>
              </div>
            </div>
            <div className="h-[fit-content] flex justify-between mt-[8px]  p-2">
              <div className="w-[fit-content] p-2">
                <h1 className="text-[#333333] text-[13px]">SALES TAX</h1>
              </div>
              <div className="w-[fit-content] p-2">
                <h1 className="text-[#333333] text-[13px]">$0.00</h1>
              </div>
            </div>
            <div className="h-[5px] w-[450px] m-auto mt-[25px] bg-gray-200"></div>
            <section className="h-[fit-content] w-[450px] m-auto mt-2 flex justify-between p-2">
              <div className="w-fit h-fit">
                <h1 className="font-bold text-[16px] text-[#333333]">
                  ORDER TOTAL (USD)
                </h1>
              </div>
              <div className="w-fit h-fit">
                <h1
                  id="totalAmount"
                  className="font-bold text-[16px] text-[#333333]"
                >
                  ${totalp}
                </h1>
              </div>
            </section>
            <section className="h-[50px] w-[450px] m-auto flex justify-around">
              <div className="w-[220px]" style={{ borderRadius: "6px" }}>
                <Link to={"/paypal"}>
                  <button
                    className="h-full w-full bg-yellow-400 hover:bg-[#e5e5e5]"
                    style={{ borderRadius: "6px", transition: ".2s ease-in" }}
                  >
                    <img
                      className="h-[20px] m-auto"
                      src={paypal}
                      alt="paypal"
                    />
                  </button>
                </Link>
              </div>
              <div className="w-[220px]" style={{ borderRadius: "6px" }}>
                <Link to={"/cod"}>
                  <button
                    className="h-full w-full"
                    style={{
                      borderRadius: "6px",
                      transition: ".2s ease-in",
                      backgroundColor: "green",
                    }}
                  >
                    <i className="bx bxs-lock " style={{ color: "#ffff" }}></i>{" "}
                    <span className="text-white font-semibold">CHECKOUT</span>
                  </button>
                </Link>
              </div>
            </section>
            <section className="w-[450px] m-auto h-[fit-content] p-3">
              <div className="w-fit h-fit">
                <h1 className="text-[13px] text-[#666666] leading-6">
                  International Shoppers
                </h1>
              </div>
              <div className="w-fit h-fit">
                <h1 className="text-[13px] text-[#666666] leading-6">
                  All prices are displayed and processed in US dollars (USD).
                </h1>
              </div>
            </section>
          </div>
        </section>
        <Footer2 />
      </>
    );
  }
};

export default Cart;
