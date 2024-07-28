import React from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

function RenderUsers({ userData, setUserData }) {
  const navigate = useNavigate();

  return (
    <div className="w-screen bg-gray-300 pt-8 px-6 sm:px-4 pb-8">
      <h1 className="text-2xl text-black text-center mb-8 uppercase font-bold">
        user management
      </h1>
      <div className="w-full flex justify-center">
        <button
          className="uppercase bg-sky-800 px-4 py-1 rounded-lg text-gray-50 font-bold text-lg mb-8"
          onClick={() => navigate("/add/user")}
        >
          <span className="text-2xl">&#x2b;</span> Add User
        </button>
      </div>
      {userData.length == 0 && (
        <div className="text-blue-600 w-full mx-auto text-2xl mt-4 text-center">
          Please create a new user or check your Internet!
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
        {userData.map((val, inx) => {
          return (
            <UserCard
              key={inx}
              val={val}
              index={inx}
              setUserData={setUserData}
              userData={userData}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RenderUsers;