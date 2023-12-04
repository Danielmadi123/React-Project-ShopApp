import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Pagination,
  Typography,
  Divider,
} from "@mui/material";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import homePageNormalization from "./homePageNormalization";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";

let initialDataFromServer = [];
const itemsPerPage = 20;

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [myCards, setMyCards] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        console.log("data", data);
        initialDataFromServer = data;
        setDataFromServer(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [userData]);

  useEffect(() => {
    if (!initialDataFromServer.length) return;
    const filter = query.filter ? query.filter : "";
    console.log("filter", filter);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDataFromServer(
      initialDataFromServer
        .filter((card) => card.title.startsWith(filter))
        .slice(startIndex, endIndex)
    );
  }, [query, initialDataFromServer, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDeleteCard = async (_id) => {
    try {
      const config = {
        headers: {
          "x-auth-token": process.env.REACT_APP_API_TOKEN,
        },
      };

      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${_id}`,
        config
      );

      setMyCards((prevCards) => prevCards.filter((card) => card._id !== _id));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting card:", error);
      setError("Error deleting card. Please try again.");
    }
  };

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };

  const handleLikeCardClick = (_id, isLiked) => {
    setDataFromServer((dataFromServerCopy) =>
      dataFromServerCopy.map((card) => {
        if (card._id === _id) {
          card.like = isLiked;
          if (isLiked) {
            const likedCards =
              JSON.parse(localStorage.getItem("likedCards")) || [];
            likedCards.push(card);
            localStorage.setItem("likedCards", JSON.stringify(likedCards));
          }
        }
        return card;
      })
    );
  };

  return (
    <Container>
      <Typography
        sx={{ fontFamily: "serif", textAlign: "center", p: 5 }}
        variant="h1"
      >
        COLLECTIONS
        <Divider sx={{ mt: 4, width: 750, mx: "auto" }} />
      </Typography>
      <Grid container spacing={2}>
        {dataFromServer.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
            <CardComponent
              _id={card._id}
              title={card.title}
              subTitle={card.subtitle}
              phone={card.phone}
              address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
              img={card.image.url}
              alt={card.image.alt}
              like={card.likes}
              cardNumber={card.cardNumber}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
              handleLikeCardClick={handleLikeCardClick}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(initialDataFromServer.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />
    </Container>
  );
};

export default HomePage;
