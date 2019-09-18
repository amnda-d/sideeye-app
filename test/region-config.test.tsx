import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import { RegionConfigInput } from "renderer/config/region";
import { waitForUpdate, expectFormInput, expectFormSwitch } from "test/utils";

describe("Region Configuration Input", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<RegionConfigInput />);
  });

  it("displays the condition field", () =>
    expectFormInput(wrapper, "condition", "Condition", "1"));

  it("displays the item field", () =>
    expectFormInput(wrapper, "item", "Item ID", "0"));

  it("displays the boundary start field", () =>
    expectFormInput(wrapper, "boundary", "Boundary Start", "3"));

  it("displays the includes y values field", () =>
    expectFormSwitch(wrapper, "includes_y", "Includes Y Values", false));

  describe("updating a value", () => {
    beforeEach(async () => {
      wrapper
        .find("input")
        .filterWhere(e => e.prop("id") === "item")
        .simulate("change", { target: { value: "10" } });
      await waitForUpdate(wrapper);
    });

    it("updates state", () =>
      expect(wrapper.state("configFile")).toMatchObject({ item: 10 }));
  });
});
