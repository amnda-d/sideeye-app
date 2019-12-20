import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import App from "renderer/main";
import { CSVDownload } from "renderer/csv-download";
import { expectToExist, expectNotToExist, waitForUpdate } from "test/utils";
import { defaultConfig } from "renderer/config/default-config";

describe("CSV Download", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('does not initially display the "Download CSV button"', () =>
    expectNotToExist(wrapper.find(CSVDownload)));

  describe("after selecting a region file", () => {
    beforeEach(async () => {
      wrapper.setState({
        page: "/",
        regionFilePath: "region.cnt",
        regionFileName: "region.cnt",
        regionFile: null,
        config: {},
        configFileName: null,
        da1AscFiles: []
      });
      await waitForUpdate(wrapper);
    });

    it('displays the "Download CSV button"', () =>
      expectNotToExist(wrapper.find(CSVDownload)));
  });

  describe("after selecting a da1 file", () => {
    beforeEach(async () => {
      wrapper.setState({
        page: "/",
        regionFilePath: null,
        regionFileName: null,
        regionFile: null,
        config: {},
        configFileName: null,
        da1AscFiles: ["test.da1"]
      });
      await waitForUpdate(wrapper);
    });

    it('displays the "Download CSV button"', () =>
      expectNotToExist(wrapper.find(CSVDownload)));
  });

  describe("after selecting all files", () => {
    beforeEach(async () => {
      wrapper.setState({
        page: "/",
        regionFilePath: "region.cnt",
        regionFileName: "region.cnt",
        regionFile: null,
        confifg: defaultConfig,
        configFileName: "config.json",
        da1AscFiles: ["test.da1", "test.asc"]
      });
      await waitForUpdate(wrapper);
    });

    it('displays the "Download CSV button"', () =>
      expectToExist(wrapper.find(CSVDownload)));

    it("has the correct text", () =>
      expectToExist(
        wrapper.find("div").filterWhere(e => e.text() === "Download CSV")
      ));
  });
});
