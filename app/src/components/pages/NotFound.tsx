import { useEffect, type JSX } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { PATH_HOME } from "../../path";
import { NotFoundIcon } from "../../images";

export const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.height = "100%";
    document.getElementsByTagName("body")[0].style.height = "100%";
    document.getElementById("root")!.style.height = "100%";
    (document.getElementsByClassName("MuiContainer-root")[0] as HTMLElement).style.height = "100%";
  });

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Card sx={{ width: "450px", m: "auto", p: 2, border: "1px solid #1e0d43" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <NotFoundIcon sx={{ height: "300px" }} />
          <Typography variant="h4" textAlign="center" sx={{ color: "#1e0d43" }}>
            Pagina non trovata
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => navigate(PATH_HOME)}
            variant="contained"
            sx={{
              border: "2px solid #1e0d43",
              backgroundColor: "#1e0d43",
              textTransform: "none",
              m: "auto",
              fontWeight: 600,
              "&:hover": { backgroundColor: "white", color: "#1e0d43", textDecoration: "underline" },
            }}
          >
            Vai a giocare
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
