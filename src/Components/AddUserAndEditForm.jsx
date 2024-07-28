import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddUserAndEditForm({ userData, setUserData }) {
  const { id } = useParams();
  const navigate = useNavigate();

  let initialUserFormState = {
    id: id,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "https://",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  };
  let index;
  let editing = false;
  let { state } = useLocation();
  if (state && state.currentUserData) {
    editing = true;
    initialUserFormState = state.currentUserData;
    index = state.index;
  }
  const [userFormData, setUserFormData] = useState(initialUserFormState);
  const [name, setName] = useState(userFormData.name);
  const [username, setUsername] = useState(userFormData.username);
  const [email, setEmail] = useState(userFormData.email);
  const [phone, setPhone] = useState(userFormData.phone);
  const [street, setStreet] = useState(userFormData.address.street);
  const [city, setCity] = useState(userFormData.address.city);
  const [zipcode, setZipcode] = useState(userFormData.address.zipcode);
  const [companyName, setCompanyName] = useState(userFormData.company.name);
  const [catchPhrase, setCatchPhrase] = useState(
    userFormData.company.catchPhrase
  );
  const [website, setWebsite] = useState(userFormData.website);
  const [isDisable, setIsDisable] = useState(false);
  const [alert, setAlert] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setIsDisable(true);
    let data = {
      name,
      username,
      email,
      address: {
        street,
        suite: "",
        city,
        zipcode,
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone,
      website,
      company: {
        name: companyName,
        catchPhrase,
        bs: "",
      },
    };
    if (
      !name ||
      !username ||
      !email ||
      !phone ||
      !street ||
      !city ||
      !zipcode ||
      !companyName ||
      !catchPhrase
    ) {
      setAlert(true);
      setIsDisable(false);
    } else {
      setAlert(false);
      if (editing) {
        data.id = id;
        fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            userData[index] = data;
            setUserData([...userData]);
            navigate("/");
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        fetch(`${import.meta.env.VITE_API_URL}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setUserData([...userData, data]);
            navigate("/");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }

  return (
    <div className="w-screen md:h-screen bg-gray-100 grid place-content-center p-4">
      <h1 className="my-6 text-2xl">{editing ? "Edit User" : "Add User"}</h1>
      <form
        className="w-full max-w-2xl border-2 border-gray-400 p-4 bg-gray-100 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="username"
            >
              User name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="username"
              type="text"
              placeholder="janedoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              placeholder="janedoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="phone"
              type="text"
              placeholder="(+1) 123-123-1234"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="street"
            >
              Street
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="street"
              type="text"
              placeholder="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="city"
              type="text"
              placeholder="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="zip-code"
            >
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="zip-code"
              type="text"
              placeholder="690210"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="company-name"
            >
              Company Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="company-name"
              type="text"
              placeholder="company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="catch-phrase"
            >
              catch Phrase
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="catch-phrase"
              type="text"
              placeholder="catch phrase"
              value={catchPhrase}
              onChange={(e) => setCatchPhrase(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="website"
            >
              Website
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="website"
              type="url"
              placeholder="https://example.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="uppercase px-4 py-2 w-full bg-sky-700 text-white font-bold mt-4 disabled:bg-sky-300"
          disabled={isDisable}
        >
          Submit
        </button>
        {alert && (
          <div className="flex justify-center mx-auto text-red-600 text-lg font-bold mt-2">
            Please fill out all the fields
          </div>
        )}
      </form>
    </div>
  );
}

export default AddUserAndEditForm;