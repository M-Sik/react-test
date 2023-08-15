import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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
      // react router를 사용하는 컴포넌트를 테스트할때에는 MemoryRouter를 사용해야함
      <MemoryRouter>
        <VideoCard video={video} />
      </MemoryRouter>
    );

    const image = screen.getByRole("img");
    // 이미지 태그의 src는 thumbnails.medium.url과 같아야함
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    // 화면(도큐먼트)에 video에 title에 있는 텍스트가 있는지 확인한다.
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });
});
