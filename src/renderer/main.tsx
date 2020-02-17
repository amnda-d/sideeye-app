import * as React from "react";
import download from "downloadjs";
import axios from "axios";
import styled from "styled-components";
import { RegionFileInput } from "renderer/region-file";
import { DA1ASCFileInput } from "renderer/da1-asc-file";
import { ConfigInput } from "renderer/config";
import { CSVDownload } from "renderer/csv-download";
import { Config, defaultConfig } from "renderer/config/default-config";
import { Navigation } from "renderer/navigation";
import { Title } from "renderer/title";
import { colors } from "renderer/colors";

export type AppConfig = {
  page: string;
  regionFilePath: string | null;
  regionFile: string | null;
  regionFileName: string;
  config: Config;
  configFileName: string | null;
  da1AscFiles: string[];
};

class App extends React.Component<{}, AppConfig> {
  state = {
    page: "/",
    regionFilePath: null,
    regionFileName: "",
    regionFile: null,
    config: defaultConfig,
    configFileName: null,
    da1AscFiles: []
  };

  render() {
    return (
      <Wrapper>
        <Navigation
          regionDone={this.state.regionFilePath != null}
          configDone={this.state.config != null}
          filesDone={this.state.da1AscFiles.length > 0}
          updatePage={page => this.setState({ page })}
        />
        {this.state.page === "/" && <Title />}
        {this.state.page === "/region" && (
          <RegionFileInput
            updateAppState={state => this.setState({ ...this.state, ...state })}
            regionFile={this.state.regionFile}
            regionFilePath={this.state.regionFilePath}
            regionFileName={this.state.regionFileName}
          />
        )}
        {this.state.page === "/config" && (
          <ConfigInput
            updateAppState={state => this.setState({ ...this.state, ...state })}
            config={this.state.config}
            configFileName={this.state.configFileName}
          />
        )}
        {this.state.page === "/da1_asc" && (
          <DA1ASCFileInput
            updateAppState={state => this.setState({ ...this.state, ...state })}
            files={this.state.da1AscFiles}
          />
        )}
        <CSVDownload
          disabled={
            !(
              this.state.regionFilePath &&
              this.state.config &&
              this.state.da1AscFiles.length > 0
            )
          }
          onClick={async () => {
            const resp = await axios.post("http://localhost:3001/sideeye", {
              region_file: this.state.regionFilePath,
              config: this.state.config,
              files: this.state.da1AscFiles
            });
            download(resp.data, "out.csv", "test/csv");
          }}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  color: ${colors.text};
  background-color: ${colors.background};
  width: 100vw;
  min-height: 100vh;
  height: max-content;
`;

export default App;
