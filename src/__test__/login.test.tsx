import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../pages/login'

describe('Login component', () => {
  test('renders translated form', () => {
    render(<Login />)
    expect(screen.getByText(/Enter/i)).toBeInTheDocument()
    expect(screen.getByText(/Login/i)).toBeInTheDocument()
    expect(screen.getByText(/Not an user?/i)).toBeInTheDocument()
  })

  test('form has no errors by default', () => {
    render(<Login />)
    expect(screen.queryByText(/The email is a required field/i)).toBeNull()
    expect(screen.queryByText(/The email format is not correct/i)).toBeNull()
    expect(screen.queryByText(/The password is a required field/i)).toBeNull()
    expect(screen.queryByText(/Email or password is incorrect. Please verify/i)).toBeNull()
  })

  test('form is empty by default', () => {
    const { getByTestId } = render(<Login />)
    const userInput = getByTestId('login-username') as HTMLInputElement
    const passInput = getByTestId('login-password') as HTMLInputElement
    const submit = getByTestId('login-submit')

    expect(userInput.value).toBe('')
    expect(passInput.value).toBe('')
    expect(submit).not.toHaveClass('MuiLoadingButton-loading')
    expect(submit).not.toHaveClass('Mui-disabled')
  })

  test('receives input text', () => {
    const testuser = 'user@mail.com'
    const testpass = 'abc123'

    const { getByTestId } = render(<Login />)

    const userInput = getByTestId('login-username') as HTMLInputElement
    const passInput = getByTestId('login-password') as HTMLInputElement
    const submit = getByTestId('login-submit')

    fireEvent.change(userInput, { target: { value: testuser } })
    expect(userInput).toHaveValue(testuser)

    fireEvent.change(passInput, { target: { value: testpass } })
    expect(passInput).toHaveValue(testpass)

    fireEvent.click(submit)

    expect(submit).toHaveClass('MuiLoadingButton-loading')
    expect(submit).toHaveClass('Mui-disabled')
  })
})
