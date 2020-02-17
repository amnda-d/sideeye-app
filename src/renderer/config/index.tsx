import * as React from "react";
import styled from "styled-components";
import { set } from "lodash";
import { colors } from "renderer/colors";
import { ASCConfigInput } from "renderer/config/asc";
import { CutoffsConfigInput } from "renderer/config/cutoffs";
import { DA1ConfigInput } from "renderer/config/da1";
import { RegionConfigInput } from "renderer/config/region";
import { MeasuresConfigInput } from "renderer/config/measures";
import { FileConfigInput } from "renderer/config/file";
import { OutputFileConfigInput } from "renderer/config/output";
import { Config } from "renderer/config/default-config";

export class ConfigInput extends React.Component<{
  updateAppState: (state: {}) => void;
  config: Config;
  configFileName: string | null;
}> {
  state = {
    displayConfig: false,
    displayRegion: false,
    displayDA1: false,
    displayASC: false,
    displayCutoffs: false,
    displayMeasures: false,
    displayOutput: false
  };

  render() {
    return (
      <Wrapper>
        <FileConfigInput
          config={this.props.config}
          fileName={this.props.configFileName}
          updateConfig={newValue => {
            this.props.updateAppState(newValue);
            this.setState({
              displayConfig: true
            });
          }}
        />
        <NewConfig onClick={() => this.setState({ displayConfig: true })}>
          Create New Configuration
        </NewConfig>
        {this.state.displayConfig && (
          <ConfigOptions>
            <Header
              onClick={() =>
                this.setState({ displayRegion: !this.state.displayRegion })
              }
            >
              Region Configuration
            </Header>
            {this.state.displayRegion && (
              <RegionConfigInput
                config={this.props.config}
                updateConfig={(key, newValue) =>
                  this.props.updateAppState({
                    config: set(this.props.config, key, newValue)
                  })
                }
              />
            )}
            <Header
              onClick={() =>
                this.setState({ displayDA1: !this.state.displayDA1 })
              }
            >
              DA1 Configuration
            </Header>
            {this.state.displayDA1 && (
              <DA1ConfigInput
                config={this.props.config}
                updateConfig={(key, newValue) =>
                  this.props.updateAppState({
                    config: set(this.props.config, key, newValue)
                  })
                }
              />
            )}
            <Header
              onClick={() =>
                this.setState({ displayASC: !this.state.displayASC })
              }
            >
              ASC Parsing Configuration
            </Header>
            {this.state.displayASC && (
              <ASCConfigInput
                config={this.props.config}
                updateConfig={(key, newValue) =>
                  this.props.updateAppState({
                    config: set(this.props.config, key, newValue)
                  })
                }
              />
            )}
            <Header
              onClick={() =>
                this.setState({ displayCutoffs: !this.state.displayCutoffs })
              }
            >
              Fixation and Saccade Cutoffs
            </Header>
            {this.state.displayCutoffs && (
              <CutoffsConfigInput
                config={this.props.config}
                updateConfig={(key, newValue) =>
                  this.props.updateAppState({
                    config: set(this.props.config, key, newValue)
                  })
                }
              />
            )}
            <Header
              onClick={() =>
                this.setState({
                  displayMeasures: !this.state.displayMeasures
                })
              }
            >
              Trial and Region Measures
            </Header>
            {this.state.displayMeasures && (
              <MeasuresConfigInput
                config={this.props.config}
                updateConfig={(key, newValue) =>
                  this.props.updateAppState({
                    config: set(this.props.config, key, newValue)
                  })
                }
              />
            )}
            <Header
              onClick={() =>
                this.setState({
                  displayOutput: !this.state.displayOutput
                })
              }
            >
              Output File
            </Header>
            {this.state.displayOutput && (
              <OutputFileConfigInput
                config={this.props.config}
                updateConfig={(key, newValue) =>
                  this.props.updateAppState({
                    config: set(this.props.config, key, newValue)
                  })
                }
              />
            )}
          </ConfigOptions>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin: 10px 30px;

  .bp3-form-group {
    flex-direction: column;
    margin: 0 10px;
  }

  .bp3-input-group {
    min-width: 155px;
  }

  label.bp3-control.bp3-switch {
    margin: 0;
  }

  .bp3-form-group label.bp3-label {
    line-height: 20px;
    font-size: 12px;
    color: ${colors.gray};
  }

  .bp3-form-group.bp3-inline label.bp3-label {
    line-height: 20px;
    font-size: 12px;
    color: ${colors.gray};
  }
`;

const ConfigOptions = styled.div`
  width: 75%;
  height: 75%;
  overflow: scroll;
`;

const NewConfig = styled.button`
  margin: 15px;
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
