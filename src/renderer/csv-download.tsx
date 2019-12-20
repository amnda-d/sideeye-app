import * as React from "react";
import styled from "styled-components";
import { colors } from "renderer/colors";

export class CSVDownload extends React.Component {
  render() {
    return <CSVButton>Download CSV</CSVButton>;
  }
}

const CSVButton = styled.div`
  background-color: ${colors.navigation};
  flex-direction: column;
  padding: 10px;
  font-size: 20px;
  margin: 5px;
  border-radius: 5px;
`;
