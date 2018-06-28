import React from 'react';
import ReactDOM from 'react-dom';

import GetRequest from 'renderer/get_request';

const App = () =>
  <div>
    <button onClick={() => GetRequest(`http://localhost:5000/test`).then(r => {
      console.log(r)
      document.getElementById("dynamic").innerHTML = r
    })}>dsfasdf</button>
    <p id="dynamic"></p>
  </div>;

export default App;
