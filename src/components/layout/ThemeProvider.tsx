'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{ theme: Theme }>({ theme: 'light' });

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Inline script to set data-theme before React hydrates (prevents FOUC).
 * Reads defaultTheme from a data attribute on the script tag.
 */
function ThemeScript({ defaultTheme }: { defaultTheme: Theme }) {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.setAttribute('data-theme','${defaultTheme}')`,
      }}
    />
  );
}

export function ThemeProvider({
  theme,
  children,
}: {
  theme: Theme;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext value={{ theme }}>
      <ThemeScript defaultTheme={theme} />
      {children}
    </ThemeContext>
  );
}
