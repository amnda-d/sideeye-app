import * as React from "react";
import { FormGroup, NumericInput } from "@blueprintjs/core";
import styled from "styled-components";

export class ASCConfigInput extends React.Component<
  {},
  {
    configFile: { [key: string]: any };
  }
> {
  constructor(props: {}) {
    super(props);

    const existingConfig = JSON.parse(
      localStorage.getItem("asc_parsing") || "{}"
    );

    this.state = {
      configFile: {
        fixation_min_cutoff: existingConfig.fixation_min_cutoff || false,
        max_saccade_dur: existingConfig.max_saccade_dur || false,
        blink_max_count: existingConfig.blink_max_count || false,
        blink_max_dur: existingConfig.blink_max_dur || false
      }
    };
  }

  componentWillUnmount() {
    localStorage.setItem("asc_parsing", JSON.stringify(this.state.configFile));
  }

  render() {
    return (
      <Wrapper>
        <FormGroup label="ASC Parsing Fields">
          {this.renderField(
            "Fixation Minimum Cutoff (ms)",
            "fixation_min_cutoff"
          )}
          {this.renderField("Maximum Saccade Duration (ms)", "max_saccade_dur")}
          {this.renderField("Maximum Blink Count", "blink_max_count")}
          {this.renderField("Maximum Blink Duration (ms)", "blink_max_dur")}
        </FormGroup>
      </Wrapper>
    );
  }

  renderField(label: string, id: string) {
    return (
      <FormGroup inline label={label}>
        <NumericInput
          id={id}
          value={this.state.configFile[id] || ""}
          onValueChange={value => {
            this.setState(
              {
                configFile: {
                  ...this.state.configFile,
                  [id]: value
                }
              },
              () => console.log(this.state)
            );
          }}
        />
      </FormGroup>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
