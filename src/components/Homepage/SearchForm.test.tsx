import { describe, expect, it } from "vitest";
import SearchForm from "./SearchForm";
import { render, screen } from "@testing-library/react";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

describe("Simple working test", () => {
  it("the title is visible", () => {
    render(
      <HashRouter>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </HashRouter>
    );
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });
});
