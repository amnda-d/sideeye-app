import * as React from "react";
import styled from "styled-components";
import { colors } from "renderer/colors";

export const Eye = () => <StyledEye />;

const StyledEye = styled.div`
  width: 45px;
  height: 45px;
  background-color: rgba(255, 255, 255);
  border-radius: 50%;
  box-shadow: 55px 0px 0px 0px rgba(255, 255, 255);
  position: relative;
  margin: 0 0 0 -50px;

  :after {
    background-color: ${colors.text};
    width: 20px;
    height: 20px;
    box-shadow: 55px 0px 0px 0px ${colors.text};
    border-radius: 50%;
    left: 20px;
    top: 18px;
    position: absolute;
    content: "";
    -webkit-animation: eyeball 1s linear infinite alternate;
    animation: eyeball 1s linear infinite alternate;
  }
  @-webkit-keyframes eyeball {
    0% {
      left: 23px;
    }
    60% {
      left: 10px;
    }
    100% {
      left: 7px;
    }
  }

  @keyframes eyeball {
    0% {
      left: 23px;
    }
    60% {
      left: 10px;
    }
    100% {
      left: 7px;
    }
  }
`;
