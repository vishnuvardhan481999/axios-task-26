import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddUserAndEditForm from "./Components/AddUserAndEditForm";
import RenderUsers from "./Components/RenderUsers";

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);
  return (
    <Routes>
      <Route
        path="*"
        element={
          <h1 className="text-blue-600 w-full mx-auto text-2xl mt-4 text-center">
            404 Page Not Found
          </h1>
        }
      />
      <Route
        exact
        path="/"
        element={<RenderUsers userData={userData} setUserData={setUserData} />}
      />
      <Route
        path="/edit/user/:id"
        element={
          <AddUserAndEditForm userData={userData} setUserData={setUserData} />
        }
      />
      <Route
        path="/add/user"
        element={
          <AddUserAndEditForm userData={userData} setUserData={setUserData} />
        }
      />
    </Routes>
  );
}

export default App;
