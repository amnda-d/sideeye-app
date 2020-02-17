import * as React from "react";
import styled from "styled-components";
import { colors } from "renderer/colors";

export class Title extends React.Component {
  render() {
    return <Wrapper>SideEye</Wrapper>;
  }
}

const Wrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  width: 100vw;
  font-size: 20px;
  color: ${colors.text};
  font-weight: bold;
`;
