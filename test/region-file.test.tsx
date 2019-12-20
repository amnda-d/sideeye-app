import { FileInput } from "@blueprintjs/core";
import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { RegionFileInput } from "renderer/region-file";
import { expectToExist, waitForUpdate, TestFile } from "test/utils";

describe("Region File Input", () => {
  let wrapper: ReactWrapper;
  let state: any;

  beforeEach(() => {
    state = {};
    wrapper = mount(
      <RegionFileInput
        updateAppState={newState => {
          state = { ...state, ...newState };
        }}
        regionFile={null}
        regionFilePath={null}
        regionFileName={""}
      />
    );
  });

  it("displays a file input", () =>
    expectToExist(
      wrapper
        .find(FileInput)
        .filterWhere(e => e.text() === "Choose Region File...")
    ));

  describe("After selecting a file", () => {
    beforeEach(async () => {
      wrapper
        .find(FileInput)
        .find("input")
        .simulate("change", {
          target: {
            files: [
              new TestFile(
                ["1\t1\t0\t0\t5\t10\t15\n1\t2\t0\t0\t1\t5\t10\n"],
                "region.cnt"
              )
            ]
          }
        });
      await waitForUpdate(wrapper, 10);
    });

    it("updates the regionFile value", () =>
      expect(state.regionFile).toEqual(
        "1\t1\t0\t0\t5\t10\t15\n1\t2\t0\t0\t1\t5\t10\n"
      ));

    it("updates the regionFile name value", () =>
      expect(state.regionFileName).toEqual("region.cnt"));

    it("updates the regionFilePath value", () =>
      expect(state.regionFilePath).toEqual("region.cnt"));
  });
});
