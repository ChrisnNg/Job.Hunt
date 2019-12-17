/// <reference types="Cypress" />

context("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("cy.reload() - reload the page", () => {
    // https://on.cypress.io/reload
    cy.reload();

    // reload the page without using the cache
    cy.reload(true);
  });

  it("submiting default values returns 10 results", () => {
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=jobs]")
      .children()
      .should("have.length", 10);
  });

  it("submiting default values returns 10 results", () => {
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=jobs]")
      .children()
      .should("have.length", 10);
  });

  it("increasing num of requested results yields more", () => {
    cy.get("[data-cy=results-dropdown]").select("50");
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=jobs]")
      .children()
      .should("have.length", 50);
  });
});
