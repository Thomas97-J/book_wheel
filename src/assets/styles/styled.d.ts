import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      main: string;
      sub: string;
      white: string;
      font_gray: string;
      default_green: string;
      default_gray_green: string;
    };
    height: {
      header: string;
      bottomNav: string;
    };
  }
}
