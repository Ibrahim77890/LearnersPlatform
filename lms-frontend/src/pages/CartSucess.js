import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const CartSucess = () => {
  const navigate = useNavigate();
  const [keys, setKeys] = useState([
    "asjjkasdhkdahsjkhdsk",
    "ksadjkldsajladsjsda",
  ]);

  return (
    <div className="min-h-screen w-screen bg-gray-300 gap-8 flex p-2 items-center flex-col">
      <div className="w-full">
        <p
          onClick={() => {
            navigate("/home");
          }}
          className="border-2 border-black w-fit h-fit rounded-full cursor-pointer p-4 ml-3"
        >
          Go to home screen
        </p>
      </div>
      <div className="flex w-full h-full gap-4 flex-col items-center justify-center">
        <p className="text-5xl nunito-sans-medium">Payment Successful</p>
        <div className="h-fit w-full px-8 flex flex-col gap-4">
          <p className="dm-sans-medium text-xl">
            Following is your enrollment keys list: [The quantity and order of
            keys will mathc according to provided cart]
          </p>
          {keys.map((item, index) => {
            return <p className="w-full flex justify-center tiny5-regular text-2xl">#  {item}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default CartSucess;
