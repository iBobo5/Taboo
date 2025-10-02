import { Box, Typography } from "@mui/material";
import { EmptyIcon } from "../../images";

export const Empty = ({ placeholder }: { placeholder: string }) => (
  <Box>
    <EmptyIcon sx={{ height: "100px" }} />
    <Typography>{placeholder}</Typography>
  </Box>
);
