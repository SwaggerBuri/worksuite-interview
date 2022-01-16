/// <reference types="Cypress" />

describe("Test adding a new job opening", () => {
    let jobTitle = 'Very Important Person';

    beforeEach(() => {
        cy.visit('https://autotest.worksuite.com/api/users/login/t/42b214fa1bda49e09d1110293762c3ae/');
        cy.visit('https://autotest.worksuite.com/marketplace/job-openings/list/?archived=false')
        cy.get('.btn-inner-text').contains('New job opening').click();
    });

    it("Add a new job opening correctly", () => {
        cy.get('[placeholder="Job title"]').type(jobTitle);
        cy.get('.btn-default').contains('Create job opening').click();
        cy.url().should('contain', '/marketplace/job-openings/details');
        cy.get('.action-bar-title').should('have.text', ' Very Important Person ');
    });

    it("Add a new job opening without filling job title", () => {
        cy.get('.btn-default').scrollIntoView({
            duration: 1000
        }).contains('Create job opening').click();
        cy.get('[placeholder="Job title"]').then(($element) => {
            expect($element).to.have.css('border-color', 'rgb(255, 127, 138)');
        });
        cy.get('.MuiAlert-message div div').should('contain', 'Please fill out every mandatory field');
    });
});