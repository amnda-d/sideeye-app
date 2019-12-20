import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import App from "renderer/main";
import { CSVDownload } from "renderer/csv-download";
import { expectToExist, expectNotToExist, waitForUpdate } from "test/utils";
import { defaultConfig } from "renderer/config/default-config";

describe("Page Navigation", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('does not initially display the "Download CSV button"', () =>
    expectNotToExist(wrapper.find(CSVDownload)));

  describe("after selecting files", () => {
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
  });
});
