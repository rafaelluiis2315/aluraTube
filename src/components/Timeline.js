import styled from "styled-components";

export const StyledTimeline = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  overflow: hidden;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  img {
    aspect-ratio: 16/9;
    font-weight: 500;
    object-fit: cover;
    width: 100%;
    max-width: 210px;
    height: auto;
  }
  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 16px;
    div {
      width: calc(100vw - 16px * 4);
      display: grid;
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(200px,1fr);
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      
      &::-webkit-scrollbar {
        width: 20px;           /* width of the entire scrollbar */
      }

      @media (max-width: 500px){
        &::-webkit-scrollbar {
          height: 8px          /* width of the entire scrollbar */
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
        }
      }

      &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.backgroundBase || "#222222"};        /* color of the tracking area */
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.borderBase || "#222222"};    /* color of the scroll thumb */
      }

      a {
        scroll-snap-align: start;
        margin-bottom: 10px;
        span {
          padding-top: 8px;
          display: block;
          padding-right: 24px;
          color: ${({ theme }) => theme.textColorBase || "#222222"};
        }
      }
    }
  }
`;