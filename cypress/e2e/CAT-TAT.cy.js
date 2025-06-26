describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach('acessa o site', () => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    const longText = Cypress._.repeat('teste teste teste', 10) //vai repetir 10x a string
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type(longText, {delay: 0}) //podemos passar para o type como segundo argumento um objeto 
    // //aqui passamos o delay:0 pq o padrao é 10ms, o que pode deixar o teste lento quando tivermos que escrever um texto longo em algum campo
    
    cy.get('button[type="submit"]').click() //pega uma tag "button" que tenha a propriedade type = submit
    cy.contains('button', 'Enviar').click() //uma forma de identificar os componentes que nao possuem IDs, classes... usar o CONTAINS

    cy.get(".success").should('be.visible')

    cy.tick(3000)

    cy.get(".success").should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('walmyr@talkingabouttesting')
    cy.get('#open-text-area').type('obrigado!')
    cy.get('button[type="submit"]').click()
    
    cy.get(".error").should('be.visible')

    cy.tick(3000)
    cy.get(".error").should('not.be.visible')

  })

  it('campo telefone continua vazio quando preenchido com valor nao-numerico', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#phone-checkbox').check().should('be.checked')
    cy.get('#open-text-area').type('obrigado!')
    cy.get('button[type="submit"]').click()

    cy.get('.phone-label-span').should('be.visible')
    cy.get(".error").shou
    
    cy.tick(3000)
    cy.get(".error").should('not.be.visible')

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
    cy.clock()
    cy.get('button[type="submit"]').click()
    cy.get(".error").should('be.visible')
    cy.tick(3000)
    cy.get(".error").should('not.be.visible')
  })

// dados fixos:
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit() // comandos customizados: support/commands.js

    cy.get(".success").should('be.visible')

    cy.tick(3000)
    cy.get(".success").should('not.be.visible')

  })

// dados enviados: 
  it('envia o formuário com sucesso usando um comando customizado 2', () => {
    cy.clock()
    const data = {
      firstName: 'ana',
      lastName: 'silva',
      email: 'ana@test.com',
      text: 'teste',
    }
    
    cy.fillMandatoryFieldsAndSubmit2(data) // comandos customizados: support/commands.js

    cy.get(".success").should('be.visible')
    cy.tick(3000)
    cy.get(".success").should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado3', () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit3() // comandos customizados: support/commands.js

    cy.get(".success").should('be.visible')
    cy.tick(3000)
    cy.get(".success").should('not.be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube') // em maiusculo pq o conteudo de uma das options é YouTube
      .should('have.value', 'youtube') // o valor é em minusculo, por que é o valor de uma das options
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria') 
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1) 
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  // rever a funcao each e wrap
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => { //a funcao each recebe como argumento uma funcao... e essa funcao vai receber como argumento, cada um dos radios button
        cy.wrap(typeOfService) //vai empacotar cada tipo de atendimento
          .check()
          .should('be.checked')
      })
  })

  it('marca TODOS os checkboxes, depois desmarca o ultimo', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

    // cy.get('#email-checkbox').check().should('be.checked')
    // cy.get('#phone-checkbox').check().should('be.checked')

  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => { //o should tambem pode receber uma funcao de call back
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag and drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action : 'drag-drop'})
      .should(input => { 
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  // it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  //   cy.fixture('example.json').as('sampleFile')
  //   cy.get('#file-upload')
  //     .selectFile('@sampleFile')
  //     .should(input => { 
  //       expect(input[0].files[0].name).to.equal('example.json')
  //     })
  // })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () =>{
    cy.get('#open-text-area').invoke('val', 'um texto qualquer')
      .should('have.value', 'um texto qualquer')
  })

  it.only('faz uma requisição HTTP', () =>{
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')

    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAT TAT')
  })

})
