import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import App from "renderer/main";
import { Loading } from "renderer/components/loading";
import { expectNotToExist, expectToExist, waitForUpdate } from "test/utils";

describe("CSV Download", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it("initially does not display the loading screen", () =>
    expectNotToExist(wrapper.find(Loading)));

  describe("when downloading is true", () => {
    beforeEach(async () => {
      wrapper.setState({
        page: "/",
        regionFilePath: "region.cnt",
        regionFileName: "region.cnt",
        regionFile: null,
        config: {},
        configFileName: null,
        da1AscFiles: [],
        downloading: true
      });
      await waitForUpdate(wrapper);
    });

    it("displays the Loading component", () =>
      expectToExist(wrapper.find(Loading)));
  });
});
