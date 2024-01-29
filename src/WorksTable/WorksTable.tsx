import { FC } from "react";
import { Work } from "../Models/Work";
import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { AggregationButtons } from "../AggregationButtons/AggregationButtons";

interface WorksTableProps {
  works: Work[];
}

export const WorksTable: FC<WorksTableProps> = (props) => {
  const { works } = props;
  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Project</TableCell>
                  <TableCell align="center">Employee</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {works.map((row) => {
                  const rowName: string = (Math.random() + 1)
                    .toString(36)
                    .substring(7);
                  return (
                    <TableRow
                      key={rowName}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">{row.project.name}</TableCell>
                      <TableCell align="center">{row.employee.name}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.hours}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <AggregationButtons />
      </Grid>
    </>
  );
};
