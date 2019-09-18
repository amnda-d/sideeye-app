import * as React from "react";
import { FormGroup, NumericInput, Switch } from "@blueprintjs/core";
import styled from "styled-components";

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
      <Wrapper>
        <FormGroup label="Region File Fields">
          {this.renderField("Condition", "condition")}
          {this.renderField("Item ID", "item")}
          {this.renderField("Boundary Start", "boundary")}
          {this.renderSwitch("Includes Y Values", "includes_y")}
        </FormGroup>
      </Wrapper>
    );
  }

  renderField(label: string, id: string) {
    return (
      <FormGroup inline label={label}>
        <NumericInput
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;
