import { FC } from "react";
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
import { WorkAggregatedByProjectAndEmployee } from "../Models/Aggregations/WorkAggregatedByProjectAndEmployees";

interface WorksByEmployeesAndProjectTableProps {
  worksByEmployeesAndProject: WorkAggregatedByProjectAndEmployee[];
}

export const WorksByEmployeesAndProjectTable: FC<
  WorksByEmployeesAndProjectTableProps
> = (props) => {
  const { worksByEmployeesAndProject } = props;
  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Employee</TableCell>
                  <TableCell align="center">Project</TableCell>
                  <TableCell align="center">Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {worksByEmployeesAndProject.map((row) => {
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
                      <TableCell align="center">{row.employee}</TableCell>
                      <TableCell align="center">{row.project}</TableCell>
                      <TableCell align="center">{row.hours}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};
