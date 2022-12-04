import {
  Alert,
  Avatar,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Box
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import React, { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Send } from '@mui/icons-material'
import { Trans, useTranslation } from 'react-i18next'
import CreateAccountForm from '../../components/CreateAccountForm'

interface FormData {
  email: string
  password: string
}

const Login: React.FC<{}> = () => {
  const [values, setValues] = useState({
    showPass: false,
    error: false,
    loading: false
  })

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

  const onSubmit = (data: any): void => {
    console.log(errors)
    console.log(data)

    setValues({
      ...values,
      error: false,
      loading: true
    })
  }

  const handlePassVisibilty = (): void => {
    setValues({
      ...values,
      showPass: !values.showPass
    })
  }

  return (
        <>
            <Container maxWidth="sm">
                <Grid
                    container
                    spacing={2}
                    direction="column"
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
                            <Typography component="h1" variant="h4" marginBottom={5}>
                                <Trans i18nKey="login.title">
                                    Login
                                </Trans>
                            </Typography>

                        </Grid>
                        <Box component="form">
                            <Grid container direction="column" spacing={3}>
                                <Grid item>
                                    <TextField
                                        type="email"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        label={t('login.form.fields.email')}
                                        placeholder={`${t('login.form.fields.email')}`}
                                        variant="outlined"
                                        fullWidth
                                        {...register('email')}
                                        error={!(errors.email == null)}
                                    />
                                    <Typography variant="subtitle1" color="error.main">
                                        {errors.email?.message}
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <TextField
                                        type={values.showPass ? 'text' : 'password'}
                                        fullWidth
                                        label={t('login.form.fields.password')}
                                        placeholder={`${t('login.form.fields.password')}`}
                                        variant="outlined"
                                        required
                                        {...register('password')}
                                        error={!(errors.password == null)}
                                        InputProps={{
                                          endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handlePassVisibilty}
                                                        aria-label="toggle password"
                                                        edge="end"
                                                    >
                                                        {values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                                        type="submit"
                                        fullWidth
                                        endIcon={<Send />}
                                        loading={values.loading}
                                        loadingPosition="end"
                                        variant="contained"
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
        </>
  )
}

export default Login
