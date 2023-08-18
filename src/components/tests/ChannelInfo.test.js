import { render, screen, waitFor } from "@testing-library/react";
import { withAllContexts, withRouter } from "../../tests/utils";
import { Route } from "react-router-dom";
import ChannelInfo from "../ChannelInfo";

describe("ChannelInfo", () => {
  const fakeYoutube = {
    channelImageURL: jest.fn(),
  };
  // 모든 테스트가 끝날때 마다 mock 데이터 초기화
  afterEach(() => fakeYoutube.channelImageURL.mockReset());

  // 정확히 랜더링 되는지
  it("renders correctly", async () => {
    // channelImageURL이 호출되면 mockImplementation 설정 -> "url"이 return 되도록
    fakeYoutube.channelImageURL.mockImplementation(() => "url");

    render(
      withAllContexts(
        withRouter(
          <Route path="/" element={<ChannelInfo id="id" name="channel" />} />
        ),
        fakeYoutube
      )
    );
    await screen.findByText("channel");
  });
});
