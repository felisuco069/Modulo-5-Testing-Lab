import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  it('should display the dialog when isOpen equals true', () => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: () => {},
      title: 'test title',
      labels: {
        closeButton: 'test close button',
        acceptButton: 'test accept button',
      },
      children: 'test id',
    };
    //Act

    render(
      <ConfirmationDialogComponent {...props}>
        {props.children}
      </ConfirmationDialogComponent>
    );

    screen.debug();

    const dialogElement = screen.getByRole('dialog');
    // Assert
    expect(dialogElement).toBeInTheDocument();
  });

  it('should call Onclose when it clicks on closeButton', () => {
    //Arrange
    // spy
    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: jest.fn(),
      title: 'test title',
      labels: {
        closeButton: 'test close button',
        acceptButton: 'test accept button',
      },
      children: 'test id',
    };
    //Act

    render(
      <ConfirmationDialogComponent {...props}>
        {props.children}
      </ConfirmationDialogComponent>
    );

    screen.debug();

    const closeButtonElement = screen.getByRole('button', {
      name: 'test close button',
    });

    userEvent.click(closeButtonElement);
    // Assert
    expect(props.onClose).toHaveBeenCalled();
  });
  it('should call onAccept when it clicks on acceptButton', () => {
    //Arrange
    // spy
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: {
        closeButton: 'test close button',
        acceptButton: 'test accept button',
      },
      children: 'test id',
    };
    //Act

    render(
      <ConfirmationDialogComponent {...props}>
        {props.children}
      </ConfirmationDialogComponent>
    );

    screen.debug();

    const acceptButtonElement = screen.getByRole('button', {
      name: 'test accept button',
    });

    userEvent.click(acceptButtonElement);
    // Assert
    expect(props.onAccept).toHaveBeenCalled();
  });
});
