/**
 * @jest-environment jsdom
 */
import React from 'react'
import StockBadge from '@components/badges/StockBadge'
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import '@inrupt/jest-jsdom-polyfills'
import ThemeWrapper from '@components/ThemeWrapper'
import { GlobalStyles } from '@theme/ThemeConfig'
import { Provider } from 'react-redux'
import { store } from '@store/Store'

describe('StockBadge', () => {
  it('should render correctly when $amount is positive', () => {
      const { getByText, getByTestId } = render(
          <Provider store={store}>
            <ThemeWrapper>
                <GlobalStyles />
                <StockBadge $amount={.10} />
            </ThemeWrapper>
        </Provider>
      );
      
    expect(getByText('10.0%')).toBeInTheDocument();
    expect(getByTestId('stock-up-icon')).toBeInTheDocument();
  });

  it('should render correctly when $amount is negative', () => {
    const { getByText, getByTestId } = render(
        <Provider store={store}>
            <ThemeWrapper>
                <GlobalStyles />
                <StockBadge $amount={-.05} />
            </ThemeWrapper>
        </Provider>
    );
      
    expect(getByText('-5.0%')).toBeInTheDocument();
    expect(getByTestId('stock-down-icon')).toBeInTheDocument();
  });

  it('should render correctly when $amount is zero', () => {
      const { getByText, getByTestId } = render(
        <Provider store={store}>
            <ThemeWrapper>
                <GlobalStyles />
                <StockBadge $amount={0} />
            </ThemeWrapper>
        </Provider>
    );
      
    expect(getByText('0.0%')).toBeInTheDocument();
    expect(getByTestId('stock-neutral-icon')).toBeInTheDocument();
  });
});