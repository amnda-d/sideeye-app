import * as React from "react";
import { FormGroup, NumericInput, Switch } from "@blueprintjs/core";
import { FormWrapper } from "renderer/config";

export class CutoffsConfigInput extends React.Component<
  {},
  {
    configFile: { [key: string]: any };
  }
> {
  constructor(props: {}) {
    super(props);

    const existingConfig = JSON.parse(localStorage.getItem("cutoffs") || "{}");

    this.state = {
      configFile: {
        min: existingConfig.min || -1,
        max: existingConfig.max || -1,
        include_fixation: existingConfig.include_fixation || false,
        include_saccades: existingConfig.include_saccades || false
      }
    };
  }

  componentWillUnmount() {
    localStorage.setItem("cutoffs", JSON.stringify(this.state.configFile));
  }

  render() {
    return (
      <FormWrapper>
        {this.renderField("Fixation Minimum Cutoff (ms)", "min")}
        {this.renderField("Fixation Maximim Cutoff (ms)", "max")}
        {this.renderSwitch(
          "Include cutoff fixations in calculated measures?",
          "include_fixation"
        )}
        {this.renderSwitch(
          "Include cutoff saccades in calculated measures?",
          "include_saccades"
        )}
      </FormWrapper>
    );
  }

  renderField(label: string, id: string) {
    return (
      <FormGroup inline label={label}>
        <NumericInput
          large
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

  renderSwitch(label: string, id: string) {
    return (
      <FormGroup inline label={label}>
        <Switch
          id={id}
          large
          checked={this.state.configFile[id]}
          onChange={() => {
            this.setState(
              {
                configFile: {
                  ...this.state.configFile,
                  [id]: !this.state.configFile[id]
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
