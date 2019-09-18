import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import { ConfigInput } from "renderer/config";
import { FileConfigInput } from "renderer/config/file";
import { expectToExist } from "test/utils";

describe("Configuration Input", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<ConfigInput />);
  });

  it("displays the file input by default", () =>
    expectToExist(wrapper.find(FileConfigInput)));
});
