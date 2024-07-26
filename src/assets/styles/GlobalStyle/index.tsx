import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
  v2.0 | 20110126
  License: none (public domain)
  */
  @font-face {
    font-family: 'NEXON Lv1 Gothic OTF';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-family: NEXON Lv1 Gothic OTF, sans-serif, Arial;
  vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
  display: block;
  }
  body {
  line-height: 1;
  }
  ol, ul {
  list-style: none;
  }
  blockquote, q {
  quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
  content: '';
  content: none;
  }
  table {
  border-collapse: collapse;
  border-spacing: 0;
  }
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: NEXON Lv1 Gothic OTF, sans-serif, Arial;
    -webkit-tap-highlight-color: transparent;

  }

  h2, p {
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
  html,
  body,
  :root {
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    height: 100%;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    .scrollable::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    .scrollable {
      scrollbar-width: none; /* for Firefox */
      -ms-overflow-style: none; /* for Internet Explorer and Edge */
    }
    .scrollable::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }
  }
  input,textarea {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    &:focus {
      outline: none;
      border-color: rgb(74 131 50);;
    }
  }
  button{
    background: none;  
    &:disabled {
    background: #bcbcbc;
  }
  }
  #root{
    width: 100vw;
    max-width: 600px;
  }
`;

export default GlobalStyle;
