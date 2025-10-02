import { type ChangeEvent, type JSX } from "react";
import { Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { CloseOutlined as CloseOutlinedIcon } from "@mui/icons-material";
import type { SquadraProps } from "../types";

export const Squadra = (props: SquadraProps): JSX.Element => {
  const { label, value, onChange } = props;

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="h6" className="impostazioniLabel" mr={2}>
          {label}
        </Typography>
      </Grid>
      <Grid size={{ xs: 8, md: 4 }}>
        <TextField
          fullWidth
          label={label}
          size="small"
          className="squadra"
          value={value}
          onChange={onChange}
          {...(value.length > 0 && {
            slotProps: {
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        let emptyE = { target: { value: "" } } as unknown as ChangeEvent<HTMLInputElement>;
                        onChange(emptyE);
                      }}
                    >
                      <CloseOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            },
          })}
        />
      </Grid>
    </>
  );
};
