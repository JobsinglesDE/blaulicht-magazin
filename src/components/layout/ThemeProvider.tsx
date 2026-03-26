'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeScript({ defaultTheme }: { defaultTheme: Theme }) {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(function(){var t=localStorage.getItem('theme')||'${defaultTheme}';document.documentElement.setAttribute('data-theme',t)})()`,
      }}
    />
  );
}

export function ThemeProvider({
  theme: defaultTheme,
  children,
}: {
  theme: Theme;
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored && (stored === 'dark' || stored === 'light')) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  return (
    <ThemeContext value={{ theme, toggle }}>
      <ThemeScript defaultTheme={defaultTheme} />
      {children}
    </ThemeContext>
  );
}
