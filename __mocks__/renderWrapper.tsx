import React, { PropsWithChildren, ReactNode } from 'react';
import { render } from '@testing-library/react';
import ThemeWrapper from '@components/ThemeWrapper'
import { GlobalStyles } from '@theme/ThemeConfig'
import { Provider } from 'react-redux'
import { store } from '@store/Store'

// eslint-disable-next-line
const ProvidersWrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Provider store={store}>
            <ThemeWrapper>
              <GlobalStyles />
              { children }
          </ThemeWrapper>
          </Provider>
  );
}

const customRender = (component: any, options?: any) => {
  return render(component, { wrapper: ProvidersWrapper, ...options });
}

// re-export everything
//export * from '@testing-library/react';

// override render method
export { customRender };