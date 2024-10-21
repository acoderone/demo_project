import React from "react";
import { useState } from "react";
import { ArrowLeftRight, ChevronDown, Wallet, X } from "lucide-react";
import Profile from "../assets/pfp.png";

function navbar() {
  const [futures, setFutures] = useState(true);
  const [spot, setSpot] = useState(false);
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);
  const [isHoveredWallet, setIsHoveredWallet] = useState(false);
  const [isModalOpenTransfer, setIsModalOpenTransfer] = useState(true);
  const [isModalOpenDeposite, setIsModalOpenDeposite] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="text-white h1 flex items-center justify-between px-10">
      <div className="flex cursor-pointer">
        <div
          className={
            futures
              ? "bg-gray-400 px-4 py-3 rounded-md "
              : "bg-zinc-800 px-4 py-3"
          }
          onClick={() => {
            setFutures(true);
            setSpot(false);
          }}
        >
          Futures Trading
        </div>
        <div
          className={
            spot ? "bg-gray-400 px-4 py-3 rounded-md" : "bg-zinc-800 px-4 py-3"
          }
          onClick={() => {
            setFutures(false);
            setSpot(true);
          }}
        >
          Spot Trading
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button
          onClick={() => {
            setIsModalOpenTransfer(true);
          }}
          className="p-3 flex gap-2 bg-gradient-to-l from-violet-600 to-indigo-400 rounded-md "
        >
          <ArrowLeftRight /> Transfer
        </button>
        <button
          onClick={() => {
            setIsModalOpenDeposite(true);
          }}
          className="p-3 flex gap-2 bg-blue-300 rounded-md bg-gradient-to-l from-violet-600 to-indigo-400"
        >
          <Wallet />
          Deposite
        </button>
        <a
          onMouseEnter={() => setIsHoveredWallet(true)}
          onMouseLeave={() => setIsHoveredWallet(false)}
          className={`hover:text-blue-500 cursor-pointer ${
            isHoveredWallet && "bg-red-300"
          }`}
        >
          Wallets
        </a>
        <button
          onMouseEnter={() => setIsHoveredLogin(true)}
          onMouseLeave={() => setIsHoveredLogin(false)}
          className={`bg-gradient-to-b from-indigo-950 to-indigo-900 p-3 rounded-full flex gap-1 items-center ${
            isHoveredLogin && "text-red-700"
          }`}
        >
          <img className="h-7 rounded-full" src={Profile} alt="img" />
          Login <ChevronDown size={18} />
        </button>
      </div>

      {isModalOpenTransfer && (
        <div className="fixed inset-0 bg-black bg-opacity-35 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white text-black py-5 px-8 rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between w-80">
              <div className="font-semibold text-3xl">USDT Transfer</div>
              <X
                onClick={() => {
                  setIsModalOpenTransfer(false);
                }}
                className="text-gray-600 cursor-pointer"
                size={20}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xl">Mode :</div>
              <div className="w-2/3">
                <select
                  className="bg-black w-2/3 text-white rounded-md py-1 px-2 "
                  onChange={(event) => {
                    setSelectedOption(event.target.value);
                  }}
                >
                  <option value="">select</option>
                  <option value="">Futures -{`>`} Spot</option>
                  <option value=""> Spot -{`>`} Futures</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xl">Mode :</div>
              <div className="">
                <input type="number" className="border-2 w-20 px-1 border-gray-400 rounded-sm " />
              </div>
              <div className="text-xl text-purple-400">(USDT)</div>
            </div>

            <div>
              <button className="bg-sky-600 px-5 py-2 rounded-md text-white">
                Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpenDeposite && (
        <div className="fixed inset-0 bg-black bg-opacity-35 backdrop-blur-sm flex justify-center items-center">
          <div
            onClick={() => {
              setIsModalOpenDeposite(false);
            }}
            className="h-10 w-10 bg-blue-600"
          >
            NO
          </div>
        </div>
      )}
    </div>
  );
}

export default navbar;
