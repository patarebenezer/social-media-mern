import React, { useEffect, useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyle from './style'
import Input from './Input'
import Icon from './Icon'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { gapi } from 'gapi-script'
import { useHistory } from 'react-router-dom'
import { signIn, signUp } from '../../redux/actions/auth'

function Auth() {
  const classes = useStyle()
  const dispatch = useDispatch()
  const [ showPassword, setShowpassword] = useState(false)
  const [ formData, setFormdata] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
  })
  // set button berubah jadi sign in dan sign up
  const [isSignup, setIsSignUp] = useState(false)
  // setbutton untuk view password dan tidak
  const handleShowPassword = () => setShowpassword((prevShowPassword) => !prevShowPassword)
  const history = useHistory()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
        dispatch(signUp(formData, history))
    } else {
        dispatch(signIn(formData, history))
    }
  }

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value})
  }

  // switch mode untuk tampilan login dan sign up
  const switchMode = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup)
    setShowpassword(true)
  }

  useEffect(() => {
    function start(){
        gapi.client.init({
            clientId:"42979663757-psn7k4oa6t2vf3hlacjndg1onpf3j9go.apps.googleusercontent.com",
            scope:""
        })
    }
        gapi.load('client:auth2', start)
    })

  const googleSuccess = async (res) => {
      const result = res?.profileObj
      const token = res?.tokenId
      try {
          dispatch({type:'AUTH', data:{result, token}})
          history.push('/')
      } catch (error) {
          
      }
  }

  const googleFailure = (error) => {
    console.log(error);
    // console.log('Google sign in was unsuccessful, Try again later!')  
  }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half></Input>
                                <Input name='lastName' label="Last Name" handleChange={handleChange} half></Input>
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}/>}
                </Grid>
                <br />
                
                <Button type='submit' fullWidth variant='contained' color='primary' className='classes.submit'>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <br />
                <br />
                <GoogleLogin 
                    clientId={"42979663757-psn7k4oa6t2vf3hlacjndg1onpf3j9go.apps.googleusercontent.com"}
                    render={(renderProps) => (
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained'>
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={"single_host_origin"}
                />
                <br />
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode} color='primary'>
                            {isSignup ? 'Already have an account ? Sign In' : 'Sign Up'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>

    </Container>
  )
}

export default Auth