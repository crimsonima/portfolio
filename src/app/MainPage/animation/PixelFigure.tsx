import styled, { keyframes, css } from "styled-components";

// Define the keyframes for the animation
const talkAnimation = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: -1040px 0; /* Total width of the sprite sheet */
  }
`;

// Create the styled sprite component
const Sprite = styled.div<{ $talkcontrol: boolean }>`
  width: 208px; /* Width of a single frame */
  height: 368px; /* Height of a single frame */
  background: url("/Aseprites/pixel-figure.png") no-repeat;
  background-size: 1040px auto; /* Ensure the sprite sheet width is proportionally sized */
  ${({ $talkcontrol }) =>
    $talkcontrol
      ? css`
          animation: ${talkAnimation} 0.5s steps(5) infinite; /* Steps match the number of frames */
        `
      : css`
          animation: none;
        `}
`;

interface pixelInter {
  talkControl: boolean;
}

export default function PixelFigure({ talkControl }: pixelInter) {
  return <Sprite $talkcontrol={talkControl} />;
}
