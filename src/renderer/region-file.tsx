import * as React from "react";
import { FileInput, TextArea } from "@blueprintjs/core";
import { readAsText } from "promise-file-reader";
import styled from "styled-components";
import { colors } from "renderer/colors";

export class RegionFileInput extends React.Component<
  {
    updateAppState: (state: {}) => void;
    regionFile: string | null;
    regionFileName: string | null;
    regionFilePath: string | null;
  },
  {
    error: string | null;
  }
> {
  state = { error: null };
  async processNewFile(newFile: File) {
    try {
      const regionFile = await readAsText(newFile);
      const regionFilePath = newFile.path;
      this.props.updateAppState({
        regionFile,
        regionFileName: newFile.name,
        regionFilePath
      });
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  render() {
    return (
      <Wrapper>
        <StyledFileInput
          text={this.props.regionFileName || "Choose Region File..."}
          onInputChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.files && (await this.processNewFile(e.target.files[0]))
          }
        />
        {this.state.error && <ErrorText>{this.state.error}</ErrorText>}
        {this.props.regionFile && (
          <TextArea
            disabled
            value={this.props.regionFile.replace(/  +/g, "\t")}
          />
        )}
      </Wrapper>
    );
  }
}

const StyledFileInput = styled(FileInput)`
  align-self: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  justify-content: center;
  align-items: center;
  width: 100vw;

  textarea.bp3-input {
    min-width: 75%;
    height: 75%;
    cursor: default;
    font-family: monospace;
    margin: 20px 0;
    color: ${colors.text};
    background-color: ${colors.lightGray};
  }
`;

export const ErrorText = styled.div``;
