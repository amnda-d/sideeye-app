// @flow
import * as React from 'react';
import styled from 'styled-components';
import { colors } from 'renderer/colors';

export const Button = (props?: { text: string }) => (
  <StyledButton {...props}>{props && props.text}</StyledButton>
);

const StyledButton = styled.div`
  height: 40px;
  line-height: 40px;
  width: 140px;
  background-color: ${colors.green};
  cursor: pointer;
  border-radius: 3px;
  margin: 0 auto;
  align-self: center;
  text-align: center;
  font-weight: bold;

  &:hover {
    background-color: ${colors.lightGreen};
  }
`;
