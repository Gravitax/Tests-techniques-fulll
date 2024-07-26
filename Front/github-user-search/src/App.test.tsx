import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders search input and handles search", async () => {
    render(<App />);
    const input = screen.getByTestId("searchbar");
    fireEvent.change(input, { target: { value: "octocat" } });

    // Add further assertions based on the mock or real API responses
});
