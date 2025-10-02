import { createTheme, type Theme } from "@mui/material/styles";
import { itIT as coreIt } from "@mui/material/locale";

const palette = {
  primary: {
    main: "#1e0d43",
    light: "#62559f",
  },
  secondary: {
    main: "#62559f",
    light: "#fff",
  },
  common: {
    white: "#fff",
  },
  gray: {
    dark: "#595959",
    light: "#ececec",
  },
};

export const theme: Theme = createTheme(
  {
    palette,
    typography: {
      fontFamily: "Roboto, sans-serif",
      h1: {
        fontSize: "1.5rem",
        fontWeight: 700,
        lineHeight: 1.7,
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 600,
        lineHeight: 1.6,
      },
      h3: {
        fontSize: "1.3rem",
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h4: {
        fontSize: "1.2rem",
        fontWeight: 500,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: "1.1rem",
        fontWeight: 500,
        lineHeight: 1.3,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.2,
      },
      subtitle1: {
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: 1.5,
      },
      subtitle2: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.2,
      },
      body1: {
        fontSize: "1.25rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "1rem",
        fontWeight: 300,
        lineHeight: 1.2,
      },
      caption: {
        fontSize: "1.5rem",
        lineHeight: 1.7,
        opacity: 0.75,
        color: palette.common.white,
        textShadow: "5px 5px 5px #fd3544",
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            "&.impostazioniLabel": {
              minWidth: "225px",
              color: palette.primary.main,
              fontWeight: 600,
            },
            "&.squadraPartecipante": {
              backgroundColor: palette.primary.light,
              color: palette.common.white,
              fontSize: "1.5rem",
              fontWeight: 700,
              lineHeight: 1.7,
              border: "1px solid " + palette.primary.main,
              padding: "1rem",
              borderRadius: "20px",
            },
            "&.wrongWord, &.passWord, &.correctWord": {
              fontSize: "0.8rem",
              marginTop: "5px",
            },
            "&.wrongWord": {
              color: "red",
            },
            "&.passWord": {
              color: palette.gray.dark,
            },
            "&.correctWord": {
              color: "green",
            },
          },
        },
      },
      MuiStack: {
        styleOverrides: {
          root: {
            "&.punteggioFinale,&.winner": {
              padding: "1.5rem",
              "& .MuiTypography-root": {
                fontSize: "3rem",
              },
            },
            "&.punteggioFinale": {
              boxShadow: "0px 2px 2px 2px rgba(30,13,67,0.2),0px 2px 2px 0px rgba(30,13,67,0.14),0px 3px 3px 0px rgba(30,13,67,0.12)",
              "& .MuiTypography-root": {
                color: palette.primary.main,
                fontWeight: 100,
              },
            },
            "&.winner": {
              boxShadow: "0px 2px 2px 2px rgba(0,128,0,0.2),0px 2px 2px 0px rgba(0,128,0,0.14),0px 3px 3px 0px rgba(0,128,0,0.12)",
              "& .MuiTypography-root": {
                color: "green",
                fontWeight: 600,
              },
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: palette.primary.main,
            textDecoration: "none",
            fontWeight: "bold",
            fontFamily: "Roboto, Arial, sans-serif",
            "&:hover, &:hover h1, &:hover h2, &:hover h3, &:hover h4, &:hover h5, &:hover h6": {
              textDecoration: "underline",
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true, // Disattiva il ripple ovunque
        },
        styleOverrides: {
          root: {
            borderWidth: "1px",
            borderStyle: "solid",
            textTransform: "none", // Rimuove il testo tutto maiuscolo
            "&:hover": {
              textDecoration: "underline",
              boxShadow: "none",
            },
            "&:focus-visible": {
              outline: "2px solid #1e0d43",
              outlineOffset: "2px",
            },
            "&:disabled": {
              borderColor: "#0000001f",
            },
            "&.bottomCardButton": {
              color: palette.common.white,
              "&:disabled": {
                backgroundColor: palette.gray.light,
                color: palette.gray.dark,
                cursor: "not-allowed",
                pointerEvents: "all",
                "&:hover": {
                  textDecoration: "none",
                },
              },
            },
            "&.wrongButton": {
              backgroundColor: "red",
            },
            "&.passButton": {
              backgroundColor: palette.primary.light,
            },
            "&.correctButton": {
              backgroundColor: "green",
            },
          },
          // Stile per i pulsanti "primary" (variant="contained")
          containedPrimary: {
            borderColor: palette.primary.main,
            backgroundColor: palette.primary.main,
            color: palette.common.white,
          },
          // Stile per i pulsanti "secondary" (variant="contained")
          containedSecondary: {
            borderColor: palette.secondary.main,
            backgroundColor: palette.secondary.main,
            color: palette.common.white,
          },
          // Stile per i pulsanti "primary" (variant="outline")
          outlinedPrimary: {
            borderColor: palette.primary.main,
            backgroundColor: palette.common.white,
            color: palette.primary.main,
          },
          // Stile per i pulsanti "secondary" (variant="outline")
          outlinedSecondary: {
            borderColor: palette.secondary.main,
            backgroundColor: palette.common.white,
            color: palette.secondary.main,
          },
          sizeLarge: {
            fontSize: "1rem",
            padding: "0.75rem 1.5rem",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            backgroundColor: palette.common.white,
            width: "20px",
            height: "20px",
            svg: {
              width: "14px",
              height: "14px",
              fill: palette.primary.main,
            },
            padding: "0",
            "&:hover": {
              backgroundColor: palette.primary.main,
              svg: {
                fill: palette.common.white,
              },
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "&.squadra": {
              label: {
                color: palette.primary.main,
                fontSize: "1rem",
              },
              fieldset: {
                borderColor: palette.primary.main,
              },
              input: {
                fontSize: "1rem",
                color: palette.primary.main,
              },
            },
            "&.timer": {
              input: {
                textAlign: "center",
                fontWeight: 700,
                fontSize: "5rem",
                padding: 0,
                "&:disabled": {
                  color: palette.primary.main,
                  WebkitTextFillColor: "inherit",
                },
              },
              fieldset: {
                border: 0,
              },
            },
            "&.expiringTime": {
              input: {
                "&:disabled": {
                  color: "red",
                  animation: "blinking 1s infinite",
                  "@keyframes blinking": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.5 },
                    "100%": { opacity: 1 },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  coreIt
);
