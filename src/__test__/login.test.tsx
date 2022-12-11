import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../pages/login'
import axios from 'axios'
import * as router from 'react-router'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const navigate = jest.fn()

describe('Login component', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })
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
  test('should navigate to profile page when username and password are valid', async () => {
    const testuser = 'user@mail.com'
    const testpass = 'abc123'

    mockedAxios.post.mockResolvedValue({
      data: {
        email: testuser
      },
      status: 200,
      statusText: 'Ok',
      headers: {
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      },
      config: {}
    })

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

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/profile')
  })
  test('should display an error when username and password are not valid', async () => {
    const testuser = 'user@mail.com'
    const testpass = 'abc123'

    const networkError = new Error('User not found')
    mockedAxios.post.mockRejectedValueOnce(networkError)

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

    expect(userInput).not.toBeDisabled()
    expect(passInput).not.toBeDisabled()
    expect(submit).not.toBeDisabled()
    expect(submit).not.toHaveClass('MuiLoadingButton-loading')
    expect(screen.getByText('Email or password is incorrect. Please verify.')).toBeInTheDocument()
    expect(navigate).toHaveBeenCalledTimes(0)
  })
})
