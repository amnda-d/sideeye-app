import { FileInput } from "@blueprintjs/core";
import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { RegionFileInput } from "renderer/region-file";
import { expectToExist, waitForUpdate } from "test/utils";

describe("Region File Input", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<RegionFileInput />);
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
              new File(
                ["1\t1\t0\t0\t5\t10\t15\n1\t2\t0\t0\t1\t5\t10\n"],
                "region.cnt"
              )
            ]
          }
        });
      await waitForUpdate(wrapper, 10);
    });

    it("updates the regionFile value", () =>
      expect(wrapper.state("regionFile")).toEqual(
        "1\t1\t0\t0\t5\t10\t15\n1\t2\t0\t0\t1\t5\t10\n"
      ));
  });
});
