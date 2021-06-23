import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, prettyDOM, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog tests", () => {
  const blog = {
    title: "Frontend 101",
    author: "Frontario End",
    url: "www.frontend101.com",
    likes: 8,
    user: {
      name: "Front End",
      username: "Fend",
    },
  };

  let component;
  let like = jest.fn();

  beforeEach(() => {
    component = render(<Blog blog={blog} user={blog.user} handleLike={like} />);
  });

  test("renders title and author by default, but no url or likes", () => {
    //component.debug();

    const visible = component.container.querySelector(".visible"); //className visible
    console.log(prettyDOM(visible));
    expect(visible).toBeVisible();
    //expect(visible).toHaveStyle("display: block");

    const hidden = component.container.querySelector(".hidden"); //className hidden
    console.log(prettyDOM(hidden)); //prints out the hidden part
    expect(hidden).not.toBeVisible();
    //expect(hidden).toHaveStyle("display: none"); //same as class="hidden"
  });

  test("renders url and likes after view button is pushed", () => {
    const hidden = component.container.querySelector(".hidden"); //className hidden
    expect(hidden).toHaveStyle("display: none");

    const button = component.getByText("view");
    fireEvent.click(button);

    expect(hidden).toBeVisible();
    expect(hidden).toHaveStyle("display: block");
  });

  test("render stuff", () => {
    const button = component.getByText("like");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(like.mock.calls).toHaveLength(2);
    //CI=true npm test -- --coverage
  });
});
