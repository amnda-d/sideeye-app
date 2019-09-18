import * as React from "react";
import styled from "styled-components";
import { colors } from "renderer/colors";
import { ASCConfigInput } from "renderer/config/asc";
import { CutoffsConfigInput } from "renderer/config/cutoffs";
import { DA1ConfigInput } from "renderer/config/da1";
import { RegionConfigInput } from "renderer/config/region";
import { FileConfigInput } from "renderer/config/file";

export class ConfigInput extends React.Component {
  state = {
    displayConfig: false,
    displayRegion: false,
    displayDA1: false,
    displayASC: false,
    displayCutoffs: false
  };

  render() {
    return (
      <Wrapper>
        <FileConfigInput />
        <button onClick={() => this.setState({ displayConfig: true })}>
          Create New Configuration
        </button>
        {this.state.displayConfig && (
          <div>
            <Header
              onClick={() =>
                this.setState({ displayRegion: !this.state.displayRegion })
              }
            >
              Region Configuration
            </Header>
            {this.state.displayRegion && <RegionConfigInput />}
            <Header
              onClick={() =>
                this.setState({ displayDA1: !this.state.displayDA1 })
              }
            >
              DA1 Configuration
            </Header>
            {this.state.displayDA1 && <DA1ConfigInput />}
            <Header
              onClick={() =>
                this.setState({ displayASC: !this.state.displayASC })
              }
            >
              ASC Parsing Configuration
            </Header>
            {this.state.displayASC && <ASCConfigInput />}
            <Header
              onClick={() =>
                this.setState({ displayCutoffs: !this.state.displayCutoffs })
              }
            >
              Fixation and Saccade Cutoffs
            </Header>
            {this.state.displayCutoffs && <CutoffsConfigInput />}
          </div>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin: 20px;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 30px;

  .bp3-form-group {
    flex-direction: column;
  }

  .bp3-form-group.bp3-inline label.bp3-label {
    line-height: 20px;
    font-size: 12px;
    color: ${colors.gray};
  }
`;

const Header = styled.div`
  background-color: ${colors.green};
  border: 2px solid ${colors.darkGreen};
  border-radius: 5px;
  padding: 10px;
  margin: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;
