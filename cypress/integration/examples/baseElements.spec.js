/// <reference types="Cypress" />

context("baseElements", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("cy.reload() - reload the page", () => {
    // https://on.cypress.io/reload
    cy.reload();

    // reload the page without using the cache
    cy.reload(true);
  });

  it("contains title of site", () => {
    cy.contains("Job.Hunt");
  });
});
