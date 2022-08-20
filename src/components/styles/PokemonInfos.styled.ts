import styled from "styled-components";

type Props = { pokemonType: string };

export const StyledPokemonInfos = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
  color: white;
  font-family: Montserrat, sans-serif;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.63) 0%,
      rgba(0, 0, 0, 0.63) 100%
    ),
    ${(props) => props.theme.colors[props.pokemonType] || "white"};
  background-blend-mode: soft-light, normal;

  .pokemon-infos-container {
    //border: 1px solid red;
    max-width: 1000px;

    .title-container {
      display: flex;
      width: 100%;
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
        }
        .details {
          width: 100%;
          .row {
            display: flex;
            justify-content: space-between;
            & :first-child {
              font-weight: bold;
            }
          }
        }
      }
    }

    .stats-container {
      display: flex;
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

        .stats-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0;
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
          }
        }
      }
    }
  }
`;

export const NumberId = styled.div`
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
  margin-left: ${({ dir }) => (dir === "left" ? "40px" : "")};
  margin-right: ${({ dir }) => (dir === "right" ? "40px" : "")};
  a {
    height: 30px;
    border: solid rgba(255, 255, 255);
    opacity: 0.18;
    border-radius: 10px;
    border-width: 0 30px 30px 0;
    display: inline-block;
    padding: 30px;
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
    transition: opacity 0.25s ease-in;
    transform: ${({ dir }) =>
      dir === "left" ? "rotate(135deg)" : "rotate(-45deg)"};
  }
`;
