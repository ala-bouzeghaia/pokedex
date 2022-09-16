import styled from "styled-components";

type Props = { pokemonType: string };

export const StyledPokemonInfos = styled.div<Props>`
  nav {
    a {
      color: white;
    }
  }
  min-height: 140vh;

  /* @media (max-width: 500px) {
    width: max-content;
  } */
  @media (max-width: 900px) {
    /* width: max-content; */

    .title-container {
      flex-direction: column-reverse;
      align-items: center;
    }
    .title {
      min-width: 100%;
    }

    .stats-container {
      flex-direction: column;
      align-items: center;
      h3 {
        margin: 10px 0;
      }
    }
  }
  @media (max-width: 768px) {
    .stats {
      gap: 200/5;
    }
    .stats-row {
      span:nth-child(1) {
        min-width: 140px;
        height: 20px;
      }
    }
  }
  /* width: max-content; */
  /* @media (max-width: 460px) {
    height: 140vh;
    width: 100vw;
  } */
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.63) 0%,
      rgba(0, 0, 0, 0.63) 100%
    ),
    ${(props) => props.theme.colors[props.pokemonType]};
  background-blend-mode: soft-light, normal;
  transition: all 0.5s ease-in-out;
  .pokemon-infos {
    display: flex;
    justify-content: space-between;
    min-height: 100vh;
    color: white;
    font-family: Montserrat, sans-serif;
    /* background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.63) 0%,
        rgba(0, 0, 0, 0.63) 100%
      ),
      ${(props) => props.theme.colors[props.pokemonType]};
    background-blend-mode: soft-light, normal;
    transition: all 0.5s ease-in-out; */
    position: relative;
    z-index: 1;
    /* top: -12vh; */
    /* padding-top: 12vh; */

    .loading-container {
      display: flex;
      align-items: center;
    }
    .spinner {
      width: 2.5rem;
      height: 2.5rem;
      border: 4px solid;
      border-color: white white rgba(255, 255, 255, 0.18)
        rgba(255, 255, 255, 0.18);
      border-radius: 50%;
      animation: spin-anim 0.6s linear infinite;
    }
    @keyframes spin-anim {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .pokemon-infos-container {
      /* border: 1px solid red; */
      width: 1000px;

      /* @media (max-width: 900px) {
        .title-container {
          flex-direction: column-reverse;
          align-items: center;
        }
        .title {
          min-width: 100%;
        }

        .stats-container {
          flex-direction: column;
          align-items: center;
          h3 {
            margin: 10px 0;
          }
        }
      }
      @media (max-width: 768px) {
        .stats {
          gap: 200/5;
        }
        .stats-row {
          span:nth-child(1) {
            min-width: 140px;
            height: 20px;
          }
        }
      } */

      .title-container {
        display: flex;
        width: 100%;
        position: relative;
        top: 10%;
        //z-index: 1;
        img {
          width: 50%;
        }

        .title {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          width: 50%;

          .type {
            font-weight: 500;
          }
          .name {
            font-size: 4rem;
            text-transform: capitalize;
          }
          .details {
            width: 100%;
            .row {
              display: flex;
              justify-content: space-between;
              text-transform: capitalize;
              & :first-child {
                font-weight: bold;
              }
            }
          }
        }
      }

      .stats-container {
        display: flex;
        position: relative;
        top: 10%;
        //justify-content: space-between;
        h3 {
          display: flex;
          align-items: center;
          margin-right: 20px;
          font-size: 2rem;
          //font-weight: 700;
        }
        .stats {
          text-transform: capitalize;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;

          .stats-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            /* margin: 10px 0; */
            span {
              text-align: start;
              width: 140px;
            }
            .base-stat {
              //min-width: 50%;
              display: flex;
              justify-content: space-between;
              width: 70%;
              .bar {
                background-color: white;
                border-radius: 0.5rem;
                height: 100%;
                width: 90%;
              }
              span {
                text-align: end;
                width: 50px;
              }
            }
          }
        }
      }
    }
  }
  .arrow {
    display: flex;
    align-items: center;
    svg {
      color: white;
      opacity: 0.18;
      &:hover {
        cursor: pointer;
        opacity: 1;
      }
      transition: opacity 0.25s ease-in-out;
    }
  }
`;

export const NumberId = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: 0;
  top: -5%;
  z-index: -1;
  font-family: Montserrat;
  font-weight: 900;
  font-size: 20vmax;
  color: rgba(255, 255, 255, 0.18);
`;
//position: absolute;
/*user-select: none;
  right: 0;
  //top: 50px;*/
//z-index: -1;

type BarProps = { w: number };
export const Bar = styled.div<BarProps>`
  background-color: white;
  border-radius: 0.5rem;
  height: 20px;
  width: ${(props) => (props.w * 45) / 100}%;
  margin-right: 20px;
`;

type ArrowProps = { dir: string };
export const Arrow = styled.div<ArrowProps>`
  //background-color: gray;
  display: flex;
  align-items: center;
  padding-left: ${({ dir }) => (dir === "left" ? "20px" : "")};
  padding-right: ${({ dir }) => (dir === "right" ? "20px" : "")};
  a {
    /* height: 10px; */
    border: solid rgba(255, 255, 255);
    opacity: 0.18;
    border-radius: 10px;
    border-width: 0 10px 10px 0;
    //display: inline-block;
    padding: 20px;
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
    transition: opacity 0.25s ease-in-out;
    transform: ${({ dir }) =>
      dir === "left" ? "rotate(135deg)" : "rotate(-45deg)"};
  }
`;
