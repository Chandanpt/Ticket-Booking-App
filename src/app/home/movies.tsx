"use client"

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import data from "../../../public/json/data.json";
import { store } from "../../redux/store";
import { useRouter } from "next/navigation";

const Movies = () => {

    const movies = data.movies.slice(0, 3);

  const router = useRouter();


    const scheduleHandler = (Id: number) => {
      console.log("dataaaaaaa", data.movies.slice(0,2), Id);
      router.push(`/schedule/${Id}`);
    };

  return (
    <>
      <Box>
        <Typography variant="h6" style={{color: "#414A63", fontWeight: "600"}}>Movies</Typography>
        <Typography variant="body1" style={{color: "#414A63", margin: "8px 0 20px"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        </Typography>
        <Grid container spacing={6}>
        {movies.map((item, id) => (
          <Grid item md={4} sm={6} xs={12} key={id}>
              <Box sx={{width: "100%", height: "500px"}}>
              <Image
                src={item.imageUrl}
                alt={item.title}
                layout="responsive"
                style={{borderRadius: "8px", cursor: "pointer"}}
                width={400}
                height={600}
                onClick={() => scheduleHandler(item.id)}
              />
              </Box>
              <Box style={{padding: "30px 0"}}>
              <Typography variant="h6" fontWeight="600" color="#333333" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="#414A63"    >
                  {item.genre.join(", ")}
                </Typography>
              </Box>
          </Grid>
        ))}
      </Grid>
      </Box>
    </>
  );
};

export default Movies;
