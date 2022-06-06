import { render } from '@testing-library/react';

import TextArea from './TextArea';

describe('TextArea', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextArea />);
    expect(baseElement).toBeTruthy();
  });
});
