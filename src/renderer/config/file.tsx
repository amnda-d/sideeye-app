import * as React from "react";
import { FileInput } from "@blueprintjs/core";
import { readAsText } from "promise-file-reader";
import { mapValues } from "lodash";
import styled from "styled-components";

export class FileConfigInput extends React.Component<
  {},
  {
    configFile: { [key: string]: any };
    error: string | null;
  }
> {
  constructor(props: {}) {
    super(props);

    const da1_config = JSON.parse(localStorage.getItem("da1_config") || "{}");
    const region_config = JSON.parse(
      localStorage.getItem("region_config") || "{}"
    );
    const asc_parsing = JSON.parse(localStorage.getItem("asc_parsing") || "{}");
    const cutoffs = JSON.parse(localStorage.getItem("cutoffs") || "{}");
    const region_measures = JSON.parse(
      localStorage.getItem("region_measures") || "{}"
    );
    const trial_measures = JSON.parse(
      localStorage.getItem("trial_measures") || "{}"
    );
    const output_columns = JSON.parse(
      localStorage.getItem("output_columns") || "{}"
    );

    this.state = {
      configFile: {
        da1_fields: {
          index: da1_config.index || 0,
          condition: da1_config.condition || 1,
          number: da1_config.number || 2,
          fixation_start: da1_config.fixation_start || 8,
          time: da1_config.time || -1
        },
        region_fields: {
          number: region_config.number || 0,
          condition: region_config.condition || 1,
          boundaries_start: region_config.boundaries_start || 3,
          includes_y: region_config.includes_y || false
        },
        asc_parsing: {
          blink_max_dur: asc_parsing.blink_max_dur || false,
          blink_max_count: asc_parsing.blink_max_count || false,
          max_saccade_dur: asc_parsing.max_saccade_dur || false,
          fixation_min_cutoff: asc_parsing.fixation_min_cutoff || false
        },
        cutoffs: {
          min: cutoffs.min || -1,
          max: cutoffs.max || -1,
          include_fixation: cutoffs.include_fixation || false,
          include_saccades: cutoffs.include_saccades || false
        },
        region_measures:
          mapValues(region_measures, measure_config => ({
            ...measure_config,
            use_cutoff: measure_config.cutoff ? true : false
          })) || {},
        trial_measures:
          mapValues(trial_measures, measure_config => ({
            ...measure_config,
            use_cutoff: measure_config.cutoff ? true : false
          })) || {},
        output_columns: output_columns || {}
      },
      error: null
    };
  }

  componentWillUnmount() {
    localStorage.setItem(
      "da1_fields",
      JSON.stringify(this.state.configFile.da1_fields)
    );
    localStorage.setItem(
      "region_fields",
      JSON.stringify(this.state.configFile.region_fields)
    );
    localStorage.setItem(
      "asc_parsing",
      JSON.stringify(this.state.configFile.asc_parsing)
    );
    localStorage.setItem(
      "cutoffs",
      JSON.stringify(this.state.configFile.cutoffs)
    );
    localStorage.setItem(
      "region_measures",
      JSON.stringify(this.state.configFile.region_measures)
    );
    localStorage.setItem(
      "trial_measures",
      JSON.stringify(this.state.configFile.trial_measures)
    );
    localStorage.setItem(
      "output_columns",
      JSON.stringify(this.state.configFile.output_columns)
    );
  }

  async processNewFile(newFile: File) {
    try {
      const configJSON = JSON.parse(await readAsText(newFile));
      this.setState({
        configFile: {
          da1_fields: {
            index: configJSON.da1_fields ? configJSON.da1_fields.index || 0 : 0,
            condition: configJSON.da1_fields
              ? configJSON.da1_fields.condition || 1
              : 1,
            number: configJSON.da1_fields
              ? configJSON.da1_fields.number || 2
              : 2,
            fixation_start: configJSON.da1_fields
              ? configJSON.da1_fields.fixation_start || 8
              : 8,
            time: configJSON.da1_fields ? configJSON.da1_fields.time || -1 : -1
          },
          region_fields: {
            number: configJSON.region_fields
              ? configJSON.region_fields.number || 0
              : 0,
            condition: configJSON.region_fields
              ? configJSON.region_fields.condition || 1
              : 1,
            boundaries_start: configJSON.region_fields
              ? configJSON.region_fields.boundaries_start || 3
              : 3,
            includes_y: configJSON.region_fields
              ? configJSON.region_fields.includes_y || false
              : false
          },
          asc_parsing: {
            blink_max_dur: configJSON.asc_parsing
              ? configJSON.asc_parsing.blink_max_dur || false
              : false,
            blink_max_count: configJSON.asc_parsing
              ? configJSON.asc_parsing.blink_max_count || false
              : false,
            max_saccade_dur: configJSON.asc_parsing
              ? configJSON.asc_parsing.max_saccade_dur || false
              : false,
            fixation_min_cutoff: configJSON.asc_parsing
              ? configJSON.asc_parsing.fixation_min_cutoff || false
              : false
          },
          cutoffs: {
            min: configJSON.cutoffs ? configJSON.cutoffs.min || -1 : -1,
            max: configJSON.cutoffs ? configJSON.cutoffs.max || -1 : -1,
            include_fixation: configJSON.cutoffs
              ? configJSON.cutoffs.include_fixation || false
              : false,
            include_saccades: configJSON.cutoffs
              ? configJSON.cutoffs.include_saccades || false
              : false
          },
          region_measures:
            mapValues(configJSON.region_measures, measure_config => ({
              ...measure_config,
              use_cutoff: measure_config.cutoff ? true : false
            })) || {},
          trial_measures:
            mapValues(configJSON.trial_measures, measure_config => ({
              ...measure_config,
              use_cutoff: measure_config.cutoff ? true : false
            })) || {},
          output_columns: configJSON.output_columns || {}
        },
        error: null
      });
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  render() {
    return (
      <Wrapper>
        <StyledFileInput
          text="Choose Configuration File..."
          onInputChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.files && (await this.processNewFile(e.target.files[0]))
          }
        />
        {this.state.error && <ErrorText>{this.state.error}</ErrorText>}
      </Wrapper>
    );
  }
}

const StyledFileInput = styled(FileInput)`
  margin: 0 auto;
  align-self: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
`;

export const ErrorText = styled.div``;
