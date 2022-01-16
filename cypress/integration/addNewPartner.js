/// <reference types="Cypress" />

describe("Test autocomplete dropdown lists behaviour", () => {

    beforeEach(() => {
        visit('https://autotest.worksuite.com/partners/shortlist/search/');
        cy.get('.btn-inner-text').contains('Add partner').click();
    });

    it("Check selecting specific product via autocomplete list", () => {
        cy.get('[placeholder="Name"]').should('be.visible');
    });
})