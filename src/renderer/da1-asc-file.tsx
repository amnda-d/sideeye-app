import * as React from "react";
import { FileInput } from "@blueprintjs/core";
import { map } from "lodash";
import { readAsText } from "promise-file-reader";
import styled from "styled-components";

export class DA1ASCFileInput extends React.Component<
  {},
  {
    filenames: string[];
    files: string[];
    error: string | null;
  }
> {
  state = { files: [], filenames: [], error: null };
  async processFiles(newFiles: FileList) {
    try {
      this.setState({
        filenames: map(newFiles, f => f.name),
        files: await Promise.all(map(newFiles, async f => await readAsText(f)))
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
        {this.state.filenames.length > 0 &&
          map(this.state.filenames, f => <div key={f}>{f}</div>)}
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
