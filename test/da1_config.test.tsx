import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { set } from "lodash";
import { DA1ConfigInput } from "renderer/config/da1";
import { defaultConfig } from "renderer/config/default-config";
import { waitForUpdate, expectFormInput } from "test/utils";

describe("Parser Configuration Input", () => {
  let wrapper: ReactWrapper;
  let state = defaultConfig;

  beforeEach(() => {
    wrapper = mount(
      <DA1ConfigInput
        config={defaultConfig}
        updateConfig={(key: string, value: number) => {
          state = set(state, key, value);
        }}
      />
    );
  });

  it("displays the index field", () =>
    expectFormInput(wrapper, "index", "Index", "0"));

  it("displays the condition field", () =>
    expectFormInput(wrapper, "condition", "Condition", "1"));

  it("displays the item field", () =>
    expectFormInput(wrapper, "number", "Item ID", "2"));

  it("displays the fixation start field", () =>
    expectFormInput(wrapper, "fixation_start", "Fixation Start", "8"));

  it("displays the trial duration field", () =>
    expectFormInput(wrapper, "time", "Trial Duration", "-1"));

  describe("updating a value", () => {
    beforeEach(async () => {
      wrapper
        .find("input")
        .filterWhere(e => e.prop("id") === "index")
        .simulate("change", { target: { value: "10" } });
      await waitForUpdate(wrapper);
    });

    it("updates state", () =>
      expect(state.da1_fields).toMatchObject({ index: 10 }));
  });
});
