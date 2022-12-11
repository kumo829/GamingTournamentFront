import React from 'react'
import { Typography, TypographyProps } from '@mui/material'
import { useTranslation } from 'react-i18next'

export interface TranslatedTypographyProps {
  i18nkey: string
  count?: number
  component: React.ElementType
}

const TranslatedTypography: React.FC<TranslatedTypographyProps & TypographyProps > = ({ i18nkey, count = 1, ...props }): JSX.Element => {
  const { t } = useTranslation()
  return (<Typography {...props}>
        {t(i18nkey, { count })}
    </Typography>)
}

export default TranslatedTypography
