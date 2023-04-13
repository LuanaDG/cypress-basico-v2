// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longTest = 'Text long, text l text long,Text long, text llong,Text long, text long'
        cy.get('#firstName').type('Luana')
        cy.get('#lastName').type('DG')
        cy.get('#email').type('luana@gmail.com')
        cy.get('#open-text-area').type(longTest, { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Luana')
        cy.get('#lastName').type('DG')
        cy.get('#email').type('luana@gmail,com')
        cy.get('#open-text-area').type('textando')
        cy.get('button[type="submit"]').click()

       
    })
    it('campo telefone continua vazio quando preenchido com valor não numérico', function () {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Luana')
        cy.get('#lastName').type('DG')
        cy.get('#email').type('luana@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('textando')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Luana').should('have.value', 'Luana').clear().should('have.value', '')
        cy.get('#lastName').type('DG').should('have.value', 'DG').clear().should('have.value', '')
        cy.get('#email').type('luana@gmail.com').should('have.value', 'luana@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('1234567890').should('have.value', '1234567890').clear().should('have.value', '')
        cy.get('#open-text-area').type('textando').should('have.value', 'textando').clear().should('have.value', '')
    })

})