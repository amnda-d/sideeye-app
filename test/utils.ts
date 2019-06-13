import { ISelectProps } from "@blueprintjs/select";
import * as React from "react";
import { ReactWrapper } from "enzyme";
import { some, isArray } from "lodash";
import { StyledComponent } from "styled-components";

export function expectToExist(element: ReactWrapper<any>): void {
  expect(element.exists()).toEqual(true);
}

export async function selectDropdownValue(
  wrapper: ReactWrapper,
  select: ReactWrapper<any>,
  value: any
): Promise<void> {
  const selectProps = select.props() as ISelectProps<any>;
  selectProps.onItemSelect(value);
  await waitForUpdate(wrapper);
}

export async function waitForComponent(
  parent: ReactWrapper,
  components:
    | React.ComponentClass<any>
    | Array<React.ComponentClass<any> | StyledComponent<any, any>>
    | StyledComponent<any, any>,
  timeout = 4000
): Promise<void> {
  components = isArray(components) ? components : [components];
  await parent.update();
  if (some(components, component => parent.find(component).exists())) {
    return;
  }
  if (timeout <= 0) {
    throw new Error(`timeout waiting to redirect to component`);
  }
  await wait(100);
  return await waitForComponent(parent, components, timeout - 100);
}

export function wait(milliSeconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliSeconds));
}

export async function waitForUpdate(application: ReactWrapper<any>, time = 0) {
  await wait(time);
  await application.update();
}
