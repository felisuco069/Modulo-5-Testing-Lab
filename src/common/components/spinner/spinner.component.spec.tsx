import { render, screen } from '@testing-library/react';
import React from 'react';
import * as promiseTracker from 'react-promise-tracker/lib/trackerHook';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent spec', () => {
  it('Should return SpinnerComponent if a tracked promise is called', () => {
    //Arrange
    // stub

    const stub = jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockImplementation(() => ({ promiseInProgress: true }));

    //Act
    render(<SpinnerComponent />);
    const presentationElement = screen.getByRole('presentation');

    //Assert
    expect(presentationElement).toBeInTheDocument();
  });
  it('Should not return SpinnerComponent if a tracked promise is resolved', () => {
    //Arrange
    // stub

    const stub = jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockImplementation(() => ({ promiseInProgress: true }));
    const stub2 = jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockImplementation(() => ({ promiseInProgress: false }));

    //Act
    render(<SpinnerComponent />);
    const presentationElement = screen.queryByRole('presentation');

    //Assert
    expect(presentationElement).not.toBeInTheDocument();
  });
});
