import * as React from "react";
import { FormGroup, NumericInput } from "@blueprintjs/core";
import styled from "styled-components";
import { colors } from "renderer/colors";

export const NumberInput = (props: {
  label: string;
  id: string;
  value: string;
  onValueChange: (value: number) => void;
  units: string;
}) => (
  <FormGroup inline label={props.label}>
    <StyledNumericInput
      id={props.id}
      rightElement={
        props.units ? <NumberLabel>{props.units}</NumberLabel> : undefined
      }
      buttonPosition="none"
      placeholder={"0"}
      value={props.value}
      onValueChange={props.onValueChange}
    />
  </FormGroup>
);

const StyledNumericInput = styled(NumericInput)`
  .bp3-input-group {
    width: 100px;
  }
`;

const NumberLabel = styled.div`
  line-height: 30px;
  color: ${colors.gray};
  padding-right: 8px;
`;
