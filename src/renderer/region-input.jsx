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
  some,
  split,
  chain,
  trim,
  maxBy,
  includes,
} from 'lodash';
import { colors } from 'renderer/colors';
import { Button as NextButton } from 'components/button';
import { getRequest, postRequest } from 'renderer/get_request';

export class RegionInput extends React.Component<
  {},
  {
    regionFile: ?(string[][]),
    regionFileName: ?string,
    columns: { [string]: string },
    boundaryStart: number,
    yValues: boolean,
  },
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      regionFile: null,
      regionFileName: null,
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
      regionFileName: newFile.name,
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

  async parseRegionFile() {
    const regions = map(this.state.regionFile, item => item.join('\t')).join(
      '\n',
    );
    const regionConfig = {
      number: parseInt(
        findKey(this.state.columns, value => value === 'Item Label'),
      ),
      condition: parseInt(
        findKey(this.state.columns, value => value === 'Condition Label'),
      ),
      boundaries_start: parseInt(
        findKey(this.state.columns, value => /Boundary/.test(value)),
      ),
      includes_y: some(this.state.columns, value => /Y/.test(value)),
      file_name: this.state.regionFileName,
      regions,
    };
    console.log(this.state.columns, regionConfig);
    await postRequest('http://localhost:3001/region_cnt', regionConfig);
  }

  render() {
    return (
      <Wrapper>
        <StyledFileInput
          text={this.state.regionFileName || 'Choose Region File...'}
          onInputChange={async e =>
            await this.processNewFile(e.target.files[0])
          }
        />
        {this.state.regionFile && (
          <TableWrapper>
            <StyledTable>
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
                        <StyledHeaderButton>
                          {this.state.columns[key]}
                        </StyledHeaderButton>
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
        {this.state.regionFile && (
          <NextButton
            text="Parse Region File"
            onClick={() => this.parseRegionFile()}
          />
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
  height: 55px;
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

const StyledTable = styled.table`
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
