import * as React from "react";
import {
  FormGroup,
  Checkbox,
  NumericInput,
  InputGroup,
  Switch
} from "@blueprintjs/core";
import { map, set, get } from "lodash";
import { FormWrapper } from "renderer/config";

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

export class MeasuresConfigInput extends React.Component<
  {},
  {
    configFile: { [key: string]: any };
  }
> {
  constructor(props: {}) {
    super(props);

    const existingRegionConfig = JSON.parse(
      localStorage.getItem("region_measures") || "{}"
    );
    const existingTrialConfig = JSON.parse(
      localStorage.getItem("trial_measures") || "{}"
    );

    this.state = {
      configFile: {
        region_measures: {
          skip: existingRegionConfig.skip || {},
          first_pass_regressions_out:
            existingRegionConfig.first_pass_regressions_out || {},
          first_pass_regressions_in:
            existingRegionConfig.first_pass_regressions_in || {},
          first_fixation_duration:
            existingRegionConfig.first_fixation_duration || {},
          single_fixation_duration:
            existingRegionConfig.single_fixation_duration || {},
          first_pass: existingRegionConfig.first_pass || {},
          go_past: existingRegionConfig.go_past || {},
          total_time: existingRegionConfig.total_time || {},
          right_bounded_time: existingRegionConfig.right_bounded_time || {},
          reread_time: existingRegionConfig.reread_time || {},
          second_pass: existingRegionConfig.second_pass || {},
          spillover_time: existingRegionConfig.spillover_time || {},
          refixation_time: existingRegionConfig.refixation_time || {},
          landing_position: existingRegionConfig.landing_position || {},
          launch_site: existingRegionConfig.launch_site || {},
          first_pass_fixation_count:
            existingRegionConfig.first_pass_fixation_count || {},
          go_back_time_region: existingRegionConfig.go_back_time_region || {},
          go_back_time_char: existingRegionConfig.go_back_time_char || {}
        },
        trial_measures: {
          location_first_regression:
            existingTrialConfig.location_first_regression || {},
          latency_first_regression:
            existingTrialConfig.latency_first_regression || {},
          fixation_count: existingTrialConfig.fixation_count || {},
          percent_regressions: existingTrialConfig.percent_regressions || {},
          trial_total_time: existingTrialConfig.trial_total_time || {},
          average_forward_saccade:
            existingTrialConfig.average_forward_saccade || {},
          average_backward_saccade:
            existingTrialConfig.average_backward_saccade || {}
        }
      }
    };
  }

  componentWillUnmount() {
    localStorage.setItem(
      "region_measures",
      JSON.stringify(this.state.configFile.region_measures)
    );
    localStorage.setItem(
      "trial_measures",
      JSON.stringify(this.state.configFile.trial_measures)
    );
  }

  render() {
    return (
      <FormWrapper>
        {map(regionMeasures, (label, id) => this.renderMeasure(label, id))}
        {map(trialMeasures, (label, id) => this.renderMeasure(label, id))}
      </FormWrapper>
    );
  }

  renderMeasure(label: string, id: string) {
    const excluded = get(this.state, `configFile.${id}.exclude`) || false;
    return (
      <FormGroup key={id}>
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
          <div>
            {this.renderTextField(
              "Output Header",
              `configFile.${id}.header`,
              id.split(".")[1]
            )}
            {this.renderSwitch("Use cutoff?", `configFile.${id}.use_cutoff`)}
            {get(this.state, `configFile.${id}.use_cutoff`) &&
              this.renderField("Cutoff value", `configFile.${id}.cutoff`)}
          </div>
        )}
      </FormGroup>
    );
  }

  renderField(label: string, id: string) {
    return (
      <FormGroup inline label={label}>
        <NumericInput
          large
          id={id}
          placeholder="None"
          value={get(this.state, id)}
          onValueChange={value => {
            this.setState(set(this.state, id, value), () =>
              console.log(this.state)
            );
          }}
        />
      </FormGroup>
    );
  }

  renderTextField(label: string, id: string, placeholder: string = "") {
    return (
      <FormGroup inline label={label}>
        <InputGroup
          large
          id={id}
          placeholder={placeholder}
          value={get(this.state, id) || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState(set(this.state, id, e.target.value));
          }}
        />
      </FormGroup>
    );
  }

  renderSwitch(label: string, id: string) {
    const checked = get(this.state, id);
    return (
      <FormGroup inline label={label}>
        <Switch
          large
          id={id}
          checked={checked || false}
          onChange={() => {
            this.setState(set(this.state, id, checked ? !checked : true));
          }}
        />
      </FormGroup>
    );
  }
}
