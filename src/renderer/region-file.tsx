import * as React from "react";
import { FileInput } from "@blueprintjs/core";
import { readAsText } from "promise-file-reader";
import styled from "styled-components";

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
      // await axios.post("http://localhost:3001/sideeye", { file: newFile.path });
      // let form = new FormData();
      // form.append("file", newFile);
      // // form.append("test", "test");
      // const formData = {
      //   testfile: fs.createReadStream(newFile.path),
      //   test: "test"
      // };
      // await request.post("http://localhost:3001/sideeye", {
      //   file: newFile.path
      // });
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
