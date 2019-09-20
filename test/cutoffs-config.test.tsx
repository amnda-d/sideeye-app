import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import { CutoffsConfigInput } from "renderer/config/cutoffs";
import { expectFormInput, expectFormSwitch } from "test/utils";

describe("ASC Configuration Input", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<CutoffsConfigInput />);
  });

  it("displays the min field", () =>
    expectFormInput(wrapper, "min", "Fixation Minimum Cutoff", "-1"));

  it("displays the max field", () =>
    expectFormInput(wrapper, "max", "Fixation Maximim Cutoff", "-1"));

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
