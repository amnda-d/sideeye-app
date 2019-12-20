import * as React from "react";
import { FormWrapper } from "renderer/config";
import { NumberInput } from "renderer/components/number-input";
import { Config } from "renderer/config/default-config";

export class ASCConfigInput extends React.Component<{
  config: Config;
  updateConfig: (key: string, newValue: number) => void;
}> {
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

  renderField(
    label: string,
    id:
      | "fixation_min_cutoff"
      | "max_saccade_dur"
      | "blink_max_count"
      | "blink_max_dur",
    units: string
  ) {
    return (
      <NumberInput
        label={label}
        id={id}
        units={units}
        value={this.props.config.asc_parsing[id]}
        onValueChange={value =>
          this.props.updateConfig(`asc_parsing.${id}`, value || 0)
        }
      />
    );
  }
}
