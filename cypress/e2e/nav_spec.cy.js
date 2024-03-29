/* eslint-disable no-undef */


describe('nav', () => {
  beforeEach(() => {
    cy.stubRequestsDynamically();
    cy.visit('http://localhost:3000/');
    cy.wait('@GetAllItems');
  })

  it('should display a nav bar with a logo and a hamburger menu', () => {
    cy.get('.nav__logo').should('be.visible')
    cy.get('.nav__burger').should('be.visible')
  })

  it('should display a menu when the hamburger menu is clicked', () => {
    cy.get('.nav__burger').click()
    cy.get('.nav__right').should('be.visible')
    cy.get('.nav__right').should('contain', 'Shop')
    cy.get('.nav__right').should('contain', 'About Us')
    cy.get('.nav__right').should('contain', 'View Cart')
  })

  it('should navigate to appropriate section when link is clicked', () => {
    cy.get('.nav__burger').click()
    cy.get('.nav__right').find('li').eq(0).click()
    cy.get('.products__header').should('contain', 'Products')
    cy.get('.nav__burger').click()
    cy.get('.nav__right').find('li').eq(1).click()
    cy.get('.about__header').should('contain', 'About Us')
    cy.get('.nav__burger').click()
    cy.get('.nav__right').find('li').eq(2).click()
    cy.url().should('include', '/shopping-bag')
  })

  it('should navigate home when the logo is clicked', () => {
    cy.get('.nav__burger').click()
    cy.get('.nav__right').find('li').eq(2).click()
    cy.url().should('include', '/shopping-bag')
    cy.get('.nav__logo').click()
    cy.get('.landing__text').should('be.visible')
  })

  it('should close menu when user clicks outside menu', () => {
    cy.get('.nav__burger').click()
    cy.get('.nav__right').should('be.visible')
    cy.get('.landing').click()
    cy.get('.nav__right').should('not.exist')
    cy.get('.nav__burger').click()
    cy.get('.nav__right').should('be.visible')
    cy.get('.products__header').click()
    cy.get('.nav__right').should('not.exist')
    cy.get('.nav__burger').click()
    cy.get('.nav__right').should('be.visible')
    cy.get('.about').click()
    cy.get('.nav__right').should('not.exist')
  } )
})