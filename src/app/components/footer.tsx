import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import Image from "next/image";
import logo from "../../../public/assets/TIX ID.png";
import instagram from "../../../public/assets/Union.png";
import twitter from "../../../public/assets/path.png";
import facebook from "../../../public/assets/icon.png";
import playstore from "../../../public/assets/Google Play.png";
import appstore from "../../../public/assets/App Store.png";

const Footer = () => {
  return (
    <>
    <Box
      sx={{
        borderTop: "1px solid #BDC5D4",
        // width: "100%",
        backgroundColor: "white",
        padding: { sm: "36px", md: "36px 60px" },
        position: "relative",
        bottom: "0",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          sx={{
            display: { xs: "flex" },
            flexDirection: "column",
            alignItems: { xs: "center" },
          }}
          xs={12}
          sm={4}
          md={2}
        >
          <Image src={logo} alt="Logo" />
        </Grid>
        <Grid
          sx={{
            display: { xs: "flex" },
            flexDirection: "column",
            alignItems: { xs: "center" },
          }}
          xs={12}
          sm={4}
          md={2}
        >
          <Typography variant="body2" fontWeight="600" margin="10px 0">
            Perusahaan
          </Typography>
          <Typography variant="body2" color="text.primary" margin="10px 0">
            Kontak Kami
          </Typography>
          <Typography variant="body2" color="text.primary" margin="10px 0">
            Tentang
          </Typography>
          <Typography variant="body2" color="text.primary" margin="10px 0">
            Partner
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: { xs: "flex" },
            flexDirection: "column",
            alignItems: { xs: "center" },
          }}
          xs={12}
          sm={4}
          md={2}
        >
          <Typography variant="body2" fontWeight="600" margin="10px 0">
            Seputar
          </Typography>
          <Typography variant="body2" color="text.primary" margin="10px 0">
            TIX ID News
          </Typography>
          <Typography variant="body2" color="text.primary" margin="10px 0">
            Bioskop
          </Typography>
          <Typography variant="body2" color="text.primary" margin="10px 0">
            Tiket Saya
          </Typography>
          <Typography variant="body2" color="text.primary" margin="10px 0">
            Pembayaran
          </Typography>
          <Typography variant="body2" color="text.primary" margin="10px 0">
            Cicilan
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: { xs: "flex" },
            flexDirection: "column",
            alignItems: { xs: "center" },
          }}
          xs={12}
          sm={4}
          md={2}
        >
          <Typography variant="body2" fontWeight="600" margin="10px 0">
            Dukungan
          </Typography>
          <Typography variant="body2" color="text.primary" margin="10px 0">
            Pusat Bantuan
          </Typography>
          <Typography variant="body2" color="text.primary" margin="10px 0">
            Kebijakan Privasi
          </Typography>
          <Typography variant="body2" color="text.primary" margin="10px 0">
            FAQ
          </Typography>
          <Typography variant="body2" color="text.primary" margin="10px 0">
            Syarat dan Ketentuan
          </Typography>
          <Typography variant="body2" color="text.primary" margin="10px 0">
            Update Covid-19
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: { xs: "flex" },
            flexDirection: "column",
            alignItems: { xs: "center" },
          }}
          xs={12}
          sm={8}
          md={4}
        >
          <Typography variant="subtitle1" fontWeight="600" margin="10px 0">
            Follow Social Media
          </Typography>
          <Box display="flex" margin="16px 0">
            <Image
              src={instagram}
              alt="instagram"
              style={{ marginRight: "16px", marginBottom: "16px" }}
            />
            <Image
              src={twitter}
              alt="twitter"
              style={{ marginRight: "16px", marginBottom: "16px" }}
            />
            <Image
              src={facebook}
              alt="facebook"
              style={{ marginRight: "16px", marginBottom: "16px" }}
            />
          </Box>
          <Typography variant="subtitle1" fontWeight="600" margin="10px 0">
            Download Aplikasi TIX ID
          </Typography>
          <Box display="flex" margin="10px 0">
            <Image
              src={playstore}
              alt="Google play store"
              style={{ marginRight: "16px" }}
            />
            <Image src={appstore} alt="Apple app store" />
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Footer;
