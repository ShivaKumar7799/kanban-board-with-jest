import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../../components/Dumb components/Loader';

describe('Loader', () => {

  test("renders loader component correctly", () => {
    render(<Loader />)
  })

  test('snapshot of loader component', () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });

});