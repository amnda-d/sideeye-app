import * as React from "react";
import { Checkbox, FormGroup } from "@blueprintjs/core";
import { mount, ReactWrapper } from "enzyme";
import { set } from "lodash";
import { forEach, get } from "lodash";
import { MeasuresConfigInput } from "renderer/config/measures";
import { defaultConfig } from "renderer/config/default-config";
import {
  waitForUpdate,
  expectFormInput,
  expectFormSwitch,
  expectToExist,
  expectNotToExist
} from "test/utils";

const measures = [
  "region_measures.skip",
  "region_measures.first_pass_regressions_out",
  "region_measures.first_pass_regressions_in",
  "region_measures.first_fixation_duration",
  "region_measures.single_fixation_duration",
  "region_measures.first_pass",
  "region_measures.go_past",
  "region_measures.total_time",
  "region_measures.right_bounded_time",
  "region_measures.reread_time",
  "region_measures.second_pass",
  "region_measures.spillover_time",
  "region_measures.refixation_time",
  "region_measures.landing_position",
  "region_measures.launch_site",
  "region_measures.first_pass_fixation_count",
  "region_measures.go_back_time_region",
  "region_measures.go_back_time_char",
  "trial_measures.location_first_regression",
  "trial_measures.latency_first_regression",
  "trial_measures.fixation_count",
  "trial_measures.percent_regressions",
  "trial_measures.trial_total_time",
  "trial_measures.average_forward_saccade",
  "trial_measures.average_backward_saccade"
];

describe("Measure Configuration Input", () => {
  let wrapper: ReactWrapper;
  let state = defaultConfig;

  beforeEach(() => {
    wrapper = mount(
      <MeasuresConfigInput
        config={defaultConfig}
        updateConfig={(key: string, value) => {
          state = set(state, key, value);
        }}
      />
    );
  });

  const testRegionMeasure = async (measure: string) =>
    it(`displays the ${measure} measure`, async () => {
      const checkbox = wrapper
        .find(Checkbox)
        .filterWhere(e => e.prop("id") === measure);
      expectToExist(checkbox);
      expectFormInput(wrapper, `${measure}.header`, "Output Header", "");

      wrapper
        .find("input")
        .filterWhere(e => e.prop("id") === `${measure}.header`)
        .simulate("change", { target: { value: "name" } });
      await waitForUpdate(wrapper);
      expect(get(state, `${measure}.header`)).toEqual("name");

      expectFormSwitch(wrapper, `${measure}.use_cutoff`, "Use cutoff?", false);
      wrapper.setProps({ config: set(state, `${measure}.use_cutoff`, true) });
      expectFormSwitch(wrapper, `${measure}.use_cutoff`, "Use cutoff?", true);
      expectFormInput(wrapper, `${measure}.cutoff`, "Cutoff value", "0");

      checkbox.find("input").simulate("change", { target: { checked: false } });
      expect(get(state, `${measure}.exclude`)).toEqual(true);
      expectNotToExist(
        wrapper
          .find(FormGroup)
          .filterWhere(e => e.prop("id") === `${measure}.use_cutoff`)
      );
    });

  forEach(measures, async m => await testRegionMeasure(m));
});
