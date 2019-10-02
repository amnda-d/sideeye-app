import * as React from "react";
import styled from "styled-components";
import { RegionFileInput } from "renderer/region-file";
import { DA1ASCFileInput } from "renderer/da1-asc-file";
import { ConfigInput } from "renderer/config";
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

class App extends React.Component<{}, { page: string }> {
  state = {
    page: "/"
  };

  render() {
    return (
      <Wrapper>
        <Navigation updatePage={page => this.setState({ page })} />
        {this.state.page === "/" && <Title />}
        {this.state.page === "/region" && <RegionFileInput />}
        {this.state.page === "/config" && <ConfigInput />}
        {this.state.page === "/da1_asc" && <DA1ASCFileInput />}
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
