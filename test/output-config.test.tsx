import * as React from "react";
import { Checkbox, FormGroup } from "@blueprintjs/core";
import { mount, ReactWrapper } from "enzyme";
import { forEach, get } from "lodash";
import { OutputFileConfigInput } from "renderer/config/output";
import {
  waitForUpdate,
  expectFormInput,
  expectToExist,
  expectNotToExist
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

  beforeEach(() => {
    wrapper = mount(<OutputFileConfigInput />);
  });

  const testOutputConfig = async (column: string) =>
    it(`displays the ${column} column`, async () => {
      const checkbox = wrapper
        .find(Checkbox)
        .filterWhere(e => e.prop("id") === column);
      expectToExist(checkbox);

      if (checkbox.prop("checked") === true) {
        expectFormInput(
          wrapper,
          `configFile.${column}.header`,
          "Output Header",
          ""
        );
        wrapper
          .find("input")
          .filterWhere(e => e.prop("id") === `configFile.${column}.header`)
          .simulate("change", { target: { value: "name" } });
        await waitForUpdate(wrapper);
        expect(get(wrapper.state("configFile"), `${column}.header`)).toEqual(
          "name"
        );
      } else {
        expectNotToExist(
          wrapper
            .find(FormGroup)
            .filterWhere(e => e.prop("id") === `configFile.${column}.header`)
        );
        checkbox
          .find("input")
          .simulate("change", { target: { checked: true } });
        await waitForUpdate(wrapper);
        expect(get(wrapper.state("configFile"), `${column}.exclude`)).toEqual(
          false
        );
      }
    });

  forEach(columns, async c => await testOutputConfig(c));
});
