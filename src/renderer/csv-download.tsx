import * as React from "react";
import styled from "styled-components";
import { colors } from "renderer/colors";

export const CSVDownload = (props: { onClick: () => void }) => (
  <CSVButton {...props}>Download CSV</CSVButton>
);

const CSVButton = styled.button`
  background-color: ${colors.navigation};
  flex-direction: column;
  padding: 10px;
  font-size: 20px;
  margin: 5px;
  border-radius: 5px;
`;
