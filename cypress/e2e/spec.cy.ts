describe('Go to Garden Helper Test', () => {
  it('Visits Garden Helper', () => {
    cy.visit('http://localhost:4200/')
  })
})

describe('Nav Bar Test', () => {
  it('Visits Garden Helper', () => {
    cy.visit('http://localhost:4200/')

    cy.contains('My Garden').click({force: true})
    cy.location('pathname').should('eq', '/mygarden')
    cy.go('back')
    
    cy.contains('Alerts').click({force: true})
    cy.location('pathname').should('eq', '/alerts')
    cy.go('back')

    cy.contains('Gardening Goodies').click({force: true})
    cy.location('pathname').should('eq', '/goodies')
    cy.go('back')

    cy.contains('Our Mission').click({force: true})
    cy.location('pathname').should('eq', '/ourmission')
    cy.go('back')

    cy.contains('Contact Us').click({force: true})
    cy.location('pathname').should('eq', '/contact')
    cy.go('back')

    cy.contains('Sign up').click({force: true})
    cy.location('pathname').should('eq', '/signup')
    cy.go('back')

    cy.contains('Log in').click({force: true})
    cy.location('pathname').should('eq', '/login')
    cy.go('back')
  })
})
