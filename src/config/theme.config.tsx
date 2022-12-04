import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

interface ThemeProps {
  children: JSX.Element
}

enum themePallete {
  BG = '#1c1917`',
  PRIMARY = '#0070c0',
  FONT_PRIMARY = 'Nunito, monospace',
  FONT_SECONDARY = 'JetBrains Mono, monospace',
}

export const NavButton = React.forwardRef<HTMLAnchorElement, Omit<NavLinkProps, 'to'> & { href: NavLinkProps['to'] }>((props, ref) => {
  const { href, ...other } = props
  // Map href (MUI) -> to (react-router)
  return <NavLink ref={ref} to={href} role={undefined} {...other} style={({ isActive }) => isActive ? { textTransform: 'none', background: `${themePallete.PRIMARY}`, color: '#FFF' } : { textTransform: 'none' }} />
})

NavButton.displayName = 'NavButton'

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: themePallete.BG
    },
    primary: {
      main: themePallete.PRIMARY
    }
  },
  typography: {
    fontFamily: themePallete.FONT_PRIMARY
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: 'none'
        }
      }
    }
  }
})

export const ThemeConfig: React.FC<ThemeProps> = ({ children }) => {
  return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
                {children}
        </ThemeProvider>
  )
}
