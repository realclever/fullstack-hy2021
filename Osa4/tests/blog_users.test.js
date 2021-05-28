const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const tokenHelper = async () => {
  const loginCreds = await api.post("/api/login").send({
    username: "root",
    password: "sekret",
  });
  return loginCreds.body.token;
};

describe("blog tests", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs); //6 blogs
    //jest.setTimeout(30000);
  });

  //all blogs returned as JSON
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  //all blogs (6) returned
  test("all blogs are returned", async () => {
    const res = await api.get("/api/blogs");

    expect(res.body).toHaveLength(helper.initialBlogs.length);
    console.log(helper.initialBlogs.length);
    console.log(helper.initialBlogs);
  });

  //verifies that the unique identifier property of the blog posts is named id
  test("unique identifier", async () => {
    const res = await api.get("/api/blogs");
    const id = res.body.map((n) => n.id);
    expect(id).toBeDefined();
  });

  //a new blog can be added to api/blogs
  test("valid blog can be added", async () => {
    const newBlog = {
      title: "Blog one",
      author: "Test Blogger",
      url: "www.testblog.com",
      likes: 7,
    };

    const token = await tokenHelper();

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/); //json check

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1); //one new blog added
    console.log(blogsAtEnd.length);

    const url = blogsAtEnd.map((n) => n.url);
    expect(url).toContain("www.testblog.com"); //contains url check

    const title = blogsAtEnd.map((n) => n.title);
    expect(title).toContain("Blog one"); //contains title check
  });

  //can't add a blog without a token
  test("blog cannot be added without a token", async () => {
    const newBlog = {
      title: "Blog one",
      author: "Test Blogger",
      url: "www.testblog.com",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401) //returns 401 - unauthorized
      .expect("Content-Type", /application\/json/); //json check

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    console.log(blogsAtEnd.length);
  });

  //verifies that if the likes property is missing from the request, it will default to the value 0
  test("likes is not undefined", async () => {
    const newBlog = {
      title: "Blog one",
      author: "Test Blogger",
      url: "www.testblog.com",
    };
    const token = await tokenHelper();

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const likes = blogsAtEnd.map((n) => n.likes);
    console.log(likes[likes.length - 1]); //default value should be 0 [last value]
    expect(likes).not.toContain(undefined); //no undefined likes check
  });

  //can't add a new blog without a title test
  test("blog without a title is not added", async () => {
    const newBlog = {
      author: "Test Blogger",
      url: "www.testblog.com",
      likes: 99,
    };

    const token = await tokenHelper();

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  //can't add a new blog without a url test
  test("blog without a url is not added", async () => {
    const newBlog = {
      title: "Blog one",
      author: "Test Blogger",
      likes: 99,
    };

    const token = await tokenHelper();

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  //remove a blog
  //UPDATE - needs total rebuild after adding token based authentication
  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    console.log(blogsAtStart);
    const blogToDelete = blogsAtStart[0];

    const token = await tokenHelper();

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", "bearer " + token)
      .expect(204); //removes first blog and returns 204.

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((n) => n.title);
    expect(contents).not.toContain(blogToDelete.title); //doesn't contain first blogs title anymore
    console.log(blogsAtEnd);
  });

  //edit a blog (title) - check edit_blog.rest as well.
  test("blog edit test", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToEdit = blogsAtStart[0];

    blogToEdit.title = "First blog has a new title";

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(blogToEdit)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const title = blogsAtEnd.map((n) => n.title);
    expect(title).toContain("First blog has a new title"); //contains title check
    console.log(title);
  });
});
//-----------------------------------------------------------------------------------------------------------------------//
//user tests

describe("user tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "matt123",
      name: "Matt",
      password: "somesecretpass",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if username is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "te",
      name: "Tester",
      password: "pas",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "User validation failed: username: Path `username` (`" +
        newUser.username +
        "`) is shorter than the minimum allowed length (3)."
    );
    console.log(newUser.username);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length); //user will be not added
  });

  test("creation fails with proper statuscode and message if password is too short/undefined", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "tes",
      name: "Tester",
      password: "pa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Password is too short (minimum is 3 characters)"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
