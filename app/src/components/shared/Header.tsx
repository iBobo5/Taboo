import { type JSX } from "react";
import { Link } from "react-router";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { WhiteLogoIcon } from "../../images";
import { PATH_HOME } from "../../path";
import { useIsMobileMode } from "../../container/TabooContext";

export const Header = (): JSX.Element => {
  const mobileMode: boolean = useIsMobileMode();

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Link to={PATH_HOME} style={{ marginRight: mobileMode ? "5px" : "25px" }} onClick={() => window.sessionStorage.clear()}>
          <WhiteLogoIcon sx={{ height: mobileMode ? "35px" : "50px" }} />
        </Link>
        <Typography variant="h1" sx={{ display: "flex", ...(mobileMode && { fontSize: "1rem" }) }}>
          <Stack sx={{ color: "#fd3544", mr: mobileMode ? "4px" : "8px" }}>Taboo: Il gioco delle parole</Stack>
          <Stack>vietate</Stack>
          <Stack sx={{ color: "#fd3544" }}>!</Stack>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
