import { render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { mockedProperties } from "../../mocks/db";
import { server } from "../../mocks/server";
import { Properties } from "./Properties";

describe("Properties", () => {
  test("should render loading message while loading data", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Properties />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("...Loading")).toBeInTheDocument();
    });
  });

  test("should render list of properties", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Properties />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Price £ 120,000")).toBeInTheDocument();
    });
  });
});
