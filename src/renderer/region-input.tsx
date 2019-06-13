import * as React from "react";
import { FileInput, MenuItem, Switch } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { readAsText } from "promise-file-reader";
import styled from "styled-components";
import {
  map,
  slice,
  concat,
  range,
  zipObject,
  isEqual,
  chain,
  trim,
  max,
  isFinite,
  startsWith,
  toNumber,
  sortBy,
  mapValues
} from "lodash";
import { colors } from "renderer/colors";

export class RegionInput extends React.Component {
  state: {
    columns: { [id: string]: string };
    regionFile: Array<Array<number>> | null;
    error: string | null;
    boundaryStart: number;
    yValues: boolean;
  } = {
    regionFile: null,
    columns: {},
    error: null,
    boundaryStart: 3,
    yValues: false
  };

  parseRegionFile(fileText: string) {
    const regionFile = chain(fileText.replace(/\b[\t ]+/g, ","))
      .split("\n")
      .filter(row => row !== "")
      .map(line =>
        chain(line)
          .split(",")
          .map(trim)
          .map(toNumber)
          .value()
      )
      .value();

    if (regionFile.length === 0) {
      throw new Error("Error: Empty file.");
    }

    if (!isFinite(regionFile[0][0])) {
      throw new Error("Error parsing region file.");
    }
    return regionFile;
  }

  async processNewFile(newFile: File) {
    try {
      const regionFile = this.parseRegionFile(await readAsText(newFile));
      const maxLength = max(map(regionFile, line => line.length)) || 0;
      const yValues = !isEqual(
        slice(regionFile[0], 3),
        sortBy(slice(regionFile[0], 3))
      );
      const columns = this.setColumnHeaders(
        yValues,
        3,
        zipObject(
          range(maxLength),
          concat(
            ["Item Label", "Condition Label", "-"],
            map(range(maxLength - 3), _ => "-")
          )
        )
      );
      this.setState({ columns, regionFile, error: null, yValues });
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  onColumnChange(columnKey: number, column: string) {
    const boundaryStart =
      column === "Region Boundary"
        ? columnKey
        : columnKey >= this.state.boundaryStart
        ? columnKey + 1
        : this.state.boundaryStart;

    let columns = this.state.columns;
    if (column === "-") {
      columns[columnKey] = column;
    } else if (column === "Condition Label" || column === "Item Label") {
      columns = {
        ...mapValues(this.state.columns, col => (col === column ? "-" : col)),
        [columnKey]: column
      };
    }
    columns = this.setColumnHeaders(this.state.yValues, boundaryStart, columns);

    this.setState({ columns, boundaryStart });
  }

  setColumnHeaders(
    yValues: boolean,
    boundaryStart: number,
    columns: { [id: string]: string }
  ) {
    if (yValues) {
      return mapValues(columns, (col, key) =>
        parseInt(key) < boundaryStart
          ? startsWith(col, "Region")
            ? "-"
            : col
          : parseInt(key) % 2
          ? `Region ${Math.floor((parseInt(key) - boundaryStart) / 2) +
              1} Boundary Y`
          : `Region ${Math.floor((parseInt(key) - boundaryStart) / 2) +
              1} Boundary X`
      );
    } else {
      return mapValues(columns, (col, key) =>
        parseInt(key) < boundaryStart
          ? startsWith(col, "Region")
            ? "-"
            : col
          : `Region ${parseInt(key) - boundaryStart + 1} Boundary`
      );
    }
  }

  toggleYValues() {
    if (
      this.state.yValues &&
      this.state.regionFile &&
      !isEqual(
        slice(this.state.regionFile[0], this.state.boundaryStart),
        sortBy(slice(this.state.regionFile[0], this.state.boundaryStart))
      )
    ) {
      this.setState({ error: "Boundary values must be increasing." });
    } else {
      this.setState({
        yValues: !this.state.yValues,
        columns: this.setColumnHeaders(
          !this.state.yValues,
          this.state.boundaryStart,
          this.state.columns
        )
      });
    }
  }

  render() {
    return (
      <Wrapper>
        <StyledFileInput
          text="Choose Region File..."
          onInputChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.files && (await this.processNewFile(e.target.files[0]))
          }
        />
        <Switch
          checked={this.state.yValues}
          label="Y-Values"
          onChange={() => this.toggleYValues()}
        />
        {this.state.error && <ErrorText>{this.state.error}</ErrorText>}
        {this.state.regionFile && (
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  {map(this.state.regionFile[0], (col, key) => (
                    <th key={key}>
                      {
                        <Select
                          filterable={false}
                          items={[
                            "Item Label",
                            "Condition Label",
                            "Boundary Start",
                            "-"
                          ]}
                          onItemSelect={item => this.onColumnChange(key, item)}
                          itemRenderer={(item: string) => (
                            <MenuItem
                              key={item}
                              onClick={() => this.onColumnChange(key, item)}
                              text={item}
                            />
                          )}
                        >
                          <StyledHeaderButton>
                            {this.state.columns[key]}
                          </StyledHeaderButton>
                        </Select>
                      }
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {map(this.state.regionFile, (row, rowKey) => (
                  <tr key={rowKey}>
                    {map(row, (cell, key) => (
                      <td key={key}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableWrapper>
        )}
      </Wrapper>
    );
  }
}

const StyledHeaderButton = styled.button`
  color: ${colors.gray};
  border: none;
  background-color: ${colors.green};
  font-weight: bold;
  height: 40px;
  min-width: 50px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightGreen};
  }
`;

const TableWrapper = styled.div`
  height: 80%;
  overflow: scroll;
  margin: 40px;
`;

export const StyledTable = styled.table`
  margin: 0 auto;
  align-self: center;
  border-collapse: collapse;

  tbody tr {
    text-align: center;
    height: 30px;
    border-bottom: 1px solid rgba(85, 81, 82, 0.1);

    &:hover {
      background-color: rgba(85, 81, 82, 0.1);
    }
  }
`;

const StyledFileInput = styled(FileInput)`
  margin: 0 auto;
  align-self: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const ErrorText = styled.div``;
