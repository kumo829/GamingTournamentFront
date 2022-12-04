import React from 'react'
import { AppBar, Button, Container, Divider, Grid, Stack, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { NavButton } from '../config/theme.config'

export const NavBar: React.FC<{}> = () => {
  return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Container maxWidth="xl">
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography>JT</Typography>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" spacing={2}>
                                    <Button component={NavButton} to="/home">Link 1</Button>
                                    <Divider />
                                    <Button component={NavButton} to="/home">Link 2</Button>
                                    <Divider />
                                    <Button component={NavButton} to="/home">Link 3</Button>
                                    <Divider />
                                    <Button component={NavButton} to="/">Login</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
  )
}
