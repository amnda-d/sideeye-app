import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import App from "renderer/main";
import { Navigation } from "renderer/navigation";
import { RegionInput } from "renderer/region-input";
import { Title } from "renderer/title";
import { expectToExist } from "test/utils";

describe("Page Navigation", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it("displays the navigation sidebar", () =>
    expectToExist(wrapper.find(Navigation)));

  it("displays the title page by default", () =>
    expectToExist(wrapper.find(Title)));

  it('displays the Region Input page when clicking "Regions"', () => {
    wrapper
      .find("div")
      .filterWhere(e => e.text() === "Regions")
      .simulate("click", { button: 0 });
    expectToExist(wrapper.find(RegionInput));
  });

  it('displays the title page when clicking "Home"', () => {
    wrapper
      .find("div")
      .filterWhere(e => e.text() === "Home")
      .simulate("click", { button: 0 });
    expectToExist(wrapper.find(Title));
  });
});
