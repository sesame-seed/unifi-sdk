import {
  blue100,
  red100,
  green100,
  green200,
  green300,
  grey200,
  grey100,
  grey300,
  yellow100,
  white100,
  white200,
  red200,
  red300,
} from "./colors";

import { breakpointMap } from "./base";

export const DarkTheme = {
  name: "DarkTheme",
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  // Colors
  primary: green100,
  primaryLight: green200,
  primaryDark: green300,

  dangerLight: red100,
  danger: red200,
  dangerDark: red300,

  info: blue100,
  warning: yellow100,
  success: green300,
  muted: white200,
  // Contracts
  bgContrast100: white100,
  bgContrast200: white200,
  bgContrast300: white200,
  // Fonts
  txt100: white100,
  txt200: white200,
  // Backgrounds
  bg100: grey100,
  bg200: grey200,
  bg300: grey300,
  // Gradients
  shinyGradient: `linear-gradient(
    to right,
    #00e676 20%,
    #31ff9b 40%,
    #8affc6 60%,
    #00e676 80%
  )`,

  // Borders and shadows
  borderRadius: "5px",
  boxShadow: "0 0 15px 0 rgb(0 0 0 / 15%)",
  // zIndexes
  zIndex: {
    modal: 900,
  },
  // Responsivenes
  breakpoints: breakpointMap,
};
