import { FileInput } from "@blueprintjs/core";
import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { DA1ASCFileInput } from "renderer/da1-asc-file";
import { expectToExist, waitForUpdate, TestFile } from "test/utils";

describe("Region File Input", () => {
  let wrapper: ReactWrapper;
  let state = { da1AscFiles: [] };

  beforeEach(() => {
    wrapper = mount(
      <DA1ASCFileInput
        files={[]}
        updateAppState={(value: any) => {
          state = { ...state, ...value };
        }}
      />
    );
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
              new TestFile(["testda1"], "test.da1"),
              new TestFile(["test2"], "test2.da1"),
              new TestFile(["test3"], "test.asc")
            ]
          }
        });
      await waitForUpdate(wrapper, 10);
    });

    it("updates the filenames value", () =>
      expect(state.da1AscFiles).toEqual(["test.da1", "test2.da1", "test.asc"]));

    it("displays a list of filenames", () => {
      wrapper = mount(
        <DA1ASCFileInput
          files={["test.da1", "test2.da1", "test.asc"]}
          updateAppState={(value: any) => {
            state = { ...state, ...value };
          }}
        />
      );
      expectToExist(
        wrapper.find("li").filterWhere(e => e.text() === "test.da1")
      );
      expectToExist(
        wrapper.find("li").filterWhere(e => e.text() === "test2.da1")
      );
      expectToExist(
        wrapper.find("li").filterWhere(e => e.text() === "test.asc")
      );
    });
  });
});
