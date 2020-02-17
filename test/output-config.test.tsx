import * as React from "react";
import { Checkbox, FormGroup } from "@blueprintjs/core";
import { mount, ReactWrapper } from "enzyme";
import { forEach, get, set } from "lodash";
import { OutputFileConfigInput } from "renderer/config/output";
import { defaultConfig } from "renderer/config/default-config";
import {
  expectFormInput,
  expectToExist,
  expectNotToExist,
  expectFormRadio
} from "test/utils";

const columns = [
  "experiment_name",
  "filename",
  "date",
  "trial_id",
  "trial_total_time",
  "item_id",
  "item_condition",
  "region_label",
  "region_number",
  "region_text",
  "region_start",
  "region_end"
];

describe("Output File Configuration Input", () => {
  let wrapper: ReactWrapper;
  let state = { config: defaultConfig, error: null };

  beforeEach(() => {
    wrapper = mount(
      <OutputFileConfigInput
        config={defaultConfig}
        updateConfig={(key: string, value) => {
          state = set(state, key, value);
        }}
      />
    );
  });

  const testOutputConfig = async (column: string) =>
    it(`displays the ${column} column`, async () => {
      const checkbox = wrapper
        .find(Checkbox)
        .filterWhere(e => e.prop("id") === column);
      expectToExist(checkbox);

      if (checkbox.prop("checked") === true) {
        expectFormInput(wrapper, `${column}.header`, "Output Header", "");
        wrapper
          .find("input")
          .filterWhere(e => e.prop("id") === `${column}.header`)
          .simulate("change", { target: { value: "name" } });
        expect(get(state, `output_columns.${column}.header`)).toEqual("name");
      } else {
        expectNotToExist(
          wrapper
            .find(FormGroup)
            .filterWhere(e => e.prop("id") === `${column}.header`)
        );
        checkbox
          .find("input")
          .simulate("change", { target: { checked: true } });
        expect(get(state, `output_columns.${column}.exclude`)).toEqual(false);
      }
    });

  forEach(columns, async c => await testOutputConfig(c));

  it("displays the wide/long format options", () => {
    expectFormRadio(wrapper, "Wide", "Output Format", true);
    expectFormRadio(wrapper, "Long", "Output Format", false);
  });
});
