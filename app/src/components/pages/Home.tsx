import { useEffect, type JSX } from "react";
import { Box, Typography } from "@mui/material";
import { TabooIcon } from "../../images";
import { centraPaginaVerticalmente } from "../../utils";
import { Link } from "react-router";
import { PATH_GIOCO } from "../../path";

export const Home = (): JSX.Element => {
  useEffect(() => {
    centraPaginaVerticalmente();
  }, []);

  return (
    <Box
      sx={{
        px: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        a: {
          "&:hover": {
            ".MuiTypography-root": {
              textDecoration: "underline",
            },
          },
        },
      }}
    >
      <Link to={PATH_GIOCO} style={{ display: "contents" }}>
        <TabooIcon sx={{ maxHeight: "90%" }} />
        <Typography sx={{ position: "absolute" }} variant="caption">
          Clicca per iniziare a giocare
        </Typography>
      </Link>
    </Box>
  );
};
