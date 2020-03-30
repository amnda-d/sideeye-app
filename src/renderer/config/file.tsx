import * as React from "react";
import { FileInput } from "@blueprintjs/core";
import { readAsText } from "promise-file-reader";
import { mapValues } from "lodash";
import styled from "styled-components";
import { Config, defaultConfig } from "renderer/config/default-config";

export class FileConfigInput extends React.Component<
  {
    config: Config;
    updateConfig: (state: {}) => void;
    fileName: string | null;
  },
  {
    error: string | null;
  }
> {
  state = { error: null };
  async processNewFile(newFile: File) {
    try {
      const configJSON = JSON.parse(await readAsText(newFile));
      this.props.updateConfig({
        configFileName: newFile.name,
        config: {
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
            })) || defaultConfig.region_measures,
          trial_measures:
            mapValues(configJSON.trial_measures, measure_config => ({
              ...measure_config,
              use_cutoff: measure_config.cutoff ? true : false
            })) || defaultConfig.trial_measures,
          output_columns:
            configJSON.output_columns || defaultConfig.output_columns
        }
      });
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  render() {
    return (
      <Wrapper>
        <StyledFileInput
          text={this.props.fileName || "Choose Configuration File..."}
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
