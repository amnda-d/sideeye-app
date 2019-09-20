import * as React from "react";
import { FormWrapper } from "renderer/config";
import { NumberInput } from "renderer/components/number-input";

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
      <FormWrapper>
        {this.renderField(
          "Fixation Minimum Cutoff",
          "fixation_min_cutoff",
          "ms"
        )}
        {this.renderField("Maximum Saccade Duration", "max_saccade_dur", "ms")}
        {this.renderField("Maximum Blink Count", "blink_max_count", "")}
        {this.renderField("Maximum Blink Duration", "blink_max_dur", "ms")}
      </FormWrapper>
    );
  }

  renderField(label: string, id: string, units: string) {
    return (
      <NumberInput
        label={label}
        id={id}
        units={units}
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
    );
  }
}
