import * as React from "react";
// import { DA1ConfigInput } from "renderer/config/da1";
// import { RegionConfigInput } from "renderer/config/region";
import { FileConfigInput } from "renderer/config/file";

export class ConfigInput extends React.Component {
  render() {
    return (
      <div>
        <FileConfigInput />
      </div>
    );
  }
}
