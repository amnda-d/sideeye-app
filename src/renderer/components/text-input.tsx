import * as React from "react";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import styled from "styled-components";

export const TextInput = (props: {
  label: string;
  id: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <FormGroup label={props.label}>
    <StyledInputGroup
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  </FormGroup>
);

const StyledInputGroup = styled(InputGroup)`
  width: 300px;
`;
