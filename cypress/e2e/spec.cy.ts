describe('Go to Garden Helper Test', () => {
  it('Visits Garden Helper', () => {
    cy.visit('http://localhost:4200/')
  })
})

describe('Nav Bar Test', () => {
  it('Visits Garden Helper', () => {
    cy.visit('http://localhost:4200/')

    cy.contains('My Garden').click({ force: true })
    cy.location('pathname').should('eq', '/mygarden')
    cy.go('back')

    cy.contains('Alerts').click({ force: true })
    cy.location('pathname').should('eq', '/alerts')
    cy.go('back')

    cy.contains('Gardening Goodies').click({ force: true })
    cy.location('pathname').should('eq', '/goodies')
    cy.go('back')

    cy.contains('Our Mission').click({ force: true })
    cy.location('pathname').should('eq', '/ourmission')
    cy.go('back')

    cy.contains('Contact Us').click({ force: true })
    cy.location('pathname').should('eq', '/contact')
    cy.go('back')

    cy.contains('Sign up').click({ force: true })
    cy.location('pathname').should('eq', '/signup')
    cy.go('back')

    cy.contains('Log in').click({ force: true })
    cy.location('pathname').should('eq', '/login')
    cy.go('back')
  })
})

describe('Check Hyperlinks', () => {
  it('check all links to sites', () => {
    const links = ['Gardening Goodies', 'My Garden', 'Alerts']

    links.forEach(link => {

      cy.contains(link).click()
      cy.location('pathname').should('eq', `/${link}`)
      cy.go('back')
  
    })
  });
})

describe('Check SignUp', () => {
  it('enter username and password', () => {
    cy.visit('http://localhost:4200/signup');
    
    cy.get("input[name='firstName']").type("FirstName");
    cy.get("input[name='lastName']").type("LastName");
    cy.get("input[name='email']").type("testemail@mail.com");
    cy.get("input[name='username']").type("userName");
    cy.get("input[name='password']").type("Password");
    cy.get("input[name='confirmPassword']").type("Password");

    cy.get("button[type='submit']").click();

  });
});
