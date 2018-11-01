import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter, Route, IndexRoute, Link } from "react-router";

import getRequest from "renderer/get_request";

const SideEye = () => (
  <div>
    <button
      onClick={() =>
        getRequest(`http://localhost:3001/test`).then(r => {
          console.log(r);
          document.getElementById("dynamic").innerHTML = r.test;
        })
      }
    >
      dsfasdf
    </button>
    <p id="dynamic" />
  </div>
);

const App = () => (
  <MemoryRouter>
    <Route exact path="/" component={SideEye} />
  </MemoryRouter>
);

export default App;
