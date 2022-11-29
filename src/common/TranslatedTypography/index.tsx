import { Typography, TypographyProps } from '@mui/material'
import { Trans } from 'react-i18next'

interface TranslationProperties {
    children: string,
    i18nKey: string,
    count: number,
    otherProps: TypographyProps,
}

const TranslatedTypography: React.FC<TranslationProperties> = ({
    children,
    i18nKey,
    count = 1,
    ...otherProps
}) => {
    return (
        <Typography  {...otherProps}>
            <Trans i18nKey={i18nKey} count={count}>
                {children}
            </Trans>
        </Typography>
    )
}

export default TranslatedTypography;