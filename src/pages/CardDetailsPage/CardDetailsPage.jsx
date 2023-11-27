import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
} from "@mui/material";
import axios from "axios";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`
        );
  
        console.log("Card Details Response:", response);
  
        if (response.data) {
          console.log("Card Details Data:", response.data);
  
          const { image, alt, title, subTitle, phone, address, cardNumber } = response.data;
  
          console.log("Image URL:", image.url);  
          console.log("Alt Text:", alt);
  
          setCardDetails({
            img: image.url,  
            alt,
            title,
            subTitle,
            phone,
            address,
            cardNumber,
          });
        } else {
          console.error("Invalid response structure. Please check the API.");
          setError("Invalid response structure. Please check the API.");
        }
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching card details:", error);
        setError("Error fetching card details. Please try again.");
        setLoading(false);
      }
    };
  
    fetchCardDetails();
  }, [cardId]);
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography style={{ color: "red" }}>{error}</Typography>;
  }

  return (
<Card style={{ marginBottom: 100 }}>
{cardDetails.img && (
  <CardMedia component="img" image={cardDetails.img} alt={cardDetails.alt || "No Alt Text"} />
)}
      <CardContent>
        <CardHeader
          title={cardDetails.title}
          subheader={cardDetails.subTitle}
          sx={{ p: 0, mb: 1 }}
        />
        <Divider />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Phone:{" "}
            </Typography>
            {cardDetails.phone}
          </Typography>
          <Box>
            <Typography variant="body2">
              <Typography fontWeight="700" variant="subtitle1" component="span">
                Address:{" "}
              </Typography>
              {cardDetails.address && (
                <Box>
                  <Typography>{cardDetails.address.city}</Typography>
                  <Typography>{cardDetails.address.street}</Typography>
                </Box>
              )}
            </Typography>
          </Box>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Card Number:{" "}
            </Typography>
            {cardDetails.cardNumber}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardDetailsPage;