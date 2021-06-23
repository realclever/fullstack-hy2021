import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

describe("BlogForm tests", () => {
  test("Testing callback functions when creating a new form", () => {
    const createBlog = jest.fn();

    const component = render(<BlogForm createBlog={createBlog} />);

    const title = component.container.querySelector("#title"); //#DOM element.
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");
    const form = component.container.querySelector("form");

    fireEvent.change(title, {
      target: { value: "Frontend 102" },
    });
    fireEvent.change(author, {
      target: { value: "Frontario End" },
    });
    fireEvent.change(url, {
      target: { value: "www.frontend102.com" },
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("Frontend 102");
    expect(createBlog.mock.calls[0][0].author).toBe("Frontario End");
    expect(createBlog.mock.calls[0][0].url).toBe("www.frontend102.com");
  });
});
