import * as React from "react";
import { FormWrapper } from "renderer/config";
import { NumberInput } from "renderer/components/number-input";
import { Config } from "renderer/config/default-config";

export class DA1ConfigInput extends React.Component<{
  config: Config;
  updateConfig: (key: string, newValue: number) => void;
}> {
  render() {
    return (
      <FormWrapper>
        {this.renderField("Index", "index")}
        {this.renderField("Condition", "condition")}
        {this.renderField("Item ID", "number")}
        {this.renderField("Fixation Start", "fixation_start")}
        {this.renderField("Trial Duration", "time")}
      </FormWrapper>
    );
  }

  renderField(
    label: string,
    id: "index" | "condition" | "number" | "fixation_start" | "time"
  ) {
    return (
      <NumberInput
        label={label}
        id={id}
        units={""}
        value={this.props.config.da1_fields[id]}
        onValueChange={value =>
          this.props.updateConfig(`da1_fields.${id}`, value || 0)
        }
      />
    );
  }
}
