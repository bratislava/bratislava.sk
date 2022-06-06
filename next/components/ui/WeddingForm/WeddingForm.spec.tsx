import { render } from '@testing-library/react';

import { WeddingForm } from './WeddingForm';

describe('WeddingForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WeddingForm />);
    expect(baseElement).toBeTruthy();
  });
});
