import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import { ASCConfigInput } from "renderer/config/asc";
import { defaultConfig } from "renderer/config/default-config";
import { expectFormInput } from "test/utils";

describe("ASC Configuration Input", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <ASCConfigInput
        config={defaultConfig}
        updateConfig={(key: string, value: number) => null}
      />
    );
  });

  it("displays the fixation_min_cutoff field", () =>
    expectFormInput(
      wrapper,
      "fixation_min_cutoff",
      "Fixation Minimum Cutoff",
      "0"
    ));

  it("displays the max_saccade_dur field", () =>
    expectFormInput(
      wrapper,
      "max_saccade_dur",
      "Maximum Saccade Duration",
      "0"
    ));

  it("displays the blink_max_count field", () =>
    expectFormInput(wrapper, "blink_max_count", "Maximum Blink Count", "0"));

  it("displays the blink_max_dur field", () =>
    expectFormInput(wrapper, "blink_max_dur", "Maximum Blink Duration", "0"));
});
