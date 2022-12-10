import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { UseFormRegister } from 'react-hook-form'

const PasswordField: React.FC<TextFieldProps & UseFormRegister> = ({ register, ...props }, ref): JSX.Element => {
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
