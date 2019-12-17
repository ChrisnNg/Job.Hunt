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

  it("contains title of site", () => {
    cy.contains("Job.Hunt");
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
    cy.get("[data-cy=numOfResults]").select("50");
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=jobs]")
      .children()
      .should("have.length", 50);
  });

  it("searching Canada yields at the first 5 jobs as job in Canada", () => {
    cy.get("[data-cy=location]").type("Canada");
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=jobs]")
      .children()
      .contains("Canada")
      .parent()
      .next()
      .contains("Canada")
      .parent()
      .next()
      .contains("Canada")
      .parent()
      .next()
      .contains("Canada")
      .parent()
      .next()
      .contains("Canada");
  });

  it("searching React yields at least one developer job", () => {
    cy.get("[data-cy=title]").type("React");
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=jobs]")
      .children()
      .contains("developer");
  });
});
