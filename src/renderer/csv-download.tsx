import * as React from "react";
import styled from "styled-components";
import { colors } from "renderer/colors";

export const CSVDownload = (props: {
  onClick: () => void;
  disabled: boolean;
}) => <CSVButton {...props}>Download CSV</CSVButton>;

const CSVButton = styled.button`
  background-color: ${props =>
    props.disabled ? colors.lightGray : colors.navigation};
  color: ${colors.background};
  position: absolute;
  top: 0;
  right: 0;
  flex-direction: column;
  padding: 10px;
  font-size: 20px;
  margin: 5px;
  border-radius: 5px;
`;
