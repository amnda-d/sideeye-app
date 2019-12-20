import * as React from "react";
import styled from "styled-components";
import { RegionFileInput } from "renderer/region-file";
import { DA1ASCFileInput } from "renderer/da1-asc-file";
import { ConfigInput } from "renderer/config";
import { CSVDownload } from "renderer/csv-download";
import { Config, defaultConfig } from "renderer/config/default-config";
import { Navigation } from "renderer/navigation";
import { Title } from "renderer/title";
import { colors } from "renderer/colors";

// import getRequest from "renderer/get_request";

// class SideEye extends React.Component<{}, { test: ?string }> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       test: null,
//     };
//   }
//
//   render() {
//     return (
//       <div>
//         <button
//           onClick={() =>
//             getRequest(`http://localhost:3001/test`).then(r =>
//               this.setState({ test: r.test }),
//             )
//           }
//         >
//           dsfasdf
//         </button>
//         <p>{this.state.test}</p>
//       </div>
//     );
//   }
// }

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
        <Navigation updatePage={page => this.setState({ page })} />
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
        {this.state.regionFilePath &&
          this.state.config &&
          this.state.da1AscFiles.length > 0 && <CSVDownload />}
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
