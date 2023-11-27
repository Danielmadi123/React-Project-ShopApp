import React from "react";
import {
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import { Divider } from "@mui/material";
const AboutContainer = styled(Container)({
  marginTop: "2rem",
});

const AboutPaper = styled(Paper)({
  padding: "2rem",
  textAlign: "left",
  "& > *": {
    marginBottom: "1.5rem",
  },
});

const AboutPage = () => {
  return (
    <AboutContainer>
      <Typography
        sx={{ fontFamily: "serif", textAlign: "center", p: 5 }}
        variant="h1"
      >
        ABOUT
        <Divider sx={{ mt: 4, width: 750, mx: "auto" }} />
      </Typography>
      <AboutPaper elevation={3}>
        <Typography sx={{ p: 4 }} variant="h3" component="h1">
          About Our Shop
        </Typography>

        <Typography sx={{}} variant="body1">
          Welcome to our shop! We are dedicated to providing the best products
          and services to our customers.
        </Typography>

        <Typography sx={{}} variant="body1">
          Our goal is to offer a wide range of high-quality products, ensuring
          an excellent shopping experience.
        </Typography>

        <Typography sx={{}} variant="body1">
          At our shop, you'll find everything from apparel to electronics and
          much more.
        </Typography>

        <Typography sx={{ pb: 6 }} variant="body1">
          For any inquiries or support, feel free to contact our customer
          service team.
        </Typography>

        <Typography sx={{}} variant="h4">
          Our Values
        </Typography>

        <List>
          <ListItem>
            <ListItemText
              primary="Quality Products"
              secondary="We prioritize offering only high-quality products to our customers."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Customer Satisfaction"
              secondary="We aim to ensure a seamless and satisfying shopping experience."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Diverse Selection"
              secondary="Our shop boasts a diverse selection of items to cater to various needs."
            />
          </ListItem>
        </List>

        <Typography sx={{ p: 1, paddingTop: 4 }} variant="h4">
          Our Team
        </Typography>

        <Typography variant="body1">
          Meet our dedicated team of professionals working to provide the best
          service and products to you.
        </Typography>
      </AboutPaper>
    </AboutContainer>
  );
};

export default AboutPage;
