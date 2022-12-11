import {
  Alert,
  Avatar,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material'
import React, { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Send } from '@mui/icons-material'
import { Trans, useTranslation } from 'react-i18next'
import CreateAccountForm from '../../components/CreateAccountForm'
import TranslatedTypography from '../../components/TranslatedTypography'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import authService from './auth.service'
import { useNavigate } from 'react-router-dom'

interface FormData {
  email: string
  password: string
}

const Login: React.FC<{}> = (): JSX.Element => {
  const [values, setValues] = useState({
    error: false,
    loading: false
  })

  const [showPass, setShowPass] = useState(false)

  const { t } = useTranslation()

  sessionStorage.removeItem('token')

  const formValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required(`${t('login.form.errors.email.required')}`)
      .email(`${t('login.form.errors.email.format')}`),
    password: Yup.string()
      .required(`${t('login.form.errors.password')}`)
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(formValidationSchema)
  })

  const navigate = useNavigate()

  const onSubmit = (data: FormData): void => {
    setValues({
      ...values,
      error: false,
      loading: true
    })

    authService
      .login(data.email, data.password)
      .then(
        (response) => {
          setValues({
            ...values,
            error: false,
            loading: false
          })

          navigate('/profile')
        })
      .catch((err) => {
        setValues({
          ...values,
          error: true,
          loading: false
        })
        console.error(err)
      }
      )
  }

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Paper elevation={2} sx={{ padding: 5 }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar sx={{ width: 70, height: 70 }} src="/img/robocode.jpg" />
            <TranslatedTypography component="h1" variant="h4" marginBottom={5} i18nkey='login.title' />

          </Grid>
          <Box component="form">
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <TextField
                  type="email"
                  required
                  autoFocus
                  autoComplete="email"
                  disabled={values.loading}
                  label={t('login.form.fields.email')}
                  placeholder={`${t('login.form.fields.email')}`}
                  variant="outlined"
                  fullWidth
                  {...register('email')}
                  error={!(errors.email == null)}
                  inputProps={{ 'data-testid': 'login-email' }}
                />
                <Typography variant="subtitle1" color="error.main">
                  {errors.email?.message}
                </Typography>
              </Grid>

              <Grid item>
              <TextField
                  type={showPass ? 'text' : 'password'}
                  fullWidth
                  disabled={values.loading}
                  label={t('login.form.fields.password')}
                  placeholder={`${t('login.form.fields.password')}`}
                  variant="outlined"
                  required
                  {...register('password')}
                  error={!(errors.password == null)}
                  inputProps={{ 'data-testid': 'login-password' }}
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
                <Typography variant="subtitle1" color="error.main">
                  {errors.password?.message}
                </Typography>
              </Grid>

              <Grid item>
                <LoadingButton
                  disabled={values.loading}
                  type="submit"
                  fullWidth
                  endIcon={<Send />}
                  loading={values.loading}
                  loadingPosition="end"
                  variant="contained"
                  data-testid="login-submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  <Trans i18nKey="login.form.buttons.enter">
                    Enter
                  </Trans>
                </LoadingButton>
              </Grid>

              {values.error && <Grid item>
                <Alert severity="error">{t('login.form.errors.access')}</Alert>
              </Grid>}
            </Grid>
          </Box>
        </Paper>
        <Grid item>
          <CreateAccountForm />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
