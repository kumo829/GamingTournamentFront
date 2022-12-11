import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { UseFormRegister } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'

export interface PasswordFormValues extends FieldValues {
  password: string
  email: string
}

interface PasswordFieldProps {
  register: UseFormRegister<PasswordFormValues>
}

const PasswordField: React.FC<TextFieldProps & PasswordFieldProps> = ({ register, ...props }): JSX.Element => {
  const [showPass, setShowPass] = useState(false)

  return <TextField
    type={showPass ? 'text' : 'password'}
    {...props}
    {...register('password')}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={() => { setShowPass(!showPass) }}
            aria-label="toggle password"
            edge="end"
          >
            {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </InputAdornment>
      )
    }}
  />
}

export default PasswordField
