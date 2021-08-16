// import React from 'react';
// import renderWithRouter from './renderWithRouter';
// import FooterMenu from '../components/FooterMenu';

// describe('19 - Implemente os elementos do menu inferior', () => {
//   it('Tem os data-testids', () => {
//     const { getByTestId } = renderWithRouter(<FooterMenu />);

//     expect(getByTestId('footer')).toBeInTheDocument();
//     expect(getByTestId('drinks-bottom-btn')).toBeTruthy();
//     expect(getByTestId('explore-bottom-btn')).toBeTruthy();
//     expect(getByTestId('food-bottom-btn')).toBeTruthy();
//   });
// });

// describe('20 - Posicione o menu inferior de forma fixa e apresente 3 ícones', () => {
//   ('O menu inferior deve ficar fixado sempre ao final da página', () => {
//     // const { getByTestId } = renderWithRouter(<FooterMenu />);
//     // Ainda a desenvolver
//   });

//   it('Apresenta os ícones corretos', () => {
//     // const { getByTestId } = renderWithRouter(<FooterMenu />);
//     // const icon = getByTestId('drinks-bottom-btn');
//     // const src = icon.node.props.src
//     // expect(getByTestId('drinks-bottom-btn')).
//     // cy.get('[data-testid="drinks-bottom-btn"]')
//     //   .should('have.attr', 'src')
//     //   .should('include', 'drinkIcon');

//     // cy.get('[data-testid="explore-bottom-btn"]')
//     //   .should('have.attr', 'src')
//     //   .should('include', 'exploreIcon');

//     // itcy.get('[data-testid="food-bottom-btn"]')
//     //   .should('have.attr', 'src')
//     //   .should('include', 'mealIcon');
//   });
// });

// const hasNoFooter = () => {
//   cy.get('[data-testid="footer"]').should('not.exist');
//   cy.get('[data-testid="drinks-bottom-btn"]').should('not.exist');
//   cy.get('[data-testid="explore-bottom-btn"]').should('not.exist');
//   cy.get('[data-testid="food-bottom-btn"]').should('not.exist');
// };

// const hasFooter = () => {
//   cy.get('[data-testid="footer"]');
//   cy.get('[data-testid="drinks-bottom-btn"]');
//   cy.get('[data-testid="explore-bottom-btn"]');
//   cy.get('[data-testid="food-bottom-btn"]');
// };

// it('Não tem footer na tela de login', () => {
//   cy.visit('http://localhost:3000/');

//   hasNoFooter();
// });

// it('Tem footer na tela de principal de receitas de comidas', () => {
//   cy.visit('http://localhost:3000/comidas');

//   hasFooter();
// });

// it('Tem footer na tela de principal de receitas de bebidas', () => {
//   cy.visit('http://localhost:3000/bebidas');

//   hasFooter();
// });

// it('Não tem footer na tela de detalhes de uma receita de comida', () => {
//   cy.visit('http://localhost:3000/comidas/52771');

//   hasNoFooter();
// });

// it('Não tem footer na tela de detalhes de uma receita de bebida', () => {
//   cy.visit('http://localhost:3000/bebidas/178319');

//   hasNoFooter();
// });

// it('Não tem footer na tela de receita em processo de comida', () => {
//   cy.visit('http://localhost:3000/comidas/52771/in-progress');

//   hasNoFooter();
// });

// it('Não tem footer na tela de receita em processo de bebida', () => {
//   cy.visit('http://localhost:3000/bebidas/178319/in-progress');

//   hasNoFooter();
// });

// it('Tem footer na tela de explorar', () => {
//   cy.visit('http://localhost:3000/explorar');

//   hasFooter();
// });
// describe('21 - Exiba o menu inferior apenas nas telas indicadas pelo protótipo', () => {

// it('Tem footer na tela de explorar comidas', () => {
//   cy.visit('http://localhost:3000/explorar/comidas');

//   hasFooter();
// });

// it('Tem footer na tela de explorar bebidas', () => {
//   cy.visit('http://localhost:3000/explorar/bebidas');

//   hasFooter();
// });

// it('Tem footer na tela de explorar comidas por ingrediente', () => {
//   cy.visit('http://localhost:3000/explorar/comidas/ingredientes');

//   hasFooter();
// });

// it('Tem footer na tela de explorar bebidas por ingrediente', () => {
//   cy.visit('http://localhost:3000/explorar/bebidas/ingredientes');

//   hasFooter();
// });

// it('Tem footer na tela de explorar comidas por local de origem', () => {
//   cy.visit('http://localhost:3000/explorar/comidas/area');

//   hasFooter();
// });

// it('Tem footer na tela de perfil', () => {
//   cy.visit('http://localhost:3000/perfil');

//   hasFooter();
// });

// it('Não tem footer na tela de receitas feitas', () => {
//   cy.visit('http://localhost:3000/receitas-feitas');

//   hasNoFooter();
// });

// it('Não tem footer na tela de receitas favoritas', () => {
//   cy.visit('http://localhost:3000/receitas-favoritas');

//   hasNoFooter();
// });
// });

// describe('22 - Redirecione a pessoa usuária para uma lista de cocktails', () => {
//   it('Redireciona para a rota correta', () => {
//     // cy.visit('http://localhost:3000/comidas');

//     // cy.get('[data-testid="drinks-bottom-btn"]').click();
//     // cy.location().should((loc) => expect(loc.pathname).to.eq('/bebidas'));
//   });
// });

// describe('23 - Redirecione a pessoa usuária para a tela de explorar', () => {
//   it('Redireciona para a rota correta', () => {
//     // cy.visit('http://localhost:3000/comidas');

//     // cy.get('[data-testid="explore-bottom-btn"]').click();
//     // cy.location().should((loc) => expect(loc.pathname).to.eq('/explorar'));
//   });
// });

// describe('24 - Redirecione a pessoa usuárua para uma lista de comidas', () => {
//   it('Redireciona para a rota correta', () => {
//     // cy.visit('http://localhost:3000/bebidas');

//     // cy.get('[data-testid="food-bottom-btn"]').click();
//     // cy.location().should((loc) => expect(loc.pathname).to.eq('/comidas'));
//   });
// });
