import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes } from "react-router-dom";
import { YoutubeApiContext } from "../context/YoutubeApiContext";

export function withRouter(routes, initialEntry = "/") {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}
// 리엑트쿼리를 테스트하기위한 함수
/**
 *
 * @param {*} children 랜더링할 리엑트 컴포넌트
 * @param {*} youtube 유튜브 mock데이터
 * @returns
 */
export function withAllContexts(children, youtube) {
  const testClient = createTestQueryClient();

  return (
    <YoutubeApiContext.Provider value={youtube}>
      <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
    </YoutubeApiContext.Provider>
  );
}
// 테스트용 쿼리 클라이언트를 반환하는 함수
function createTestQueryClient() {
  return new QueryClient(
    //  테스트를 편하게 하기위한 셋팅
    {
      defaultOptions: {
        queries: { retry: false },
      },
      logger: {
        log: console.log,
        warn: console.warn,
        error: () => {},
      },
    }
  );
}
