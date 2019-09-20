import * as React from "react";
import { Checkbox } from "@blueprintjs/core";
import { map, set, get } from "lodash";
import styled from "styled-components";
import { FormWrapper } from "renderer/config";
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
  region_end: "Region End"
};

export class OutputFileConfigInput extends React.Component<
  {},
  {
    configFile: { [key: string]: any };
  }
> {
  constructor(props: {}) {
    super(props);

    const existingOutputConfig = JSON.parse(
      localStorage.getItem("output_columns") || "{}"
    );

    this.state = {
      configFile: {
        experiment_name: existingOutputConfig.experiment_name || {},
        filename: existingOutputConfig.filename || { exclude: true },
        date: existingOutputConfig.date || { exclude: true },
        trial_id: existingOutputConfig.trial_id || {},
        trial_total_time: existingOutputConfig.trial_total_time || {},
        item_id: existingOutputConfig.item_id || {},
        item_condition: existingOutputConfig.item_condition || {},
        region_label: existingOutputConfig.region_label || { exclude: true },
        region_number: existingOutputConfig.region_number || {},
        region_text: existingOutputConfig.region_text || { exclude: true },
        region_start: existingOutputConfig.region_start || { exclude: true },
        region_end: existingOutputConfig.region_end || { exclude: true }
      }
    };
  }

  componentWillUnmount() {
    localStorage.setItem(
      "output_columns",
      JSON.stringify(this.state.configFile)
    );
  }

  render() {
    return (
      <FormWrapper>
        <Wrapper>
          {map(columns, (label, id) => this.renderColumn(label, id))}
        </Wrapper>
      </FormWrapper>
    );
  }

  renderColumn(label: string, id: string) {
    const excluded = get(this.state, `configFile.${id}.exclude`) || false;
    return (
      <MeasureWrapper key={id}>
        <Checkbox
          label={label}
          id={id}
          checked={!excluded}
          onChange={() => {
            this.setState(
              set(this.state, `configFile.${id}.exclude`, !excluded)
            );
          }}
        />
        {!excluded && (
          <MeasureConfig>
            <TextInput
              label="Output Header"
              id={`configFile.${id}.header`}
              placeholder={id}
              value={get(this.state, `configFile.${id}.header`) || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState(
                  set(this.state, `configFile.${id}.header`, e.target.value)
                );
              }}
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

  .bp3-checkbox {
    margin: 0;
    width: fit-content;
  }
`;

const Wrapper = styled.div`
  ${MeasureWrapper}:nth-child(even) {
    background-color: ${colors.background};
  }

  ${MeasureWrapper}:nth-child(odd) {
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
