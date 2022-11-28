import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

interface ThemeProps {
    children: JSX.Element
}

enum themePallete {
    BG = '#1c1917`',
    PRIMARY = '#0070c0',
    FONT_PRIMARY = "Nunito, monospace",
    FONT_SECONDARY = "JetBrains Mono, monospace",
}

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: themePallete.BG,
        },
        primary: {
            main: themePallete.PRIMARY,
        }
    },
    typography: {
        fontFamily: themePallete.FONT_PRIMARY,
    },
    components: {
        MuiButton: {
            defaultProps: {
                style: {
                    textTransform: 'none',
                }
            }
        }
    }
});

export const ThemeConfig: React.FC<ThemeProps> = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
                {children}
        </ThemeProvider>
    )
}