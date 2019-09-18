import * as React from "react";
import { ASCConfigInput } from "renderer/config/asc";
import { DA1ConfigInput } from "renderer/config/da1";
import { RegionConfigInput } from "renderer/config/region";
import { FileConfigInput } from "renderer/config/file";

export class ConfigInput extends React.Component {
  state = {
    displayConfig: false,
    displayRegion: false,
    displayDA1: false,
    displayASC: false
  };

  render() {
    return (
      <div>
        <FileConfigInput />
        <button onClick={() => this.setState({ displayConfig: true })}>
          Create New Configuration
        </button>
        {this.state.displayConfig && (
          <div>
            <div
              onClick={() =>
                this.setState({ displayRegion: !this.state.displayRegion })
              }
            >
              Region Configuration
            </div>
            {this.state.displayRegion && <RegionConfigInput />}
            <div
              onClick={() =>
                this.setState({ displayDA1: !this.state.displayDA1 })
              }
            >
              DA1 Configuration
            </div>
            {this.state.displayDA1 && <DA1ConfigInput />}
            <div
              onClick={() =>
                this.setState({ displayASC: !this.state.displayASC })
              }
            >
              ASC Parsing Configuration
            </div>
            {this.state.displayASC && <ASCConfigInput />}
          </div>
        )}
      </div>
    );
  }
}
