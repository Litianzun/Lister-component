import React from "react";
import { render } from "@testing-library/react";
import Button from "./button";

test("react render test", () => {
  const view = render(<Button>Nice</Button>);
  const element = view.queryByText("Nice");
  expect(element).toBeTruthy();
});

describe("test button component", () => {
  it("默认button组件", () => {
    const view = render(<Button>Nice</Button>);
    const element = view.queryByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
  })
});
