import axios from "axios";
import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import App from "renderer/main";
import { CSVDownload } from "renderer/csv-download";
import { DataDisplay } from "renderer/components/data-display";
import { expectToExist, waitForUpdate } from "test/utils";
import { defaultConfig } from "renderer/config/default-config";

jest.mock("axios");
window.URL.createObjectURL = jest.fn();
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Process Data", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('initiallys display the "Process Data" button as disabled', () =>
    expect(wrapper.find(CSVDownload).prop("disabled")).toEqual(true));

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

    it('displays the "Process Data" button as disabled', () =>
      expect(wrapper.find(CSVDownload).prop("disabled")).toEqual(true));
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

    it('displays the "Process Data" button as disabled', () =>
      expect(wrapper.find(CSVDownload).prop("disabled")).toEqual(true));
  });

  describe("after selecting all files", () => {
    beforeEach(async () => {
      wrapper.setState({
        page: "/",
        regionFilePath: "region.cnt",
        regionFileName: "region.cnt",
        regionFile: null,
        config: defaultConfig,
        configFileName: "config.json",
        da1AscFiles: ["test.da1", "test.asc"]
      });
      await waitForUpdate(wrapper);
    });

    it('displays the "Process Data button"', () =>
      expect(wrapper.find(CSVDownload).prop("disabled")).toEqual(false));

    it("has the correct text", () =>
      expectToExist(
        wrapper.find("button").filterWhere(e => e.text() === "Process Data")
      ));

    describe('when clicking "Process Data"', () => {
      beforeEach(() => {
        mockedAxios.post.mockImplementationOnce(() =>
          Promise.resolve({ data: "csv" })
        );
        wrapper
          .find("button")
          .filterWhere(e => e.text() === "Process Data")
          .simulate("click", { button: 0 });
      });

      it("makes a post request to the API", () => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          `http://localhost:3001/sideeye`,
          {
            region_file: "region.cnt",
            config: defaultConfig,
            files: ["test.da1", "test.asc"]
          }
        );
      });

      it("sets 'data' to 'csv'", () => {
        expect(wrapper.state("data")).toEqual("csv");
      });

      it("shows the data display component", async () => {
        await waitForUpdate(wrapper);
        expectToExist(wrapper.find(DataDisplay));
      });
    });
  });
});
