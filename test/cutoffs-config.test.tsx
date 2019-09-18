import * as React from "react";
import { FormGroup } from "@blueprintjs/core";
import { mount, ReactWrapper } from "enzyme";
import { CutoffsConfigInput } from "renderer/config/cutoffs";
import { expectToExist, expectFormInput, expectFormSwitch } from "test/utils";

describe("ASC Configuration Input", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<CutoffsConfigInput />);
  });

  it("displays the Cutoffs fields", () =>
    expectToExist(
      wrapper
        .find(FormGroup)
        .filterWhere(e => e.prop("label") === "Fixation and Saccade Cutoffs")
    ));

  it("displays the min field", () =>
    expectFormInput(wrapper, "min", "Fixation Minimum Cutoff (ms)", "-1"));

  it("displays the max field", () =>
    expectFormInput(wrapper, "max", "Fixation Maximim Cutoff (ms)", "-1"));

  it("displays the include_fixation field", () =>
    expectFormSwitch(
      wrapper,
      "include_fixation",
      "Include cutoff fixations in calculated measures?",
      false
    ));

  it("displays the include_saccades field", () =>
    expectFormSwitch(
      wrapper,
      "include_saccades",
      "Include cutoff saccades in calculated measures?",
      false
    ));
});
