import { Grid, Button } from "@mui/material";
import { FC } from "react";

interface AggregationButtonsProps {}

export const AggregationButtons: FC<AggregationButtonsProps> = () => {
  return (
    <Grid
      container
      spacing={5}
      alignItems="center"
      alignContent="center"
      style={{ marginTop: 0, flexDirection: "column" }}
    >
      <Grid item xs={3}>
        <Button
          fullWidth
          onClick={() => {
            console.log("1st button clicked");
          }}
          variant="contained"
        >
          Aggregate by projects
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          fullWidth
          onClick={() => {
            console.log("2nd button clicked");
          }}
          variant="contained"
        >
          Aggregate by employee and projects
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          fullWidth
          onClick={() => {
            console.log("3rd button clicked");
          }}
          variant="contained"
        >
          Aggregate by projects and employee
        </Button>
      </Grid>
    </Grid>
  );
};
