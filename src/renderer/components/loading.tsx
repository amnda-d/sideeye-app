import * as React from "react";
import styled from "styled-components";
import { colors } from "renderer/colors";
import { Eye } from "renderer/components/eye";

export const Loading = () => (
  <LoadingPage>
    <Eye />
    <Text>Processing data...</Text>
    <Text2>Expect a few minutes per ASC file...</Text2>
  </LoadingPage>
);

const LoadingPage = styled.div`
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  background-color: ${colors.background};
  z-index: 10;
`;

const flickerAnimation = `
@keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Text = styled.div`
  font-size: 20px;
  -webkit-animation: flickerAnimation 6s infinite;
  animation: flickerAnimation 6s infinite;
  position: absolute;
  top: 60%;
  ${flickerAnimation}
  }
`;

const Text2 = styled.div`
  font-size: 20px;
  -webkit-animation: flickerAnimation 6s infinite;
  animation: flickerAnimation 6s infinite;
  animation-delay: 3s;
  position: absolute;
  top: 60%;
  ${flickerAnimation}
  }
`;
