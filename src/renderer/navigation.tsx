import * as React from "react";
import styled from "styled-components";
import { colors } from "renderer/colors";

export class Navigation extends React.Component<
  {
    updatePage: (page: string) => void;
  },
  { currentPage: number }
> {
  state = { currentPage: 0 };
  render() {
    return (
      <Wrapper>
        <div
          className={this.state.currentPage === 0 ? "selected" : ""}
          onClick={() => {
            this.props.updatePage("/");
            this.setState({ currentPage: 0 });
          }}
        >
          Home
        </div>
        <div
          className={this.state.currentPage === 1 ? "selected" : ""}
          onClick={() => {
            this.props.updatePage("/region");
            this.setState({ currentPage: 1 });
          }}
        >
          Regions
        </div>
        <div
          className={this.state.currentPage === 2 ? "selected" : ""}
          onClick={() => {
            this.props.updatePage("/config");
            this.setState({ currentPage: 2 });
          }}
        >
          Config
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;

  div {
    background-color: ${colors.navigation};
    flex-direction: column;
    padding: 10px;
    font-size: 20px;
    margin: 5px;
    border-radius: 5px;
  }

  .selected {
    font-weight: bold;
  }
`;
