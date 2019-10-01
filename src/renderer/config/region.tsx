import * as React from "react";
import { FormWrapper } from "renderer/config";
import { NumberInput } from "renderer/components/number-input";
import { SwitchInput } from "renderer/components/switch-input";
import { Config } from "renderer/config/default-config";

export class RegionConfigInput extends React.Component<{
  config: Config;
  updateConfig: (key: string, newValue: number | boolean) => void;
}> {
  render() {
    return (
      <FormWrapper>
        {this.renderField("Condition", "condition")}
        {this.renderField("Item ID", "number")}
        {this.renderField("Boundary Start", "boundaries_start")}
        <SwitchInput
          label={"Includes Y Values"}
          id={"includes_y"}
          checked={this.props.config.region_fields.includes_y}
          onChange={() =>
            this.props.updateConfig(
              `region_fields.includes_y`,
              !this.props.config.region_fields.includes_y
            )
          }
        />
      </FormWrapper>
    );
  }

  renderField(label: string, id: "number" | "condition" | "boundaries_start") {
    return (
      <NumberInput
        label={label}
        id={id}
        units={""}
        value={this.props.config.region_fields[id]}
        onValueChange={value =>
          this.props.updateConfig(`region_fields.${id}`, value || 0)
        }
      />
    );
  }
}
