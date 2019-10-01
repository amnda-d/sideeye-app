import { FileInput } from "@blueprintjs/core";
import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { set } from "lodash";
import { FileConfigInput } from "renderer/config/file";
import { defaultConfig, Config } from "renderer/config/default-config";
import { expectToExist, waitForUpdate } from "test/utils";

describe("Parser Configuration Input", () => {
  let wrapper: ReactWrapper;
  let state = { config: defaultConfig, error: null };

  beforeEach(() => {
    wrapper = mount(
      <FileConfigInput
        config={defaultConfig}
        updateConfig={(value: Config) => {
          state = set(state, "config", value);
        }}
      />
    );
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
                  '{"wide_format": true, "da1_fields": { "index": 0, "condition": 1, "time": 3, "fixation_start": 4 }, "region_fields": { "condition": 10, "boundaries_start": 3, "includes_y": false }, "asc_parsing": {"blink_max_dur": 100}, "cutoffs": {"min": 1000}, "region_measures": {"skip": {"header": "Skip", "cutoff": 100}}, "trial_measures": {"fixation_count": {"header": "Fixation Ct"}}, "output_columns": {"region_end": { "header": "Region End", "exclude": false }}}'
                ],
                "region.cnt"
              )
            ]
          }
        });
      await waitForUpdate(wrapper, 10);
    });

    it("updates the DA1 trial duration value", () =>
      expect(state.config).toMatchObject({
        da1_fields: {
          index: 0,
          condition: 1,
          number: 2,
          time: 3,
          fixation_start: 4
        }
      }));

    it("updates the region condition value", () =>
      expect(state.config).toMatchObject({
        region_fields: {
          condition: 10,
          number: 0,
          boundaries_start: 3,
          includes_y: false
        }
      }));

    it("updates the blink_max_dur value", () =>
      expect(state.config).toMatchObject({
        asc_parsing: {
          blink_max_dur: 100,
          blink_max_count: false,
          max_saccade_dur: false,
          fixation_min_cutoff: false
        }
      }));

    it("updates the min cutoff value", () =>
      expect(state.config).toMatchObject({
        cutoffs: {
          min: 1000,
          max: -1,
          include_fixation: false,
          include_saccades: false
        }
      }));

    it("updates the skip header value", () =>
      expect(state.config).toMatchObject({
        region_measures: {
          skip: { header: "Skip", cutoff: 100, use_cutoff: true }
        }
      }));

    it("updates the fixation count header value", () =>
      expect(state.config).toMatchObject({
        trial_measures: {
          fixation_count: { header: "Fixation Ct", use_cutoff: false }
        }
      }));

    it("updates the region_end header value", () =>
      expect(state.config).toMatchObject({
        output_columns: {
          region_end: { header: "Region End", exclude: false }
        }
      }));
  });
});
