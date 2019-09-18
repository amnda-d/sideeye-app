import * as React from "react";
import { FileInput } from "@blueprintjs/core";
import { readAsText } from "promise-file-reader";
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
          item: region_config.item || 0,
          condition: region_config.condition || 1,
          boundary: region_config.boundary || 3,
          includes_y: region_config.includes_y || false
        }
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
  }

  async processNewFile(newFile: File) {
    try {
      const configJSON = JSON.parse(await readAsText(newFile));
      this.setState({
        configFile: {
          da1_fields: {
            index: configJSON.da1_fields.index,
            condition: configJSON.da1_fields.condition,
            number: configJSON.da1_fields.number,
            fixation_start: configJSON.da1_fields.fixation_start,
            time: configJSON.da1_fields.time
          },
          region_fields: {
            number: configJSON.region_fields.number,
            condition: configJSON.region_fields.condition,
            boundaries_start: configJSON.region_fields.boundaries_start,
            includes_y: configJSON.region_fields.includes_y
          }
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
  height: 100vh;
`;

export const ErrorText = styled.div``;
