import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import WeatherIcon from "./WeatherIcon";
import { weatherImageBaseUrl } from "../../api/WeatherAPI";

describe("Simple working test", () => {
  it("the title is visible", () => {
    console.log("props");
    render(<WeatherIcon iconId={"url"} />);
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute(
      "src",
      `${weatherImageBaseUrl}${"url"}@2x.png`
    );
  });
});
