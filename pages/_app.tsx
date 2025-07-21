import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { initializeStore } from '../redux/common/store';
const store = initializeStore();
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../common/styles/theme';
import { ThemeContextProvider, useThemeMode } from '../components/ThemeContext/ThemeContext';
import { GlobalStyles } from '../common/styles/GlobalStyles';
import ThemeRegistry from '../components/ThemeRegistry/ThemeRegistry';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useEffect, useState } from 'react';

function AppWithTheme({ Component, pageProps }: AppProps) {
  const { mode } = useThemeMode?.() || { mode: 'light' };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const theme = mode === 'dark' ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ThemeRegistry>
        <Header />
        <main style={{ minHeight: '80vh', paddingTop: '72px' }}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ThemeRegistry>
    </ThemeProvider>
  );
}

export default function MyApp(props: AppProps) {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <AppWithTheme {...props} />
      </ThemeContextProvider>
    </Provider>
  );
} 