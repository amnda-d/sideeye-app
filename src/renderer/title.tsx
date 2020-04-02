import * as React from "react";
import styled from "styled-components";
import { colors } from "renderer/colors";
import { Eye } from "renderer/components/eye";

export class Title extends React.Component {
  render() {
    return (
      <Wrapper>
        <Text>SideEye</Text>
        <Eye />
      </Wrapper>
    );
  }
}

const Text = styled.div`
  padding: 20px;
`;

const Wrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 40%;
  width: 100vw;
  font-size: 30px;
  color: ${colors.text};
  font-weight: 700;
  font-style: italic;
  font-family: "KoHo", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
