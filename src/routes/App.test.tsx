import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

describe("something truthy and falsy", () => {
  it("should be truthy", () => {
    expect(true).toBe(true);
  });

  it("should be falsy", () => {
    expect(false).toBe(false);
  });
});

describe("App", () => {
  it("should render without crashing", () => {
    render(<App />);
  });
});
