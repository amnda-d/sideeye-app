import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import { ConfigInput } from "renderer/config";
import { MeasuresConfigInput } from "renderer/config/measures";
import { CutoffsConfigInput } from "renderer/config/cutoffs";
import { FileConfigInput } from "renderer/config/file";
import { RegionConfigInput } from "renderer/config/region";
import { DA1ConfigInput } from "renderer/config/da1";
import { ASCConfigInput } from "renderer/config/asc";
import { OutputFileConfigInput } from "renderer/config/output";
import { expectToExist } from "test/utils";

describe("Configuration Input", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<ConfigInput />);
  });

  it("displays the file input by default", () =>
    expectToExist(wrapper.find(FileConfigInput)));

  it('displays a "Create new configuration" button', () =>
    expectToExist(
      wrapper
        .find("button")
        .filterWhere(e => e.text() === "Create New Configuration")
    ));

  describe('clicking on "Create New Configuration"', () => {
    beforeEach(() =>
      wrapper
        .find("button")
        .filterWhere(e => e.text() === "Create New Configuration")
        .simulate("click", { button: 0 })
    );

    it("displays a Region Configuration dropdown", () =>
      expectToExist(
        wrapper
          .find("div")
          .filterWhere(e => e.text() === "Region Configuration")
      ));

    it("displays a DA1 Configuration dropdown", () =>
      expectToExist(
        wrapper.find("div").filterWhere(e => e.text() === "DA1 Configuration")
      ));

    describe("clicking on Region Configuration", () => {
      beforeEach(() =>
        wrapper
          .find("div")
          .filterWhere(e => e.text() === "Region Configuration")
          .simulate("click", { button: 0 })
      );

      it("displays the RegionConfigInput", () =>
        expectToExist(wrapper.find(RegionConfigInput)));
    });

    describe("clicking on DA1 Configuration", () => {
      beforeEach(() =>
        wrapper
          .find("div")
          .filterWhere(e => e.text() === "DA1 Configuration")
          .simulate("click", { button: 0 })
      );

      it("displays the DA1ConfigInput", () =>
        expectToExist(wrapper.find(DA1ConfigInput)));
    });

    describe("clicking on ASC Parsing Configuration", () => {
      beforeEach(() =>
        wrapper
          .find("div")
          .filterWhere(e => e.text() === "ASC Parsing Configuration")
          .simulate("click", { button: 0 })
      );

      it("displays the ASCConfigInput", () =>
        expectToExist(wrapper.find(ASCConfigInput)));
    });

    describe("clicking on Cutoffs Configuration", () => {
      beforeEach(() =>
        wrapper
          .find("div")
          .filterWhere(e => e.text() === "Fixation and Saccade Cutoffs")
          .simulate("click", { button: 0 })
      );

      it("displays the CutoffsConfigInput", () =>
        expectToExist(wrapper.find(CutoffsConfigInput)));
    });

    describe("clicking on Trial and Region Measures", () => {
      beforeEach(() =>
        wrapper
          .find("div")
          .filterWhere(e => e.text() === "Trial and Region Measures")
          .simulate("click", { button: 0 })
      );

      it("displays the RegionMeasuresConfigInput", () =>
        expectToExist(wrapper.find(MeasuresConfigInput)));
    });

    describe("clicking on Output File", () => {
      beforeEach(() =>
        wrapper
          .find("div")
          .filterWhere(e => e.text() === "Output File")
          .simulate("click", { button: 0 })
      );

      it("displays the OutputFileConfig", () =>
        expectToExist(wrapper.find(OutputFileConfigInput)));
    });
  });
});
