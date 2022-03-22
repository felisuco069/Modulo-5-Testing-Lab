describe('Login specs', () => {
  it('visit the login page', () => {
    cy.visit('/');
  });

  it('should name input has the focus when it clicks on it', () => {
    // Arrange
    // Act
    cy.visit('/');
    cy.findByRole('textbox').click();

    // Assert
    cy.findByRole('textbox').should('have.focus');
  });
  it('should show a message when type invalid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = '1234';
    // Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.get('input[name="password"]').as('passwordInput'); // no puedo usar findByRole porque el passwor no tiene role y aparte no tiene asociada ninguna label.

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.findAllByRole('alert').should(
      'contain.text',
      'Usuario y/o password no válidos'
    );
  });
  it('should navigate to submodule list when type valid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'test';
    // Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.get('input[name="password"]').as('passwordInput'); // no puedo usar findByRole porque el password no tiene role y aparte no tiene asociada ninguna label.

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.url().should('include', 'submodule-list');
    cy.findAllByRole('heading', {
      level: 6,
      name: 'Origin - Project tracker',
    });
  });
});
