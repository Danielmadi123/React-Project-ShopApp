import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const EditStatusPage = () => {
  const { userId } = useParams();
  const authenticatedUser = useSelector((state) => state.authSlice.user);
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState({
    country: "",
    city: "",
    street: "",
    houseNumber: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`users/${userId}`);
        setUser(data);
        setNewName(data.name.first);
        setNewPhone(data.phone);
        setNewAddress({
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          houseNumber: data.address.houseNumber,
        });
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleUpdateUser = async () => {
    try {
      await axios.put(`users/${userId}`, {
        name: { first: newName, middle: user.name.middle, last: user.name.last },
        phone: newPhone,
        address: { ...newAddress },
        image: { url: user.image.url, alt: user.image.alt },
      });
      console.log(`User ID ${userId} details updated`);
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  // Check if the authenticated user matches the user being edited
  const isCurrentUser = authenticatedUser && authenticatedUser._id === user._id;

  return (
    <div>
      <h1>Edit User Details</h1>
      <p>User ID: {user._id}</p>
      <input type="text" value={newName} onChange={handleNameChange} disabled={!isCurrentUser} />
      <input type="text" value={newPhone} onChange={handlePhoneChange} disabled={!isCurrentUser} />
      <input
        type="text"
        name="country"
        value={newAddress.country}
        onChange={handleAddressChange}
        disabled={!isCurrentUser}
      />
      <input
        type="text"
        name="city"
        value={newAddress.city}
        onChange={handleAddressChange}
        disabled={!isCurrentUser}
      />
      <input
        type="text"
        name="street"
        value={newAddress.street}
        onChange={handleAddressChange}
        disabled={!isCurrentUser}
      />
      <input
        type="text"
        name="houseNumber"
        value={newAddress.houseNumber}
        onChange={handleAddressChange}
        disabled={!isCurrentUser}
      />
      {isCurrentUser && <button onClick={handleUpdateUser}>Update User</button>}
    </div>
  );
};

export default EditStatusPage;