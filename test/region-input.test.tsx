import { FileInput, Switch } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { RegionInput, StyledTable, ErrorText } from "renderer/region-input";
import {
  expectToExist,
  waitForComponent,
  waitForUpdate,
  selectDropdownValue
} from "test/utils";

describe("Region Input", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<RegionInput />);
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
      await waitForComponent(wrapper, StyledTable);
    });

    it("displays a table", () => expectToExist(wrapper.find("table")));

    it("displays one column for each column in the file", () =>
      expect(wrapper.find("th").length).toEqual(7));

    it("displays correct text in column header dropdowns", () =>
      expect(wrapper.find(Select).map(th => th.text())).toEqual([
        "Item Label",
        "Condition Label",
        "-",
        "Region 1 Boundary",
        "Region 2 Boundary",
        "Region 3 Boundary",
        "Region 4 Boundary"
      ]));

    it("displays contents of the file as rows in the table", () =>
      expect(
        wrapper
          .find("tbody")
          .find("tr")
          .map(tr => tr.find("td").map(td => td.text()))
      ).toEqual([
        ["1", "1", "0", "0", "5", "10", "15"],
        ["1", "2", "0", "0", "1", "5", "10"]
      ]));

    it("updates the column header text when changed to '-'", async () => {
      await selectDropdownValue(wrapper, wrapper.find(Select).at(0), "-");
      expect(wrapper.find(Select).map(th => th.text())).toEqual([
        "-",
        "Condition Label",
        "-",
        "Region 1 Boundary",
        "Region 2 Boundary",
        "Region 3 Boundary",
        "Region 4 Boundary"
      ]);
    });

    it("updates the column header text when changed to 'Condition Label'", async () => {
      await selectDropdownValue(
        wrapper,
        wrapper.find(Select).at(0),
        "Condition Label"
      );
      expect(wrapper.find(Select).map(th => th.text())).toEqual([
        "Condition Label",
        "-",
        "-",
        "Region 1 Boundary",
        "Region 2 Boundary",
        "Region 3 Boundary",
        "Region 4 Boundary"
      ]);
    });

    it("updates the column header text when changed to 'Item Label'", async () => {
      await selectDropdownValue(
        wrapper,
        wrapper.find(Select).at(4),
        "Item Label"
      );
      expect(wrapper.find(Select).map(th => th.text())).toEqual([
        "-",
        "Condition Label",
        "-",
        "-",
        "Item Label",
        "Region 1 Boundary",
        "Region 2 Boundary"
      ]);
    });

    it("updates the column header text when changed to 'Region Boundary'", async () => {
      await selectDropdownValue(
        wrapper,
        wrapper.find(Select).at(1),
        "Region Boundary"
      );
      expect(wrapper.find(Select).map(th => th.text())).toEqual([
        "Item Label",
        "Region 1 Boundary",
        "Region 2 Boundary",
        "Region 3 Boundary",
        "Region 4 Boundary",
        "Region 5 Boundary",
        "Region 6 Boundary"
      ]);
    });

    describe("Selecting the Y-values toggle", () => {
      beforeEach(async () => {
        (wrapper.find(Switch).props() as any).onChange();
        await waitForUpdate(wrapper);
      });

      it("updates column headers", () =>
        expect(wrapper.find(Select).map(th => th.text())).toEqual([
          "Item Label",
          "Condition Label",
          "-",
          "Region 1 Boundary Y",
          "Region 1 Boundary X",
          "Region 2 Boundary Y",
          "Region 2 Boundary X"
        ]));
    });
  });

  describe("After selecting a file that is not a region file", () => {
    beforeEach(async () => {
      wrapper
        .find(FileInput)
        .find("input")
        .simulate("change", {
          target: {
            files: [new File(["this is not a region file"], "errorfile.txt")]
          }
        });
      await waitForComponent(wrapper, ErrorText);
    });

    it("displays an error", () =>
      expect(wrapper.find(ErrorText).text()).toEqual(
        "Error parsing region file."
      ));
  });

  describe("After selecting an empty file", () => {
    beforeEach(async () => {
      wrapper
        .find(FileInput)
        .find("input")
        .simulate("change", {
          target: {
            files: [new File([""], "errorfile.txt")]
          }
        });
      await waitForComponent(wrapper, ErrorText);
    });

    it("displays an error", () =>
      expect(wrapper.find(ErrorText).text()).toEqual("Error: Empty file."));
  });

  describe("Regions with Y-values", () => {
    beforeEach(async () => {
      wrapper
        .find(FileInput)
        .find("input")
        .simulate("change", {
          target: {
            files: [
              new File(
                ["1\t1\t0\t0\t0\t0\t10\t1\t10\n1\t2\t0\t0\t5\t1\t5\t1\t15\n"],
                "region.cnt"
              )
            ]
          }
        });
      await waitForComponent(wrapper, StyledTable);
    });

    it("has a y-value toggle", () => expectToExist(wrapper.find(Switch)));

    it("is checked after selecting a file with non-increasing rows", () =>
      expect(wrapper.find(Switch).prop("checked")).toEqual(true));

    it("displays the correct column headers", () =>
      expect(wrapper.find(Select).map(th => th.text())).toEqual([
        "Item Label",
        "Condition Label",
        "-",
        "Region 1 Boundary Y",
        "Region 1 Boundary X",
        "Region 2 Boundary Y",
        "Region 2 Boundary X",
        "Region 3 Boundary Y",
        "Region 3 Boundary X"
      ]));

    describe("De-selecting the Y-values toggle", () => {
      beforeEach(async () => {
        (wrapper.find(Switch).props() as any).onChange();
        await waitForComponent(wrapper, ErrorText);
      });

      it("displays an error when de-selecting if rows are non-increasing", () =>
        expect(wrapper.find(ErrorText).text()).toEqual(
          "Boundary values must be increasing."
        ));
    });
  });
});
