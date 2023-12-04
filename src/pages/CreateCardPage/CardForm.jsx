import React from "react";
import {
  Container,
  Grid,
  Typography,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const CardForm = ({
  inputsValue,
  errors,
  loading,
  handleInputChange,
  handleSubmit,
}) => {
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

  return (
    <Container sx={{ padding: "50px" }}>
      <Typography variant="h2" sx={{ mb: 1, padding: "10px", pb: "0px" }}>
        Create - Cards
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
        Put new values in the correct input
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <form onSubmit={handleSubmit}>
        <Grid container flexDirection="column">
          {fields.map((field) => (
            <TextField
              key={field.id}
              id={field.id}
              label={field.label}
              variant="outlined"
              sx={{ mt: "10px" }}
              onChange={handleInputChange}
              value={inputsValue[field.id]}
              required={field.required}
              error={Boolean(errors[field.id])}
            />
          ))}
          <Grid container spacing={2}>
            <Grid item lg={8} md={8} sm={8} xs>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  mt: 2,
                  width: "100%",
                  ml: "0%",
                  bgcolor: "darkblue",
                  color: "white",
                }}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Card"}
              </Button>
            </Grid>
            <Grid item xs>
              <Link to={ROUTES.HOME}>
                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                    width: "100%",
                    ml: "0%",
                    bgcolor: "navy",
                    color: "gray",
                  }}
                >
                  Discard
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CardForm;
