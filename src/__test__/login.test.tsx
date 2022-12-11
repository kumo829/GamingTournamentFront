import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../pages/login'

describe('Login component', () => {
  test('should render translated form', () => {
    render(<Login />)
    expect(screen.getByText(/Enter/i)).toBeInTheDocument()
    expect(screen.getByText(/Login/i)).toBeInTheDocument()
    expect(screen.getByText(/Not an user?/i)).toBeInTheDocument()
  })
  test('form should be empty by default', () => {
    const { getByTestId } = render(<Login />)
    const userInput = getByTestId('login-email') as HTMLInputElement
    const passInput = getByTestId('login-password') as HTMLInputElement
    const submit = getByTestId('login-submit')

    expect(userInput.value).toBe('')
    expect(userInput).toHaveValue('') // alternative form of validate the value
    expect(passInput.value).toBe('')
    expect(submit).not.toBeDisabled()
  })
  test('form should have no errors when empty', () => {
    render(<Login />)
    expect(screen.queryByText(/The email is a required field/i)).toBeNull()
    expect(screen.queryByText(/The email format is not correct/i)).toBeNull()
    expect(screen.queryByText(/The password is a required field/i)).toBeNull()
    expect(screen.queryByText(/Email or password is incorrect. Please verify/i)).toBeNull()
  })
  test('should display error message when email is empty', async () => {
    render(<Login />)
    const submit = screen.getByTestId('login-submit')

    await act(() => {
      fireEvent.click(submit)
    })

    expect(screen.getByText('The email is a required field')).toBeInTheDocument()
  })
  it('should display error message when password is empty', async () => {
    render(<Login />)
    const submit = screen.getByTestId('login-submit')

    await act(() => {
      fireEvent.click(submit)
    })

    expect(screen.getByText('The password is a required field')).toBeInTheDocument()
  })
  test('should display error message when email format is not valid', async () => {
    const testuser = 'usermail.com'

    render(<Login />)
    const userInput = screen.getByTestId('login-email')
    const submit = screen.getByTestId('login-submit')

    fireEvent.change(userInput, { target: { value: testuser } })
    expect(userInput).toHaveValue(testuser)

    await act(() => {
      fireEvent.click(submit)
    })

    expect(screen.getByText('The email format is not correct')).toBeInTheDocument()
  })
  test('should disable inputs when sending a valid request', async () => {
    const testuser = 'user@mail.com'
    const testpass = 'abc123'

    render(<Login />)

    const userInput = screen.getByTestId('login-email')
    const passInput = screen.getByTestId('login-password')
    const submit = screen.getByTestId('login-submit')

    fireEvent.change(userInput, { target: { value: testuser } })
    expect(userInput).toHaveValue(testuser)

    fireEvent.change(passInput, { target: { value: testpass } })
    expect(passInput).toHaveValue(testpass)

    await act(() => {
      fireEvent.click(submit)
    })

    expect(userInput).toBeDisabled()
    expect(passInput).toBeDisabled()
    expect(submit).toBeDisabled()
    expect(submit).toHaveClass('Mui-disabled')
    expect(submit).toHaveClass('MuiLoadingButton-loading')
  })
})
