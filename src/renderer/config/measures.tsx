import * as React from "react";
import { Checkbox } from "@blueprintjs/core";
import { map, get } from "lodash";
import styled from "styled-components";
import { FormWrapper } from "renderer/config";
import { colors } from "renderer/colors";
import { NumberInput } from "renderer/components/number-input";
import { TextInput } from "renderer/components/text-input";
import { SwitchInput } from "renderer/components/switch-input";
import { Config } from "renderer/config/default-config";

const regionMeasures = {
  "region_measures.skip": "Skip",
  "region_measures.first_pass_regressions_out": "First Pass Regressions Out",
  "region_measures.first_pass_regressions_in": "First Pass Regressions In",
  "region_measures.first_fixation_duration": "First Fixation Duration",
  "region_measures.single_fixation_duration": "Single Fixation Duration",
  "region_measures.first_pass": "First Pass Total Time",
  "region_measures.go_past": "Go-past Time",
  "region_measures.total_time": "Total Time",
  "region_measures.right_bounded_time": "Right-bounded Time",
  "region_measures.reread_time": "Reread Time",
  "region_measures.second_pass": "Second Pass Time",
  "region_measures.spillover_time": "Spillover Time",
  "region_measures.refixation_time": "Refixation Time",
  "region_measures.landing_position": "Landing Position",
  "region_measures.launch_site": "Launch Site",
  "region_measures.first_pass_fixation_count": "First Pass Fixation Count",
  "region_measures.go_back_time_region": "Go-back Time (by region)",
  "region_measures.go_back_time_char": "Go-back Time (by character)"
};

const trialMeasures = {
  "trial_measures.location_first_regression": "Location of First Regression",
  "trial_measures.latency_first_regression": "Latency of First Regression",
  "trial_measures.fixation_count": "Fixation Count",
  "trial_measures.percent_regressions": "Percent Regressions",
  "trial_measures.trial_total_time": "Trial Total Time",
  "trial_measures.average_forward_saccade": "Average Forward Saccade Duration",
  "trial_measures.average_backward_saccade": "Average Backward Saccade Duration"
};

export class MeasuresConfigInput extends React.Component<{
  config: Config;
  updateConfig: (key: string, newValue: number | boolean | string) => void;
}> {
  render() {
    return (
      <FormWrapper>
        <Wrapper>
          {map(regionMeasures, (label, id) => this.renderMeasure(label, id))}
          {map(trialMeasures, (label, id) => this.renderMeasure(label, id))}
        </Wrapper>
      </FormWrapper>
    );
  }

  renderMeasure(label: string, id: string) {
    const excluded = get(this.props.config, `${id}.exclude`) || false;
    const use_cutoff = get(this.props.config, `${id}.use_cutoff`) || false;
    return (
      <MeasureWrapper key={id}>
        <Checkbox
          label={label}
          id={id}
          checked={!excluded}
          onChange={() => this.props.updateConfig(`${id}.exclude`, !excluded)}
        />
        {!excluded && (
          <MeasureConfig>
            <TextInput
              label="Output Header"
              id={`${id}.header`}
              placeholder={id.split(".")[1]}
              value={get(this.props.config, `${id}.header`) || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.props.updateConfig(`${id}.header`, e.target.value)
              }
            />
            <SwitchInput
              label="Use cutoff?"
              id={`${id}.use_cutoff`}
              checked={get(this.props.config, `${id}.use_cutoff`) || false}
              onChange={() =>
                this.props.updateConfig(`${id}.use_cutoff`, !use_cutoff)
              }
            />
            {use_cutoff && (
              <NumberInput
                label="Cutoff value"
                id={`${id}.cutoff`}
                units="ms"
                value={get(this.props.config, `${id}.cutoff`) || 0}
                onValueChange={value =>
                  this.props.updateConfig(`${id}.cutoff`, value || 0)
                }
              />
            )}
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
