// MyCardsPage.jsx
import React, { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Grid, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const MyCardsPage = () => {
  const [myCards, setMyCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const userData = useSelector((state) => state.authSlice.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        setLoading(true);

        if (!userData) {
          console.error("User data is undefined");
          setLoading(false);
          return;
        }

        const userId = userData._id;
        const config = {
          headers: {
            "x-auth-token": process.env.REACT_APP_API_TOKEN, // Use environment variable
          },
        };

        const response = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards`,
          config
        );

        const userCards = response.data.filter(
          (card) => card.user_id === userId
        );
        setMyCards(userCards);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user's cards:", error);
        setError("Error fetching user's cards. Please try again.");
        setLoading(false);
      }
    };

    fetchMyCards();
  }, [userData, location.pathname]);

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
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
    } catch (error) {
      console.error("Error deleting card:", error);
      setError("Error deleting card. Please try again.");
    }
  };

  const handleLikeChange = (_id, newLikeStatus) => {
    // Update the like status in the myCards state
    setMyCards((prevCards) =>
      prevCards.map((card) =>
        card._id === _id ? { ...card, like: newLikeStatus } : card
      )
    );
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button
        variant="outlined"
        sx={{ mt: 3, bgcolor: "green", color: "white" }}
        onClick={() => {
          if (userData && (userData.isBusiness || userData.isAdmin)) {
            navigate(ROUTES.CREATECARD);
          } else {
            // Optionally, you can show a message or handle it differently
            console.log("Only business users or admins can create cards.");
          }
        }}
      >
        Create Card
      </Button>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {myCards.length === 0 ? (
          <Grid item>
            <div>No cards found.</div>
          </Grid>
        ) : (
          myCards.map(
            ({ _id, title, subtitle, phone, address, image, like }) => (
              <Grid item key={_id} xs={12} sm={6} md={4} lg={3}>
                <CardComponent
                  _id={_id}
                  title={title}
                  subTitle={subtitle}
                  phone={phone}
                  address={`${address.city}, ${address.street} ${address.houseNumber}`}
                  img={image && image.url}
                  alt={image && image.alt}
                  like={like} // Pass the liked status to the CardComponent
                  onDeleteCard={handleDeleteCard}
                  onEditCard={handleEditCard}
                  onLikeChange={handleLikeChange} // Pass the function to update like status
                />
              </Grid>
            )
          )
        )}
      </Grid>
    </Container>
  );
};

export default MyCardsPage;
