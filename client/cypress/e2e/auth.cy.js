
describe('Authentication E2E Test', () => {
  it('allows a registered user to sign in and sign out', () => {

    // Visit the Sign In page
    cy.visit('/signin');

    // Verify the page heading
    cy.contains('h1', 'Sign In').should('be.visible');

    // Enter test account credentials
    cy.env(['TEST_EMAIL', 'TEST_PASSWORD'], { log: false }).then((env) => {
    cy.get('input[name="email"]').type(env.TEST_EMAIL, { log: false });
    cy.get('input[name="password"]').type(env.TEST_PASSWORD, { log: false });
    });

    // Monitor the authentication request
    cy.intercept('POST', '**/auth/signin').as('signin');

    // Sign in
    cy.contains('button', 'Sign In').click();

    // Verify successful backend response
    cy.wait('@signin').its('response.statusCode').should('eq', 200);

    // Verify successful authentication
    cy.contains('Signed in successfully!').should('be.visible');
    cy.contains('h1', 'My Account').should('be.visible');

    // Verify authentication details in sessionStorage
    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('jwt')).to.not.be.empty;
      expect(win.sessionStorage.getItem('role')).to.equal('user');
    });

    // Sign out
    cy.contains('button', 'Sign Out').click();

    // Verify return to the Sign In form
    cy.contains('h1', 'Sign In').should('be.visible');

    // Verify authentication details are removed
    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('jwt')).to.be.null;
      expect(win.sessionStorage.getItem('role')).to.be.null;
    });
  });
});


