describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach('acessa o site', () => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('teste teste teste', 10) //vai repetir 10x a string
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type(longText, {delay: 0}) //podemos passar para o type como segundo argumento um objeto 
    // //aqui passamos o delay:0 pq o padrao é 10ms, o que pode deixar o teste lento quando tivermos que escrever um texto longo em algum campo
    
    cy.get('button[type="submit"]').click() //pega uma tag "button" que tenha a propriedade type = submit
    cy.contains('button', 'Enviar').click() //uma forma de identificar os componentes que nao possuem IDs, classes... usar o CONTAINS

    cy.get(".success").should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('walmyr@talkingabouttesting')
    cy.get('#open-text-area').type('obrigado!')
    cy.get('button[type="submit"]').click()
    
    cy.get(".error").should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor nao-numerico', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('obrigado!')
    cy.get('button[type="submit"]').click()

    cy.get('.phone-label-span').should('be.visible')
    cy.get(".error").should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Walmyr')
      .should('have.value', 'Walmyr')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Lima')
      .should('have.value', 'Lima')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('walmyr@talkingabouttesting.com')
      .should('have.value', 'walmyr@talkingabouttesting.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get(".error").should('be.visible')
  })

// dados fixos:
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit() // comandos customizados: support/commands.js

    cy.get(".success").should('be.visible')
  })

// dados enviados: 
  it('envia o formuário com sucesso usando um comando customizado 2', () => {
    const data = {
      firstName: 'ana',
      lastName: 'silva',
      email: 'ana@test.com',
      text: 'teste',
    }
    
    cy.fillMandatoryFieldsAndSubmit2(data) // comandos customizados: support/commands.js

    cy.get(".success").should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado3', () => {
    cy.fillMandatoryFieldsAndSubmit3() // comandos customizados: support/commands.js

    cy.get(".success").should('be.visible')
  })

})
