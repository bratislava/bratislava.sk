import { render } from '@testing-library/react';

import StepperStep from './StepperStep';

describe('StepperStep', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StepperStep />);
    expect(baseElement).toBeTruthy();
  });
});
