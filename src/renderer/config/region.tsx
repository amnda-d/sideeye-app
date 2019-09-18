import * as React from "react";
import { FormGroup, NumericInput, Switch } from "@blueprintjs/core";
import { FormWrapper } from "renderer/config";

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
        {this.renderSwitch("Includes Y Values", "includes_y")}
      </FormWrapper>
    );
  }

  renderField(label: string, id: string) {
    return (
      <FormGroup inline label={label}>
        <NumericInput
          large
          id={id}
          value={this.state.configFile[id]}
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
          large
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
      </FormGroup>
    );
  }
}
