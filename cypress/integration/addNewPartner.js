/// <reference types="Cypress" />

describe("Test adding a new partner", () => {
    let randomString = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    let companyName = 'User ' + randomString;
    let email = randomString + '@gmail.com';

    beforeEach(() => {
        cy.visit('https://autotest.worksuite.com/api/users/login/t/42b214fa1bda49e09d1110293762c3ae/');
        cy.get('.btn-inner-text').contains('Add partner').click();
    });

    it("Add a new partner correctly", () => {
        cy.get('[placeholder="Name"]').type(companyName);
        cy.get('[placeholder="Email"]').type(email);
        cy.get('.onboarding-workflow-selector__template__checkbox multistate-checkbox')
            .click().find('.multistate-checkbox--full').should('be.visible');
        cy.get('.partners-add__section__message-header-inner input').check({
            force: true
        }).should('be.checked');
        cy.get('.btn-inner-text').contains('Add & Invite to Worksuite').click();
        cy.location('pathname', {
            timeout: 10000
        }).should('include', '/partners/shortlist/search/');
        cy.get('[ng-if="canSortResults()"] .dropdown-toggle').click();
        cy.get('.dropdown-menu a').contains('Date invited').click();
        cy.get('.vendor-item-name').first().should('have.attr', 'title', companyName);
    });

    it("Add a new partner without filling company name", () => {
        cy.get('[placeholder="Email"]').type(email);
        cy.get('.btn-inner-text').contains('Add to Index').click();
        cy.get('[placeholder="Name"]+.partners-add__new-vendor__error').should('have.text', ' Name is required. ');
    });
});