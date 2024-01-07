import { Grid } from '@mui/material'
import React from 'react'
import Top_Card from '../team_card/Top_Card'

function Top_shop() {

    const lst = [1, 2, 3]

  return (
    <Grid container spacing={1.5} columns={12} justifyContent="center">
            {lst.map((i) => {
                return (
                    <Grid item lg={3} md={4} sm={6} key={i}>
                        <Top_Card top={i} />
                    </Grid>
                )
            })}
        </Grid>
  )
}

export default Top_shop