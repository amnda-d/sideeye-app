import * as React from "react";
import { FileInput } from "@blueprintjs/core";
import { map, last } from "lodash";
import styled from "styled-components";

export class DA1ASCFileInput extends React.Component<
  { updateAppState: (state: {}) => void; files: string[] },
  {
    error: string | null;
  }
> {
  state = { error: null };
  async processFiles(newFiles: FileList) {
    try {
      this.props.updateAppState({
        da1AscFiles: map(newFiles, f => f.path)
      });
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  render() {
    return (
      <Wrapper>
        <StyledFileInput
          text="Choose DA1/ASC Files..."
          inputProps={{ multiple: true }}
          onInputChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.files && (await this.processFiles(e.target.files))
          }
        />
        {this.state.error && <ErrorText>{this.state.error}</ErrorText>}
        {this.props.files.length > 0 && (
          <FileList>
            {map(this.props.files, f => (
              <li key={f}>{last(f.split("/"))}</li>
            ))}
          </FileList>
        )}
      </Wrapper>
    );
  }
}

const FileList = styled.ol`
  li {
    font-size: 14px;
    font-weight: bold;
  }
`;

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
`;

export const ErrorText = styled.div``;
