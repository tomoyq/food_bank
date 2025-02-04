import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6', // blue-500 (Tailwind)
      light: '#60a5fa', // blue-400 (Tailwind)
      dark: '#2563eb', // blue-600 (Tailwind)
    },
    secondary: {
      main: '#000000', // gray-500 (Tailwind)
      light: '#9ca3af', // gray-400 (Tailwind)
      dark: '#4b5563', // gray-600 (Tailwind)
    },
    error: {
      main: '#ef4444', // red-500 (Tailwind)
      light: '#f87171', // red-400 (Tailwind)
      dark: '#dc2626', // red-600 (Tailwind)
    },
    warning: {
      main: '#f59e0b', // yellow-500 (Tailwind)
      light: '#fbbf24', // yellow-400 (Tailwind)
      dark: '#d97706', // yellow-600 (Tailwind)
    },
    info: {
      main: '#3b82f6', // blue-500 (Tailwind)
      light: '#60a5fa', // blue-400 (Tailwind)
      dark: '#2563eb', // blue-600 (Tailwind)
    },
    success: {
      main: '#10b981', // green-500 (Tailwind)
      light: '#34d399', // green-400 (Tailwind)
      dark: '#059669', // green-600 (Tailwind)
    },
  }
})