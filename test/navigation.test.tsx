import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import App from "renderer/main";
import { Navigation } from "renderer/navigation";
import { DA1ASCFileInput } from "renderer/da1-asc-file";
import { RegionFileInput } from "renderer/region-file";
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
    expectToExist(wrapper.find(RegionFileInput));
  });

  it('displays the DA1/ASC Input page when clicking "DA1/ASC Files"', () => {
    wrapper
      .find("div")
      .filterWhere(e => e.text() === "DA1/ASC Files")
      .simulate("click", { button: 0 });
    expectToExist(wrapper.find(DA1ASCFileInput));
  });

  it('displays the title page when clicking "Home"', () => {
    wrapper
      .find("div")
      .filterWhere(e => e.text() === "Home")
      .simulate("click", { button: 0 });
    expectToExist(wrapper.find(Title));
  });
});
