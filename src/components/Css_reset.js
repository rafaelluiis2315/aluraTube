import { createGlobalStyle } from "styled-components";

export const CssReset = createGlobalStyle`

    /* Reset */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scrollbar-color: blue orange;
    }
    
    body {
        font-family: sans-serif;
        background-color: ${({ theme }) => theme.backgroundBase};
        color: ${({ theme }) => theme.textColorBase};
        overflow-x: hidden;
    }

    /* NextJS */
    html {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }

    body {
        display: flex;
        flex: 1;
    }


    #__next {
        display: flex;
        flex: 1;
    }

  /* Globals */
    button, a {
        text-decoration: none;
        opacity: 1;
        transition: .3s;
        &:hover,
        &:focus {
        opacity: .5;
    }
  }
`;