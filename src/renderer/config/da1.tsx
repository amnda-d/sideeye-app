import * as React from "react";
import { FormGroup, NumericInput } from "@blueprintjs/core";
import styled from "styled-components";

export class DA1ConfigInput extends React.Component<
  {},
  {
    configFile: { [key: string]: any };
  }
> {
  constructor(props: {}) {
    super(props);

    const existingConfig = JSON.parse(
      localStorage.getItem("da1_fields") || "{}"
    );

    this.state = {
      configFile: {
        index: existingConfig.index || 0,
        condition: existingConfig.condition || 1,
        number: existingConfig.number || 2,
        fixation_start: existingConfig.fixation_start || 8,
        time: existingConfig.time || -1
      }
    };
  }

  componentWillUnmount() {
    localStorage.setItem("da1_fields", JSON.stringify(this.state.configFile));
  }

  render() {
    return (
      <Wrapper>
        <FormGroup label="DA1 Fields">
          {this.renderField("Index", "index")}
          {this.renderField("Condition", "condition")}
          {this.renderField("Item ID", "number")}
          {this.renderField("Fixation Start", "fixation_start")}
          {this.renderField("Trial Duration", "time")}
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
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;