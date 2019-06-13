import React from "react";
// import ReactDOM from "react-dom";
import { MemoryRouter, Route } from "react-router";
import styled from "styled-components";
import { RegionInput } from "renderer/region-input";
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

const App = () => (
  <MemoryRouter>
    <Wrapper>
      <Route exact path="/" component={RegionInput} />
    </Wrapper>
  </MemoryRouter>
);

const Wrapper = styled.div`
  color: ${colors.text};
  background-color: ${colors.white};
  width: 100vw;
  height: 100vh;
`;

export default App;
