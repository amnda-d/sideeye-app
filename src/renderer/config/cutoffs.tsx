import * as React from "react";
import { FormWrapper } from "renderer/config";
import { NumberInput } from "renderer/components/number-input";
import { SwitchInput } from "renderer/components/switch-input";

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
        {this.renderField("Fixation Minimum Cutoff", "min", "ms")}
        {this.renderField("Fixation Maximim Cutoff", "max", "ms")}
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

  renderField(label: string, id: string, units: string) {
    return (
      <NumberInput
        label={label}
        id={id}
        units={units}
        value={
          this.state.configFile[id] !== undefined
            ? this.state.configFile[id]
            : ""
        }
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
    );
  }

  renderSwitch(label: string, id: string) {
    return (
      <SwitchInput
        label={label}
        id={id}
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
    );
  }
}
