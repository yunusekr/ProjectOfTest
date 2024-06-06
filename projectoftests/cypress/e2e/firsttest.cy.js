describe("template spec", () => {
  beforeEach(() => {
    it("passes", () => {
      cy.visit("https://localhost:5173/");
    });
  });
  it("Submits the form successfully and opens the success page", () => {
    cy.visit("/");
    cy.get('input[name="email"]').type("example@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/success");
  });
  it("Displays an error message for incorrect email", () => {
    cy.visit("/");
    cy.get('input[name="email"]').type("invalidemail");
    cy.get('button[type="submit"]').click();
    cy.contains("Please enter a valid email address").should("be.visible");
  });
  it("Displays only one error message at a time", () => {
    cy.visit("/");
    cy.get('input[name="email"]').type("invalidemail");
    cy.get('input[name="password"]').type("pass");
    cy.get('button[type="submit"]').click();
    cy.get(".invalid-feedback").should("have.length", 1);
  });
  it("Displays the correct error message for the input", () => {
    cy.visit("/");
    cy.get('input[name="email"]').type("invalidemail");
    cy.get('button[type="submit"]').click();
    cy.contains("Please enter a valid email address").should("be.visible");
  });
  it("Checks if the button is disabled when form is invalid", () => {
    cy.visit("/");
    cy.get('button[type="submit"]').should("be.disabled");
    cy.get('input[name="email"]').type("example@example.com");
    cy.get('input[name="password"]').type("pass");
    cy.get('button[type="submit"]').should("be.disabled");
  });
  it("Displays error messages for both email and password", () => {
    cy.visit("/");
    cy.get('input[name="email"]').type("invalidemail");
    cy.get('input[name="password"]').type("pass");
    cy.get('button[type="submit"]').click();
    cy.get(".invalid-feedback").should("have.length", 2);
  });
  it("Displays an error message for not accepting terms", () => {
    cy.visit("/");
    cy.get('input[name="email"]').type("example@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.contains("You must agree to the terms").should("be.visible");
  });
});
