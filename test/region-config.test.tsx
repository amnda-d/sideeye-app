import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import { set } from "lodash";
import { RegionConfigInput } from "renderer/config/region";
import { defaultConfig } from "renderer/config/default-config";
import { waitForUpdate, expectFormInput, expectFormSwitch } from "test/utils";

describe("Region Configuration Input", () => {
  let wrapper: ReactWrapper;
  let state = defaultConfig;

  beforeEach(() => {
    wrapper = mount(
      <RegionConfigInput
        config={defaultConfig}
        updateConfig={(key: string, value: number | boolean) => {
          state = set(state, key, value);
        }}
      />
    );
  });

  it("displays the condition field", () =>
    expectFormInput(wrapper, "condition", "Condition", "1"));

  it("displays the item field", () =>
    expectFormInput(wrapper, "number", "Item ID", "0"));

  it("displays the boundary start field", () =>
    expectFormInput(wrapper, "boundaries_start", "Boundary Start", "3"));

  it("displays the includes y values field", () =>
    expectFormSwitch(wrapper, "includes_y", "Includes Y Values", false));

  describe("updating a value", () => {
    beforeEach(async () => {
      wrapper
        .find("input")
        .filterWhere(e => e.prop("id") === "number")
        .simulate("change", { target: { value: "10" } });
      await waitForUpdate(wrapper);
    });

    it("updates state", () =>
      expect(state.region_fields).toMatchObject({ number: 10 }));
  });
});
