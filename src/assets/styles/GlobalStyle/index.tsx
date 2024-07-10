import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
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
  input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
  button{
    background: none;
  }

`;

export default GlobalStyle;
