import * as React from "react";
import { FormGroup, Switch } from "@blueprintjs/core";

export const SwitchInput = (props: {
  label: string;
  id: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <FormGroup label={props.label}>
    <Switch id={props.id} checked={props.checked} onChange={props.onChange} />
  </FormGroup>
);
