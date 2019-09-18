import * as React from "react";
import styled from "styled-components";
import { colors } from "renderer/colors";

export class Navigation extends React.Component<{
  updatePage: (page: string) => void;
}> {
  render() {
    return (
      <Wrapper>
        <div onClick={() => this.props.updatePage("/")}>Home</div>
        <div onClick={() => this.props.updatePage("/region")}>Regions</div>
        <div onClick={() => this.props.updatePage("/config")}>Config</div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background-color: ${colors.navigation};
`;
