import * as React from "react";
import { FileInput } from "@blueprintjs/core";
import { readAsText } from "promise-file-reader";
import styled from "styled-components";

export class RegionFileInput extends React.Component<
  {},
  {
    regionFile: string | null;
    name: string | null;
    error: string | null;
  }
> {
  state = { regionFile: null, name: null, error: null };
  async processNewFile(newFile: File) {
    try {
      console.log(newFile);
      const regionFile = await readAsText(newFile);
      this.setState({ regionFile, name: newFile.name });
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  render() {
    return (
      <Wrapper>
        <StyledFileInput
          text={this.state.name || "Choose Region File..."}
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
