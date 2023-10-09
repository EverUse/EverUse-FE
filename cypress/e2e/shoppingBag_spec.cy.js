// TEST SHOPPING BAG PAGE //

/* eslint-disable no-undef */
describe("Shopping Bag Page", () => {
  beforeEach(() => {
    cy.stubRequestsDynamically();
    cy.visit("http://localhost:3000/#products");
    cy.wait("@GetAllItems");
    cy.clearCookies()
    cy.fillCart();
  });

  it("Should show shopping bag details", () => {
    cy.get("h1").contains("Shopping Bag");
    cy.get(".bag__items").children().should("have.length", 3);
    cy.get(".bag__items")
      .children()
      .first()
      .get("p")
      .contains("Bracelet")
      .get("p")
      .contains("Size: M")
      .get("p")
      .contains("Color: Moss")
      .get("p")
      .contains("Unit Price: $20.00")
      .get(".item__quantity")
      .contains("2")
      .get(".item__price")
      .contains("$40.00");
    cy.get(".bag__items")
      .children()
      .last()
      .get("p")
      .contains("Dog Leash")
      .get("p")
      .contains("Size: Onesize")
      .get("p")
      .contains("Color: Lime")
      .get("p")
      .contains("Unit Price: $30.00")
      .get(".item__quantity")
      .contains("1")
      .get(".item__price")
      .contains("$30.00");
    cy.get("h2").contains("Request Summary");
    cy.get("p").contains("Order Subtotal:");
    cy.get(".bag__total").contains("$130.00");
    cy.get(".bag__button").contains("Continue to Request");
  });

  it("Should change quantities and prices", () => {
    cy.get(".counter__plus")
      .first()
      .click()
      .get(".counter__plus")
      .first()
      .click()
      .get(".item__price")
      .first()
      .contains("$80.00")
      .get(".bag__total")
      .contains("$170.00");
    cy.get(".counter__minus")
      .first()
      .click()
      .get(".item__price")
      .first()
      .contains("$60.00")
      .get(".bag__total")
      .contains("$150.00");

    cy.get(".counter__plus")
      .last()
      .click()
      .get(".counter__plus")
      .last()
      .click()
      .get(".item__price")
      .last()
      .contains("$90.00")
      .get(".bag__total")
      .contains("$210.00");
    cy.get(".counter__minus")
      .last()
      .click()
      .get(".item__price")
      .last()
      .contains("$60.00")
      .get(".bag__total")
      .contains("$180.00");
  });

  it ("Should be directed to checkout page", () => {
    cy.get(".bag__button")
      .contains("Continue to Request")
      .click();
    cy.url().should("eq", "http://localhost:3000/checkout");
  })

  it("Should delete items and redirect to products section of landing page", () => {
    cy.get(".item__delete")
      .first()
      .click()
      .get(".bag__total")
      .contains("$90.00");
    cy.get(".item__delete")
      .last()
      .click()
      .get(".bag__total")
      .contains("$60.00");
    cy.get(".item__delete")
      .click()
      .get("h2")
      .contains("Your shopping bag is empty.")
      .get(".bag__button")
      .contains("Continue Shopping")
      .click();
    cy.url().should("eq", "http://localhost:3000/#products");
  });
});
