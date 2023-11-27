import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
  Paper,
  Popover,
  Link,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const PhonePopup = ({ phone, onClose }) => {
  return (
    <Popover
      open={true}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={{
        top: "50%",
        left: "50%",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          p: 2,
          // backgroundColor: "blue",
          border: 3,
          borderColor: "black",
        }}
        color="inherit"
      >
        <Typography sx={{ fontWeight: 700, color: "darkGray" }}>
          Call Us -{" "}
          <Link
            sx={{ fontWeight: "bold", color: "darkGray" }}
            href={`tel:${phone}`}
            underline="always"
          >
            {phone}
          </Link>
        </Typography>
      </Paper>
    </Popover>
  );
};

const CardComponent = ({
  _id,
  title,
  subTitle,
  phone,
  address,
  img,
  alt,
  like,
  cardNumber,
  onDeleteCard,
  onEditCard,
  onToggleFavorite,
  CardDetailsPage,
}) => {
  const location = useLocation();
  const currentPage = location.pathname;
  const [isLiked, setIsLiked] = useState(like);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPhonePopupOpen, setIsPhonePopupOpen] = useState(false);
  const navigate = useNavigate();
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const userData = useSelector((state) => state.authSlice.userData) || {};
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);

  const handlePhoneClick = () => {
    setIsPhonePopupOpen(true);
  };

  const handleClosePhonePopup = () => {
    setIsPhonePopupOpen(false);
  };

  const handleDeleteCardClick = async () => {
    try {
      setSuccessMessage("Card deleted successfully!");
      setErrorMessage("");
      await onDeleteCard(_id);
    } catch (error) {
      setErrorMessage("Error deleting card. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleClickEditCard = () => {
    onEditCard(_id);
  };

  const handleLikeCard = async () => {
    setIsLiked(!isLiked);

    try {
      const response = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${_id}`,
        { bizNumber: cardNumber },
        {
          headers: {
            "x-auth-token": "YOUR_AUTH_TOKEN",
          },
        }
      );
      console.log("Response after updating like status:", response);
      setSuccessMessage("Like status updated successfully!");
      setErrorMessage("");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      localStorage.setItem(`like_${_id}`, (!isLiked).toString());
    } catch (error) {
      setErrorMessage("Error updating like status. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleCardClick = () => {
    navigate(`/card-details/${_id}`);
  };


  return (
    <Card>
      <CardActionArea>
        <CardMedia
          onClick={handleCardClick}
          sx={{ height: 200 }}
          component="img"
          image={img}
          alt={alt}
        />
      </CardActionArea>
      <CardContent>
        <CardHeader title={title} subheader={subTitle} sx={{ p: 0, mb: 1 }} />
        <Divider />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Phone:{" "}
            </Typography>
            {phone}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Address:{" "}
            </Typography>
            {address}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Card Number:{" "}
            </Typography>
            {cardNumber}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <IconButton onClick={handlePhoneClick}>
              <PhoneIcon />
            </IconButton>
            {loggedIn &&
            (userData.isAdmin || userData.isBusiness) &&
            currentPage === "/MyCardsPage" ? (
              <IconButton onClick={handleClickEditCard}>
                <CreateIcon />
              </IconButton>
            ) : null}
          </Box>
          <Box>
            {isAdmin ? (
              <IconButton onClick={handleDeleteCardClick}>
                <DeleteIcon />
              </IconButton>
            ) : userData.isBusiness && currentPage === "/MyCardsPage" ? (
              <IconButton onClick={handleDeleteCardClick}>
                <DeleteIcon />
              </IconButton>
            ) : null}

            {loggedIn && (
              <IconButton onClick={handleLikeCard}>
                <FavoriteIcon color={isLiked ? "error" : "action"} />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
      {successMessage && (
        <Typography style={{ color: "green" }}>{successMessage}</Typography>
      )}
      {errorMessage && (
        <Typography style={{ color: "red" }}>{errorMessage}</Typography>
      )}

      {isPhonePopupOpen && (
        <PhonePopup phone={phone} onClose={handleClosePhonePopup} />
      )}
    </Card>
  );
};

CardComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
  like: PropTypes.bool,
  cardNumber: PropTypes.number,
  onDeleteCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func,
};

CardComponent.defaultProps = {
  img: "https://www.livemint.com/lm-img/img/2023/08/14/1600x900/garena_free_fire_max_1688877791610_1691982307589.jpg",
  alt: "running",
};

export default CardComponent;
