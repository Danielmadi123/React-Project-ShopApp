import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CardForm from "./CardForm";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const CreateCardPage = () => {
  const navigate = useNavigate();

  const [inputsValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    phone: "",
    description: "",
    web: "",
    email: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    phone: "",
    description: "",
    web: "",
    email: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const fields = [
    { id: "title", label: "Title", required: true },
    { id: "subtitle", label: "SubTitle", required: true },
    { id: "phone", label: "Phone", required: true },
    { id: "description", label: "Description", required: true },
    { id: "web", label: "Web", required: false },
    { id: "email", label: "Email", required: true },
    { id: "url", label: "Url", required: false },
    { id: "alt", label: "Alt", required: false },
    { id: "state", label: "State", required: false },
    { id: "country", label: "Country", required: true },
    { id: "city", label: "City", required: true },
    { id: "street", label: "Street", required: true },
    { id: "houseNumber", label: "House Number", required: true },
    { id: "zip", label: "Zip", required: false },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValue((currentState) => ({
      ...currentState,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]:
        value.trim() === ""
          ? `${id.charAt(0).toUpperCase() + id.slice(1)} is required`
          : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== "")) {
      toast.error("Please fill in all required fields correctly.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/cards", {
        title: inputsValue.title,
        subtitle: inputsValue.subtitle,
        description: inputsValue.description,
        phone: inputsValue.phone,
        email: inputsValue.email,
        web: inputsValue.web,
        image: {
          url: inputsValue.url,
          alt: inputsValue.alt,
        },
        address: {
          state: inputsValue.state,
          country: inputsValue.country,
          city: inputsValue.city,
          street: inputsValue.street,
          houseNumber: inputsValue.houseNumber,
          zip: +inputsValue.zip,
        },
      });

      toast.success("You've created a business card!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(ROUTES.MYCARDS);
    } catch (err) {
      if (err.response && err.response.data) {
        const serverErrors = err.response.data;
        Object.keys(serverErrors).forEach((field) => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: serverErrors[field],
          }));
        });
      } else {
        toast.error("Error creating card. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardForm
      fields={fields}
      inputsValue={inputsValue}
      errors={errors}
      loading={loading}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateCardPage;
