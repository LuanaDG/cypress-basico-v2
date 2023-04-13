Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Luana')
    cy.get('#lastName').type('DG')
    cy.get('#email').type('luana@gmail.com')
    cy.get('#open-text-area').type('testando')
    cy.get('button[type="submit"]').click()
})