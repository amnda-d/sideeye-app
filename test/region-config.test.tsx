import * as React from "react";
import { FormGroup, Switch } from "@blueprintjs/core";
import { mount, ReactWrapper } from "enzyme";
import { RegionConfigInput } from "renderer/config/region";
import { expectToExist, waitForUpdate, expectFormInput } from "test/utils";

describe("Region Configuration Input", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<RegionConfigInput />);
  });

  it("displays the Region fields", () =>
    expectToExist(
      wrapper
        .find(FormGroup)
        .filterWhere(e => e.prop("label") === "Region File Fields")
    ));

  it("displays the condition field", () =>
    expectFormInput(wrapper, "condition", "Condition", "1"));

  it("displays the item field", () =>
    expectFormInput(wrapper, "item", "Item ID", "0"));

  it("displays the boundary start field", () =>
    expectFormInput(wrapper, "boundary", "Boundary Start", "3"));

  it("displays the includes y values field", () => {
    expectToExist(
      wrapper
        .find(FormGroup)
        .filterWhere(e => e.prop("label") === "Includes Y Values")
    );
    expect(
      wrapper
        .find(Switch)
        .filterWhere(e => e.prop("id") === "includes_y")
        .prop("checked")
    ).toEqual(false);
  });

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
