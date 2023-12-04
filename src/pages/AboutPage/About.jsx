import React from "react";
import {
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";

const AboutContainer = styled(Container)({
  marginTop: "2rem",
});

const AboutPaper = styled(Paper)(({ theme }) => ({
  padding: "2rem",
  textAlign: "left",
  "& > *": {
    marginBottom: "1.5rem",
  },
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const AboutPage = () => {
  const theme = useTheme();

  return (
    <AboutContainer>
      <AboutPaper elevation={3} theme={theme}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Me
        </Typography>

        <Typography variant="body1" paragraph>
          Hi there! I'm Maidan Gonen, a passionate web developer with a strong
          background in building websites. My goal is to create visually
          appealing and functional websites that leave a lasting impression.
        </Typography>

        <Typography variant="body1" paragraph>
          With a keen eye for design and a commitment to delivering high-quality
          products, I strive to ensure an excellent user experience for every
          visitor.
        </Typography>

        <Typography variant="body1" paragraph>
          At heart, I am dedicated to continuous learning and improvement to
          stay updated with the latest technologies and design trends in the
          ever-evolving web development landscape.
        </Typography>

        <Typography variant="h4" gutterBottom>
          Skills and Abilities
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Web Development"
              secondary="Proficient in building responsive and dynamic websites using modern web technologies."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Design"
              secondary="Adept at creating visually appealing and user-friendly interfaces."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Problem Solving"
              secondary="Strong problem-solving skills with a focus on delivering solutions that meet client needs."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="HTML"
              secondary="Proficient in creating structured and semantic markup."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="CSS/Sass"
              secondary="Skilled in styling and layout techniques, including preprocessor Sass."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="JavaScript"
              secondary="Strong foundation in JavaScript for interactive and dynamic web pages."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="React"
              secondary="Experience in building modern and responsive web applications with React."
            />
          </ListItem>
        </List>

        <Typography variant="h4" gutterBottom>
          Contact Me
        </Typography>

        <Typography variant="body1" paragraph>
          Interested in working together or want to discuss a project? Feel free
          to reach out! You can contact me at [Your Email Address].
        </Typography>
      </AboutPaper>
    </AboutContainer>
  );
};

export default AboutPage;
