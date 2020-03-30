import * as React from "react";
import { Checkbox, Radio, RadioGroup } from "@blueprintjs/core";
import { map, get } from "lodash";
import styled from "styled-components";
import { FormWrapper } from "renderer/config";
import { Config } from "renderer/config/default-config";
import { colors } from "renderer/colors";
import { TextInput } from "renderer/components/text-input";

const columns = {
  experiment_name: "Experiment Name",
  filename: "Filename",
  date: "Date",
  trial_id: "Trial ID",
  trial_total_time: "Trial Total Time",
  item_id: "Item ID",
  item_condition: "Item Condition",
  region_label: "Region Label",
  region_number: "Region Number",
  region_text: "Region Text",
  region_start: "Region Start",
  region_end: "Region End",
  value: "Value"
};

export class OutputFileConfigInput extends React.Component<{
  config: Config;
  updateConfig: (key: string, newValue: boolean | string) => void;
}> {
  render() {
    return (
      <FormWrapper>
        <Wrapper>
          <RadioGroup
            label="Output Format"
            onChange={() =>
              this.props.updateConfig(
                `wide_format`,
                !get(this.props.config, `wide_format`) || false
              )
            }
            selectedValue={
              get(this.props.config, `wide_format`, false).toString() || "false"
            }
          >
            <Radio label="Wide" value="true" />
            <Radio label="Long" value="false" />
          </RadioGroup>
          {map(columns, (label, id) => this.renderColumn(label, id))}
        </Wrapper>
      </FormWrapper>
    );
  }

  renderColumn(label: string, id: string) {
    const excluded =
      get(this.props.config, `output_columns.${id}.exclude`) || false;
    return (
      <MeasureWrapper key={id}>
        <Checkbox
          label={label}
          id={id}
          checked={!excluded}
          onChange={() =>
            this.props.updateConfig(`output_columns.${id}.exclude`, !excluded)
          }
        />
        {!excluded && (
          <MeasureConfig>
            <TextInput
              label="Output Header"
              id={`${id}.header`}
              placeholder={id}
              value={
                get(this.props.config, `output_columns.${id}.header`) || ""
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.props.updateConfig(
                  `output_columns.${id}.header`,
                  e.target.value
                )
              }
            />
          </MeasureConfig>
        )}
      </MeasureWrapper>
    );
  }
}

const MeasureWrapper = styled.div`
  border-radius: 3px;
  padding: 10px;
  width: 100%;

  .bp3-checkbox {
    margin: 0;
    width: fit-content;
  }
`;

const Wrapper = styled.div`
  width: 100%;

  ${MeasureWrapper}:nth-child(odd) {
    background-color: ${colors.background};
  }

  ${MeasureWrapper}:nth-child(even) {
    background-color: ${colors.lightGray};
  }
`;

const MeasureConfig = styled.div`
  display: flex;
  margin: 5px 0 5px 20px;

  .bp3-form-group {
    padding-right: 20px;
    margin-bottom: 0;
  }
`;
