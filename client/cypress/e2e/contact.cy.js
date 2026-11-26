
describe('Contact Form E2E Test', () => {
  it('allows a visitor to submit a contact message', () => {

    // Visit the Contact page
    cy.visit('/contact');

    // Verify the page heading
    cy.contains('h1', 'Contact Me').should('be.visible');

    // Fill in the contact form
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Smith');
    cy.get('input[name="contactNumber"]').type('4165551234');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('textarea[name="message"]').type('Cypress E2E test message');

    // Monitor the actual backend request
    cy.intercept('POST', '**/api/contacts').as('saveContact');

    // Submit the form
    cy.contains('button', 'Submit').click();

    // Verify successful backend response
    cy.wait('@saveContact').then((request) => {
      expect(request.response.statusCode).to.be.oneOf([200, 201]);
    });

    // Verify the thank-you message
    cy.contains(
      'Thank you, John Smith. Your message has been safely saved.'
    ).should('be.visible');

    // Verify redirection to Home
    cy.location('pathname').should('eq', '/');
  });
});
