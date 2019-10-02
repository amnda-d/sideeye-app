import { FileInput } from "@blueprintjs/core";
import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { DA1ASCFileInput } from "renderer/da1-asc-file";
import { expectToExist, waitForUpdate } from "test/utils";

describe("Region File Input", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<DA1ASCFileInput />);
  });

  it("displays a file input", () =>
    expectToExist(
      wrapper
        .find(FileInput)
        .filterWhere(e => e.text() === "Choose DA1/ASC Files...")
    ));

  describe("After selecting files", () => {
    beforeEach(async () => {
      wrapper
        .find(FileInput)
        .find("input")
        .simulate("change", {
          target: {
            files: [
              new File(["testda1"], "test.da1"),
              new File(["test2"], "test2.da1"),
              new File(["test3"], "test.asc")
            ]
          }
        });
      await waitForUpdate(wrapper, 10);
    });

    it("updates the filenames value", () =>
      expect(wrapper.state("filenames")).toEqual([
        "test.da1",
        "test2.da1",
        "test.asc"
      ]));

    it("updates the files value", () =>
      expect(wrapper.state("files")).toEqual(["testda1", "test2", "test3"]));

    it("displays a list of filenames", () => {
      expectToExist(
        wrapper.find("div").filterWhere(e => e.text() === "test.da1")
      );
      expectToExist(
        wrapper.find("div").filterWhere(e => e.text() === "test2.da1")
      );
      expectToExist(
        wrapper.find("div").filterWhere(e => e.text() === "test.asc")
      );
    });
  });
});
