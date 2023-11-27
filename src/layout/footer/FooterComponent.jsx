import React, { useState, useEffect } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PortraitIcon from "@mui/icons-material/Portrait";
import { Link, useLocation } from "react-router-dom";
import ROUTES from "../../routes/ROUTES.js";
import { useSelector } from "react-redux";

const FooterComponent = ({ selectedIndex }) => {
  const [value, setValue] = useState(selectedIndex);
  const location = useLocation();
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);

  const isBusiness = useSelector((bigPie) => bigPie.authSlice.isBusiness);
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);

  const footerLinks = [
    { to: ROUTES.ABOUT, label: "About", icon: <InfoIcon /> },
    { to: ROUTES.FAVCARD, label: "Favorite", icon: <FavoriteIcon /> },
    { to: ROUTES.MYCARDS, label: "My Cards", icon: <PortraitIcon /> },
  ];

  useEffect(() => {
    const foundIndex = footerLinks.findIndex(
      (link) => link.to === location.pathname
    );
    if (foundIndex !== -1) {
      setValue(foundIndex);
    } else {
      setValue(-1);
    }
  }, [location.pathname, footerLinks]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 999,
        paddingTop: 10,
      }}
    >
      <Divider />
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {footerLinks.map((link, index) =>
          (link.to === ROUTES.ABOUT && !loggedIn) ||
          (link.to === ROUTES.FAVCARD && loggedIn) ||
          (link.to === ROUTES.MYCARDS && (isBusiness || isAdmin)) ||
          (link.to === ROUTES.ABOUT && loggedIn) ? (
            <BottomNavigationAction
              key={link.to}
              label={link.label}
              icon={link.icon}
              component={Link}
              to={link.to}
              style={{ color: value === index ? "#3498db" : "#848484" }}
            />
          ) : null
        )}
      </BottomNavigation>
    </div>
  );
};

export default FooterComponent;
