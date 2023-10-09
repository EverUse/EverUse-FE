describe('test layouts without userflow', () => {
  beforeEach(() => {
    cy.stubRequestsDynamically();
    cy.visit('http://localhost:3000/products/beerKoozie');
    cy.wait('@GetItem');
  })

  it('should locate the right elements', () => {
    cy.get('.details__header').should('have.css', 'background-image', 'url("http://localhost:3000/static/media/detail-horizontal-bg.4ba54468bd483e6c6dc5.jpg")')
    cy.get('.details__header-text').contains('Products handmade from upcycled climbing ropes in an effort to reduce waste')
    cy.get('.product-description-text').contains('EverUse collects and upcycles used climbing rope into high-quality crafts and products. As two fellow rock climbers, we are passionate about both the sport and planet.')
    cy.get('.details-order-form__title').find('p').eq(0).contains('Beer Koozie')
    cy.get('.multiple-choice-container').find('label').should('have.length', 3)
    cy.get('.details-order-form__selection-pair').should('have.css', 'flex-direction', 'column')
    cy.get('#colorOptions').should('have.class', 'details-order-form__faded')
    cy.get('#colorOptions').find('option').should('have.length', 5)
    cy.get('#colorOptions').find('option').first().contains('Choose color')
    cy.get('#quantityOptions').should('have.value', 1)
    cy.get('#quantityOptions').find('option').should('have.length', 9)
    cy.get('.details-order-form__btn-container').children().should('have.length', 2)
    cy.get('.details-order-form__btn-container').find('button').eq(0).should('be.disabled')
    cy.get('.details-order-form__btn-container').find('button').eq(0).contains('Add to Bag')
    cy.get('.details-order-form__btn-container').find('button').eq(1).should('be.disabled')
    cy.get('.details-order-form__btn-container').find('button').eq(1).contains('Cart')
  })

  it('should show the right elements for dog leash', () => {
    cy.visit('http://localhost:3000/products/dogLeash')
    cy.wait('@GetItem')
    cy.get('.details__header').should('have.css', 'background-image', 'url("http://localhost:3000/static/media/detail-horizontal-bg.4ba54468bd483e6c6dc5.jpg")')
    cy.get('.details__header-text').contains('Products handmade from upcycled climbing ropes in an effort to reduce waste')
    cy.get('.product-description-text').contains('EverUse collects and upcycles used climbing rope into high-quality crafts and products. As two fellow rock climbers, we are passionate about both the sport and planet.')
    cy.get('.details-order-form__title').find('p').eq(0).contains('Dog Leash')
    cy.get('.single-choice-container').find('label').should('have.length', 1)
    cy.get('.details-order-form__selection-pair').should('have.css', 'flex-direction', 'column')
    cy.get('#colorOptions').should('have.class', 'details-order-form__faded')
    cy.get('#colorOptions').find('option').should('have.length', 5)
    cy.get('#colorOptions').find('option').first().contains('Choose color')
    cy.get('#quantityOptions').should('have.value', 1)
    cy.get('#quantityOptions').find('option').should('have.length', 9)
    cy.get('.details-order-form__btn-container').children().should('have.length', 2)
    cy.get('.details-order-form__btn-container').find('button').eq(0).should('be.disabled')
    cy.get('.details-order-form__btn-container').find('button').eq(0).contains('Add to Bag')
    cy.get('.details-order-form__btn-container').find('button').eq(1).should('be.disabled')
    cy.get('.details-order-form__btn-container').find('button').eq(1).contains('Cart')
  })

  it('should change layouts as screen width changes', () => {
    cy.viewport(801,1000)
    cy.get('.details__info').should('have.css', 'flex-direction', 'row')
    cy.get('.details__info-product').should('have.css', 'flex-direction', 'column')
    cy.get('.details__header').should('have.css', 'background-position', '50% 50%')
    cy.viewport(799, 1000)
    cy.get('.details__info').should('have.css', 'flex-direction', 'column')
    cy.get('.details__info-product').should('have.css', 'flex-direction', 'row')
    cy.get('.details__header').should('have.css', 'background-position', '0% 0%')
    cy.viewport(601, 1000)
    cy.get('.details__info').should('have.css', 'flex-direction', 'column')
    cy.get('.details__info-product').should('have.css', 'flex-direction', 'row')
    cy.viewport(599, 1000)
    cy.get('.details__info').should('have.css', 'flex-direction', 'column')
    cy.get('.details__info-product').should('have.css', 'flex-direction', 'column')
  })
})

describe('test userflows', () => {
  beforeEach(() => {
    cy.stubRequestsDynamically();
    cy.visit('http://localhost:3000/products/beerKoozie');
    cy.wait('@GetItem');
  })

  it('should activate the buttons', () => {
    cy.fillForm('S', 'orangePlaid', 2 )
  })

  it('should add items to the cart', () => {
    cy.get('.details-order-form__btn-container').find('button').eq(1).should('be.disabled')
    cy.fillForm('S', 'orangePlaid', '2')
    cy.get('.details-order-form__cart-count').contains('2')
    cy.get('button').contains('Cart').click()
    cy.url().should('eq', 'http://localhost:3000/shopping-bag')
    cy.get('.bag__items').children().should('have.length', 1)
    cy.checkBagItem('Beer Koozie', 'S', 'Orange Plaid', 25, 2)
    cy.get('.item__delete').click()
    cy.get('h2').contains('Your shopping bag is empty')
  })

  it('should be able to add same and different item to the cart', () => {
    cy.fillForm('M', 'moss', '1')
    cy.get('.details-order-form__cart-count').contains('1')
    cy.fillForm('S', 'lime', '1')
    cy.get('.details-order-form__cart-count').contains('2')
    cy.fillForm('M', 'moss', '1')
    cy.get('.details-order-form__cart-count').contains('3')
    cy.get('button').contains('Cart').click()
    cy.url().should('eq', 'http://localhost:3000/shopping-bag')
    cy.get('.bag__items').children().should('have.length', 2)
    cy.checkBagItem('Beer Koozie', 'M', 'Moss', 25, 2)
    cy.checkBagItem('Beer Koozie', 'S', 'Lime', 25, 1)
  })

  it('should change cart count upon different bag item length', () => {
    cy.fillForm('L', 'bluePlaid', '1')
    cy.fillForm('M', 'moss', '1')
    cy.fillForm('S', 'bluePlaid', '3')
    cy.get('.details-order-form__cart-count').contains('5')
    cy.get('button').contains('Cart').click()
    cy.get('.item').eq(0).find('.item__delete').click()
    cy.go(-1)
    cy.get('.details-order-form__cart-count').contains('4')
    cy.get('button').contains('Cart').click()
    cy.get('.item').eq(0).find('.item__delete').click()
    cy.go(-1)
    cy.get('.details-order-form__cart-count').contains('3')
    cy.get('button').contains('Cart').click()
    cy.get('.counter__minus').click()
    cy.go(-1)
    cy.get('.details-order-form__cart-count').contains('2')
    cy.get('button').contains('Cart').click()
    cy.get('.counter__minus').click()
    cy.go(-1)
    cy.get('.details-order-form__cart-count').contains('1')
    cy.get('button').contains('Cart').click()
    cy.get('.counter__minus').click()
    cy.go(-1)
    cy.get('.details-order-form__btn-container').find('button').eq(1).should('be.disabled')
  })

  it('should retain cart count even after reload', () => {
    cy.fillForm('S', 'lime', '7')
    cy.reload()
    cy.get('.details-order-form__cart-count').contains('7')
  })
})