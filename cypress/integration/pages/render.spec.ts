import { beforeEach, cy, describe, it } from 'local-cypress';

describe('All Page', () => {
  beforeEach(() => {
    cy.window().then((win) =>
      win.localStorage.setItem('umami.disabled', 'true')
    );
  });

  it('should display index page', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Alchemist');
  });

  it('should display about page', () => {
    cy.visit('/about');
    cy.get('h2').should('contain', 'AlchemistJack');
  });

  it('should display guestbook page', () => {
    cy.visit('/guestbook');
    cy.get('h1').should('contain', 'Guestbook');
  });

  it('should display projects listing page', () => {
    cy.visit('/projects');
    cy.get('h1').should('contain', 'Projects');
  });

  it('should display a project post page', () => {
    cy.visit('/projects/dianaconch');
    cy.get('h1').should('contain', 'Diana Conch');
  });

  it('should display subscribe page', () => {
    cy.visit('/subscribe');
    cy.get('h1').should('contain', 'Subscribe to alchemistjacks.com');
  });

  it('should display trf bca page', () => {
    cy.visit('/trf/bca');
    cy.get('h1').should('contain', 'Rekening BCA');
  });

  it('should display trf mandiri page', () => {
    cy.visit('/trf/mandiri');
    cy.get('h1').should('contain', 'Rekening Mandiri');
  });
});
