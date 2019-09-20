import * as React from "react";
import { FormWrapper } from "renderer/config";
import { NumberInput } from "renderer/components/number-input";
import { SwitchInput } from "renderer/components/switch-input";

export class RegionConfigInput extends React.Component<
  {},
  {
    configFile: { [key: string]: any };
  }
> {
  constructor(props: {}) {
    super(props);

    const existingConfig = JSON.parse(
      localStorage.getItem("region_fields") || "{}"
    );

    this.state = {
      configFile: {
        item: existingConfig.item || 0,
        condition: existingConfig.condition || 1,
        boundary: existingConfig.boundary || 3,
        includes_y: existingConfig.includes_y || false
      }
    };
  }

  componentWillUnmount() {
    localStorage.setItem(
      "region_fields",
      JSON.stringify(this.state.configFile)
    );
  }

  render() {
    return (
      <FormWrapper>
        {this.renderField("Condition", "condition")}
        {this.renderField("Item ID", "item")}
        {this.renderField("Boundary Start", "boundary")}
        <SwitchInput
          label={"Includes Y Values"}
          id={"includes_y"}
          checked={this.state.configFile.includes_y}
          onChange={() => {
            this.setState({
              configFile: {
                ...this.state.configFile,
                includes_y: !this.state.configFile.includes_y
              }
            });
          }}
        />
      </FormWrapper>
    );
  }

  renderField(label: string, id: string) {
    return (
      <NumberInput
        label={label}
        id={id}
        units=""
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
}
