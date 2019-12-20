import * as React from "react";
import { FormWrapper } from "renderer/config";
import { NumberInput } from "renderer/components/number-input";
import { SwitchInput } from "renderer/components/switch-input";
import { Config } from "renderer/config/default-config";

export class CutoffsConfigInput extends React.Component<{
  config: Config;
  updateConfig: (key: string, newValue: number | boolean) => void;
}> {
  render() {
    return (
      <div>
        <FormWrapper>
          {this.renderField("Fixation Minimum Cutoff", "min", "ms")}
          {this.renderField("Fixation Maximim Cutoff", "max", "ms")}
        </FormWrapper>
        <FormWrapper>
          {this.renderSwitch(
            "Include cutoff fixations in calculated measures?",
            "include_fixation"
          )}
        </FormWrapper>
        <FormWrapper>
          {this.renderSwitch(
            "Include cutoff saccades in calculated measures?",
            "include_saccades"
          )}
        </FormWrapper>
      </div>
    );
  }

  renderField(label: string, id: "min" | "max", units: string) {
    return (
      <NumberInput
        label={label}
        id={id}
        units={units}
        value={this.props.config.cutoffs[id]}
        onValueChange={value =>
          this.props.updateConfig(`cutoffs.${id}`, value || 0)
        }
      />
    );
  }

  renderSwitch(label: string, id: "include_fixation" | "include_saccades") {
    return (
      <SwitchInput
        label={label}
        id={id}
        checked={this.props.config.cutoffs[id]}
        onChange={() =>
          this.props.updateConfig(
            `cutoffs.${id}`,
            !this.props.config.cutoffs[id]
          )
        }
      />
    );
  }
}
