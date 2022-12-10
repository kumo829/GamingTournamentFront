import React from 'react'
import { Typography, TypographyTypeMap } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface TranslatedTypographyProps extends OverridableComponent<TypographyTypeMap> {
    i18nkey: string
    count?: number
}

const TranslatedTypography: React.FC<TranslatedTypographyProps> = ({ i18nkey, count, ...props }): JSX.Element => {
    const { t } = useTranslation()
    return (<Typography {...props}>
        {t(i18nkey, { count })}
    </Typography>)
}

export default TranslatedTypography
