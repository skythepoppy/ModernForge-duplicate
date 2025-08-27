import React from 'react'
import { Gi3dHammer } from "react-icons/gi";
import { Grid, Typography, Button, Box} from '@mui/material'

const Footer = () => {
    return (
        <div>
            <Grid className='bg-gray-900 text-gray-300 text-center mt-10'
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                sx={{ bgcolor: "gray-900", color: "gray-300", py: 3 }}>

                <Grid item xs={12} sm={6} md={3} textAlign={'left'}>
                    <Gi3dHammer className="text-orange-500 w-12 h-12 mx-auto mb-3" />
                    <Typography variant="body2" sx={{ maxWidth: "250px", mx: "auto", textAlign: "center" }}>
                        At ModelForge, our mission is to inspire builders of all ages to craft, play, and enjoy the art of building together.
                    </Typography>
                    <Box
                        sx={{
                            maxWidth: "250px",
                            mx: "auto",
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "orange.900",
                            boxShadow: 1,
                        }}
                    >
                        <Typography variant="body2" fontWeight="bold">
                            ModernForge
                        </Typography>
                        <Typography variant="body2">
                            1234 Qualhurst Ln Suite 4
                        </Typography>
                        <Typography variant="body2">
                            Travherst, TX 1470
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant='h6' gutterBottom>Quick Links</Typography>
                    <Button color="inherit">About</Button><br />
                    <Button color="inherit">Newsletter</Button><br />
                    <Button color="inherit">Earn $$$</Button><br />
                    <Button color="inherit">Blog</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant='h6' gutterBottom>Support</Typography>
                    <Button color="inherit">Help Center</Button><br />
                    <Button color="inherit">Contact Us</Button><br />
                    <Button color="inherit">Shipping Info</Button><br />
                    <Button color="inherit">Returns</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant='h6' gutterBottom>Legal</Typography>
                    <Button color="inherit">Privacy Policy</Button><br />
                    <Button color="inherit">Return Policy</Button><br />
                    <Button color="inherit">Terms & Conditions</Button><br />
                    <Button color="inherit">Shipping Policies</Button>
                </Grid>
            </Grid>

        </div>

    )
}

export default Footer
