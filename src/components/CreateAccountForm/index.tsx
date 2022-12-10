import { yupResolver } from '@hookform/resolvers/yup'
import { Save, Close, Backspace, Info } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Drawer,
  Link,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  styled,
  IconButton,
  Divider,
  Button,
  InputAdornment,
  Tooltip,
  Avatar
} from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import TranslatedTypography from '../TranslatedTypography'

interface FormData {
  firstname: string
  lastname: string
  email: string
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-start'
}))

const CreateAccountForm: React.FC<{}> = () => {
  const { t } = useTranslation()

  const formValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required(`${t('register.form.errors.email.required')}`)
      .email(`${t('register.form.errors.email.format')}`),
    firstname: Yup.string().required(`${t('register.form.errors.firstname')}`),
    lastname: Yup.string().required(`${t('register.form.errors.lastname')}`)
  })

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleOpenForm = (): void => {
    setOpen(!open)
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(formValidationSchema)
  })

  const onSubmit = (data: any): void => {
    setLoading(true)
    console.log(errors)
    console.log(data)
  }

  return (
    <>
      <Link href='#' onClick={toggleOpenForm}>
        <Trans i18nKey="register.link">register.link</Trans>
      </Link>

      <Drawer open={open} anchor="right" variant="persistent">
        <DrawerHeader>
          <IconButton onClick={toggleOpenForm} disabled={loading}>
            <Close />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{ width: { xs: '100vw', md: '75vw', lg: '50vw' } }} role="presentation">
          <Paper elevation={2} sx={{ width: '90%', p: 2, m: '0 auto', mt: 10 }}>
            <Avatar sx={{ display: 'flex', alignItems: 'flex-start', width: 60, height: 60 }} variant="square" src="img/register/create_account.svg" />
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <TranslatedTypography component="h1" variant="h4" marginBottom={5} i18nkey='register.title' />
            </Grid>
            <Box component="form">
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <TextField
                    data-testid="register-name-input"
                    required
                    autoFocus
                    disabled={loading}
                    autoComplete="firstname"
                    label={t('register.form.fields.firstname')}
                    placeholder={`${t('register.form.fields.firstname')}`}
                    variant="outlined"
                    fullWidth
                    {...register('firstname')}
                    error={!(errors.firstname == null)}
                    inputProps={{ 'data-testid': 'login-username' }}
                  />
                  <Typography variant="subtitle1" color="error.main">
                    {errors.firstname?.message}
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    data-testid="register-name-input"
                    required
                    disabled={loading}
                    autoComplete="lastname"
                    label={t('register.form.fields.lastname')}
                    placeholder={`${t('register.form.fields.lastname')}`}
                    variant="outlined"
                    fullWidth
                    {...register('lastname')}
                    error={!(errors.lastname == null)}
                    inputProps={{ 'data-testid': 'login-username' }}
                  />
                  <Typography variant="subtitle1" color="error.main">
                    {errors.lastname?.message}
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    data-testid="register-user-input"
                    type="email"
                    required
                    disabled={loading}
                    autoComplete="email"
                    label={t('register.form.fields.email')}
                    placeholder={`${t('register.form.fields.email')}`}
                    variant="outlined"
                    fullWidth
                    {...register('email')}
                    error={!(errors.email == null)}
                    inputProps={{ 'data-testid': 'login-username' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="You will receive an confirmation email to activate your account" placement='left-start' arrow>
                            <IconButton>
                              <Info />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Typography variant="subtitle1" color="error.main">
                    {errors.email?.message}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  alignItems='center'
                  justifyContent="space-around"
                >
                  <Grid item xs={4}>
                    <Button
                      variant='outlined'
                      fullWidth
                      startIcon={<Backspace />}
                      disabled={loading}
                      onClick={toggleOpenForm}
                    ><Trans i18nKey="register.form.buttons.cancel" /></Button>
                  </Grid>
                  <Grid item xs={4}>
                    <LoadingButton
                      type="submit"
                      fullWidth
                      endIcon={<Save />}
                      loading={loading}
                      loadingPosition="end"
                      variant="contained"
                      data-testid="login-submit"
                      onClick={handleSubmit(onSubmit)}>
                      <Trans i18nKey="register.form.buttons.enter" />
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Drawer>
    </>
  )
}

export default CreateAccountForm
