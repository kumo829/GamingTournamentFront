import { Link } from '@mui/material'
import React from 'react'
import { Trans } from 'react-i18next'

const CreateAccountForm: React.FC<{}> = () => {
  return (<>
    <Link>
      <Trans i18nKey="register.link">
      register.link
      </Trans>
    </Link>
  </>)
}

export default CreateAccountForm
