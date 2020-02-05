import * as React from "react";
import { Icon } from "@blueprintjs/core";
import styled from "styled-components";
import { colors } from "renderer/colors";

export class Navigation extends React.Component<
  {
    updatePage: (page: string) => void;
    regionDone: boolean;
    configDone: boolean;
    filesDone: boolean;
  },
  { currentPage: number }
> {
  state = { currentPage: 0 };
  render() {
    return (
      <Wrapper>
        <NavButton
          className={this.state.currentPage === 0 ? "selected" : ""}
          onClick={() => {
            this.props.updatePage("/");
            this.setState({ currentPage: 0 });
          }}
        >
          <Icon icon="eye-open" />
        </NavButton>
        <NavButton
          className={this.state.currentPage === 1 ? "selected" : ""}
          onClick={() => {
            this.props.updatePage("/region");
            this.setState({ currentPage: 1 });
          }}
        >
          <Icon icon={this.props.regionDone ? "tick-circle" : "circle"} />
          Regions
        </NavButton>
        <NavButton
          className={this.state.currentPage === 2 ? "selected" : ""}
          onClick={() => {
            this.props.updatePage("/config");
            this.setState({ currentPage: 2 });
          }}
        >
          <Icon icon={this.props.configDone ? "tick-circle" : "circle"} />
          Config
        </NavButton>
        <NavButton
          className={this.state.currentPage === 3 ? "selected" : ""}
          onClick={() => {
            this.props.updatePage("/da1_asc");
            this.setState({ currentPage: 3 });
          }}
        >
          <Icon icon={this.props.filesDone ? "tick-circle" : "circle"} />
          DA1/ASC Files
        </NavButton>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  height: 60px;

  .selected {
    font-weight: bold;
  }
`;

export const NavButton = styled.div`
  background-color: ${colors.navigation};
  color: ${colors.background};
  display: flex;
  flex-direction: row;
  align-content: center;
  padding: 0 10px;
  font-size: 20px;
  margin: 5px;
  height: 55px;
  line-height: 55px;
  border-radius: 5px;
  cursor: pointer;

  svg {
    height: 55px;
    margin: 0 10px 0 0;
  }
`;
