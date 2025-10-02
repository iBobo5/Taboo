import type { JSX } from "react";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { LogoIcon } from "../../images";
import { theme } from "../../theme";

export const LoadingSpinner = ({ open }: { open: boolean }): JSX.Element => (
  <Backdrop open={open} sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.primary.light, zIndex: 2 }}>
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress size={150} color="inherit" />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LogoIcon sx={{ height: "80px" }} />
      </Box>
    </Box>
  </Backdrop>
);
