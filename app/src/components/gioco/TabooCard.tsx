import type { JSX } from "react";
import { Badge, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useColori } from "../../container/TabooContext";
import type { ColoriProps, TabooCardProps } from "../types";

export const TabooCard = (props: TabooCardProps): JSX.Element => {
  const { guess, taboo, tema } = props;
  const colori: null | ColoriProps = useColori();

  const colore: string = colori && colori[tema] != null ? colori[tema] : "#1e0d43";

  return (
    <Badge
      badgeContent={tema}
      slotProps={{
        badge: {
          sx: {
            bgcolor: "white",
            border: "1px solid #1574ef",
            borderRadius: "10px",
            p: "15px",
            color: "#1574ef",
            fontSize: "0.9em",
          },
        },
      }}
      sx={{ display: "flex", mx: "auto", mb: "25px", width: 275 }}
    >
      <Card
        sx={{
          width: "100%",
          height: "275px", // 285px toali se considero i 10 (5*2) di bordo
          border: "5px solid " + colore,
          borderRadius: "15px",
        }}
      >
        <CardHeader
          title={guess}
          sx={{
            height: "33px", // 65px totali se considero i 32 (16*2) di padding
            p: "16px",
            backgroundColor: colore,
            textAlign: "center",
            color: "white",
          }}
        />
        <CardContent
          sx={{
            height: "210px", // 275 - 65 di header
            display: "grid",
            p: "0 !important",
            alignContent: "center",
          }}
        >
          {taboo.map((parola: string, index: number) => (
            <Typography textAlign="center" key={index} sx={{ mb: 1.25 }}>
              {parola}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </Badge>
  );
};
