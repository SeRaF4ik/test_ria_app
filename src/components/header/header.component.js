import React from "react";

import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

import "./header.style.scss";

const Header = ({ getHelpInfo }) => (
  <AppBar position="static" className="header">
    <Toolbar>
      <Typography variant="h6">Ria App</Typography>
      <Button
        variant="outlined"
        color="inherit"
        endIcon={<HelpIcon />}
        onClick={getHelpInfo}
      >
        Помощь
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;
