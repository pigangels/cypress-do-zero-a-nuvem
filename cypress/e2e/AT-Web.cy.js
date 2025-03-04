describe('Arctouch Website', () => {
  it('verifica o título da aplicação', () => {
    cy.visit('https://arctouch.com/')
    cy.title().should('be.equal', 'ArcTouch - Lovable Apps, Websites, & Connected Experiences')
    cy.get('#mantine-xgari6y5t')
  })
})
