import { render } from '@testing-library/react';

import RelatedContent from './RelatedContent';

describe('RelatedContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RelatedContent />);
    expect(baseElement).toBeTruthy();
  });
});
