import { render } from "@testing-library/react";
import Alert, { AlertType } from "./alert";

const testProps = {
  message: "msg",
};

const typeProps = {
  ...testProps,
  type: AlertType.Success,
  description: "desc",
  closable: false,
};
describe("test alert component", () => {
  it("alert组件default渲染", () => {
    const { queryByText, container } = render(<Alert {...testProps} />)
    expect(queryByText("msg")).toBeInTheDocument()
    expect(container.querySelector(".alert")).toHaveClass("alert-default")
  })
  it("success type alert组件渲染", () => {
    const { container, queryByText } = render(<Alert {...typeProps} />)
    expect(queryByText("msg")).toHaveClass("alert-message")
    expect(container.querySelector(".alert")).toHaveClass("alert-success")
    expect(queryByText("desc")).toBeInTheDocument()
  })
});
