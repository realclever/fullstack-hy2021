describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "matt",
      username: "matt",
      password: "matt",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Blog app");
    cy.contains("username");
    cy.contains("password");
    cy.get("#username"); //username field
    cy.get("#password"); //password field
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("matt");
      cy.get("#password").type("matt");
      cy.get("#login-button").click();
      cy.get(".success").contains("Successful login!"); //noti
      cy.contains("logged in as matt");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("matt");
      cy.get("#password").type("password");
      cy.get("#login-button").click();

      cy.get(".failure").should("contain", "Wrong username/password"); //noti
      cy.get("html").should("not.contain", "logged in as matt");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "matt", password: "matt" });
    });

    it("blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Cypress title");
      cy.get("#author").type("Cypress author");
      cy.get("#url").type("www.cypressurl.com");
      cy.get("#create").click();
      cy.contains("Cypress title - Cypress author");
      cy.get(".success").contains(
        "New blog Cypress title by Cypress author was added" //noti
      );
    });
  });

  describe("Logged in with one blog created", function () {
    beforeEach(function () {
      cy.login({ username: "matt", password: "matt" });
      cy.createBlog({
        title: "Cypress title",
        author: "Cypress author",
        url: "www.cypressurl.com",
        //likes default 0
      });
    });

    it("blog can be liked", function () {
      cy.get("#view").click();
      cy.get("#like").click();
      cy.get(".success").contains("+1");
      cy.get("html").should("contain", "likes: 1");
      cy.get("#like").click();
      cy.get(".success").contains("+1");
      cy.get("html").should("contain", "likes: 2");
    });

    it("blog can be removed", function () {
      cy.get("#view").click();
      cy.get("#remove").click();
      cy.get(".success").contains("Blog removed successfully");
      cy.get("html").should("not.contain", "Cypress title - Cypress author");
    });
  });
}); //end
