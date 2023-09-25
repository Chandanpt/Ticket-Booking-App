import React from "react";
import MovieDetails from "./movieDetails";
import { Container, Grid } from "@mui/material";
import Timings from "./timings";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Summary from "./summary";

const Schedule = ({params}:{params:{movieId:number}}) => {
  console.log("movieId",params?.movieId);

  return (
    <>
    <Header />
      <Container sx={{ padding: "48px 32px" }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <Timings />
          </Grid>
          <Grid xs={12} md={4}>
          <Grid xs={12}>
            <MovieDetails />
          </Grid>
          <Grid xs={12}>
            <Summary />
          </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Schedule;
