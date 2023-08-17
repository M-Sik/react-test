import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, useLocation } from "react-router-dom";
import { formatAgo } from "../../util/date";
import VideoCard from "../VideoCard";
import { fakeVideo as video } from "../../tests/videos";
import { withRouter } from "../../tests/utils";
import renderer from "react-test-renderer";

describe("VideoCard", () => {
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;
  // 비디오카드 그리드일때 스냅샷 테스트
  it("renders grid type correctly", () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<VideoCard video={video} />} />)
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  // 비디오카드 리스트일때 스냅샷 테스트
  it("renders list type correctly", () => {
    const component = renderer.create(
      withRouter(
        <Route path="/" element={<VideoCard video={video} type="list" />} />
      )
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders video item", () => {
    render(
      withRouter(<Route path="/" element={<VideoCard video={video} />} />)
    );

    const image = screen.getByRole("img");
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  // 동적 test
  it("navigates to detailed video page with video state when clicked", () => {
    // 테스트용 함수 컴포넌트
    // 리엑트 라우터로부터 전달받은 state를 보여주는 컴포넌트
    //   /videos/watch/${video.id} 경로로 왓을때 받은 상태를 보여주기 위해 만듬
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }
    render(
      // initialEntries => 처음에 시작하는 경로
      withRouter(
        <>
          <Route path="/" element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </>
      )
    );
    // Role -> listitem은 li 태그임
    const card = screen.getByRole("listitem");
    // 비디오 카드를 클릭
    userEvent.click(card);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
