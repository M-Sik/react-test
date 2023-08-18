import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { Route } from "react-router-dom";
import SearchHeader from "../SearchHeader";
import { withRouter } from "../../tests/utils";

describe("SearchHeader", () => {
  // 랜더링이 정확히 되는지 스탭샷 테스트
  it("renders correctly", () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<SearchHeader />} />)
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  //
  it("renders with keyword correctly", async () => {
    render(
      withRouter(<Route path="/:keyword" element={<SearchHeader />} />, "/bts")
    );
    expect(screen.getByDisplayValue("bts")).toBeInTheDocument();
  });

  it("navigates to results page on search button click", () => {
    const searchKeyword = "fake-keyword";

    render(
      withRouter(
        <>
          <Route path="/home" element={<SearchHeader />} />
          <Route
            path={`/videos/${searchKeyword}`}
            element={<p>{`Search result for ${searchKeyword}`}</p>}
          />
        </>,
        "/home"
      )
    );

    const searchButton = screen.getByRole("button");
    const searchInput = screen.getByRole("textbox");

    userEvent.type(searchInput, searchKeyword);
    userEvent.click(searchButton);

    expect(
      screen.getByText(`Search result for ${searchKeyword}`)
    ).toBeInTheDocument();
  });
});
