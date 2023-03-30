/// <reference types="cypress" />
import login from '../fixtures/login.json';

describe('constuctor page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('show ingredient detail', () => {
        cy.contains('Конструктор');
        cy.contains('Соберите бургер');

        cy.get('[class^=burger-ingredients-item_link]').first().click();
        cy.get('[class^=modal_dialog]').contains('Детали ингредиента');
        cy.get('[class^=modal_close]').click();
        cy.get('[class^=modal_dialog]').should('not.exist');
    });

    it('create order', () => {
        cy.get('[class^=burger-ingredients_list] ul').as('list');
        cy.get('@list').eq(0).find('[class^=burger-ingredients-item_link]').first().as('bun');
        cy.get('@list').eq(1).find('[class^=burger-ingredients-item_link]').first().as('ingredient');
        cy.get('[class^=burger-constructor_burger').first().as('dest');
        cy.get('@dest').children().first().as('bun-dest')
        cy.get('@bun-dest').next().as('ingredient-dest');
        cy.get('[class^=burger-constructor-order_total] button').as('order-button');

        cy.contains('Перетащите булку');
        cy.contains('Перетащите ингридиенты');

        cy.get('@bun').trigger('dragstart');
        cy.get('@bun-dest').trigger('drop');
        cy.get('@ingredient').trigger('dragstart');
        cy.get('@ingredient-dest').trigger('drop');
        cy.get('@order-button').click();

        cy.contains('Вход');
        cy.get('[name=email]').type(login.email);
        cy.get('[name=password]').type(login.password);
        cy.contains('button', 'Войти').click();

        cy.get('@order-button').trigger('click');
        cy.get('[class^=order-details_order-number]', { timeout: 20000 }).contains(/\d+/);
        cy.get('[class^=modal_close]').click();

        cy.contains('Перетащите булку');
        cy.contains('Перетащите ингридиенты');
    });
})