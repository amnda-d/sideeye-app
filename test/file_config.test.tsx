import { FileInput } from "@blueprintjs/core";
import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { FileConfigInput } from "renderer/config/file";
import { expectToExist, waitForStateChange } from "test/utils";

describe("Parser Configuration Input", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<FileConfigInput />);
  });

  it("displays a file input", () =>
    expectToExist(
      wrapper
        .find(FileInput)
        .filterWhere(e => e.text() === "Choose Configuration File...")
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
                [
                  '{"wide_format": true, "da1_fields": { "index": 0, "condition": 1, "time": 3, "fixation_start": 4 }, "region_fields": { "condition": 10, "boundaries_start": 3, "includes_y": false }, "asc_parsing": {"blink_max_dur": 100}}'
                ],
                "region.cnt"
              )
            ]
          }
        });
      await waitForStateChange(wrapper, wrapper.state());
    });

    it("updates the DA1 trial duration value", () =>
      expect(wrapper.state("configFile")).toMatchObject({
        da1_fields: {
          index: 0,
          condition: 1,
          number: 2,
          time: 3,
          fixation_start: 4
        }
      }));

    it("updates the region condition value", () =>
      expect(wrapper.state("configFile")).toMatchObject({
        region_fields: {
          condition: 10,
          number: 0,
          boundaries_start: 3,
          includes_y: false
        }
      }));

    it("updates the blink_max_dur value", () =>
      expect(wrapper.state("configFile")).toMatchObject({
        asc_parsing: {
          blink_max_dur: 100,
          blink_max_count: false,
          max_saccade_dur: false,
          fixation_min_cutoff: false
        }
      }));
  });
});
