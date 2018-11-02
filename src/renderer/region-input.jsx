// @flow
import * as React from 'react';
import { FileInput, HTMLTable, MenuItem, Button } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { readAsText } from 'promise-file-reader';
import styled from 'styled-components';
import * as parse from 'csv-parse/lib/sync';
import {
  map,
  findKey,
  slice,
  concat,
  range,
  zipObject,
  isEqual,
  split,
  chain,
  trim,
  maxBy,
  includes,
} from 'lodash';

export class RegionInput extends React.Component<
  {},
  {
    regionFile: ?(string[][]),
    columns: { [string]: string },
    boundaryStart: number,
    yValues: boolean,
  },
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      regionFile: null,
      columns: {},
      boundaryStart: 3,
      yValues: false,
    };
  }

  async processNewFile(newFile: File) {
    const regionFile = chain(
      (await readAsText(newFile)).replace(/\b[\t ]+/g, ','),
    )
      .split('\n')
      .map(line =>
        chain(line)
          .split(',')
          .map(trim)
          .value(),
      )
      .value();
    const maxLength = maxBy(regionFile, 'length').length;
    const yValues = !isEqual(
      slice(regionFile[0], 3),
      slice(regionFile[0], 3).sort(),
    );
    const columns = yValues
      ? concat(
          ['Item Label', 'Condition Label', '-'],
          map(
            range(maxLength - 3),
            (_, idx) =>
              idx % 2
                ? `Region ${Math.floor(idx / 2) + 1} Boundary Y`
                : `Region ${Math.floor(idx / 2) + 1} Boundary X`,
          ),
        )
      : concat(
          ['Item Label', 'Condition Label', '-'],
          map(range(maxLength - 3), (_, idx) => `Region ${idx + 1} Boundary`),
        );
    this.setState({
      regionFile,
      yValues,
      boundaryStart: 3,
      columns: zipObject(range(maxLength), columns),
    });
  }

  onColumnChange(columnKey: number, column: string) {
    let boundaryStart = this.state.boundaryStart;
    if (column === 'Boundary Start') {
      boundaryStart = columnKey;
    } else if (columnKey >= boundaryStart) {
      boundaryStart = columnKey + 1;
    }
    let columns = map(this.state.columns, (col, key) => {
      if (parseInt(key) < columnKey) {
        return col === column || includes(col, 'Region') ? '-' : col;
      } else {
        if (
          includes(['Item Label', 'Condition Label', '-'], column) &&
          parseInt(key) === columnKey
        ) {
          return column;
        } else if (col === column || key < boundaryStart) {
          return '-';
        } else {
          const region = this.state.yValues
            ? Math.floor((parseInt(key) - boundaryStart) / 2) + 1
            : parseInt(key) - boundaryStart + 1;
          return `Region ${region} Boundary${
            this.state.yValues
              ? (parseInt(key) - boundaryStart) % 2
                ? ' Y'
                : ' X'
              : ''
          }`;
        }
      }
    });
    this.setState({
      columns,
      boundaryStart,
    });
  }

  render() {
    return (
      <Wrapper>
        <StyledFileInput
          text="Choose Region File..."
          onInputChange={async e =>
            await this.processNewFile(e.target.files[0])
          }
        />
        {this.state.regionFile && (
          <TableWrapper>
            <StyledTable interactive>
              <thead>
                <tr>
                  {map(this.state.regionFile[0], (col, key) => (
                    <th key={key}>
                      <Select
                        filterable={false}
                        items={[
                          'Item Label',
                          'Condition Label',
                          'Boundary Start',
                          '-',
                        ]}
                        itemRenderer={item => (
                          <MenuItem
                            key={item}
                            onClick={() => this.onColumnChange(key, item)}
                            text={item}
                          />
                        )}
                      >
                        <Button>{this.state.columns[key]}</Button>
                      </Select>
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

const TableWrapper = styled.div`
  height: 80%;
  overflow: scroll;
`;

const StyledTable = styled(HTMLTable)`
  margin: 0 auto;
  align-self: center;
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
