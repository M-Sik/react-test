import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { formatAgo } from "../../util/date";
import VideoCard from "../VideoCard";

describe("VideoCard", () => {
  const video = {
    id: 1,
    snippet: {
      title: "title",
      channelId: "1",
      channelTitle: "channelTitle",
      publishedAt: new Date(),
      thumbnails: {
        medium: {
          url: "http://image/",
        },
      },
    },
  };
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  it("renders video item", () => {
    render(
      <MemoryRouter>
        <VideoCard video={video} />
      </MemoryRouter>
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
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </Routes>
      </MemoryRouter>
    );
    // Role -> listitem은 li 태그임
    const card = screen.getByRole("listitem");
    // 비디오 카드를 클릭
    userEvent.click(card);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
