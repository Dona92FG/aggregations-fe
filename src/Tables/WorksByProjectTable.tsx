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
import { WorkAggregatedByProject } from "../Models/Aggregations/WorkAggregatedByProject";

interface WorksByProjectTableProps {
  worksByProject: WorkAggregatedByProject[];
}

export const WorksByProjectTable: FC<WorksByProjectTableProps> = (props) => {
  const { worksByProject } = props;
  return (
    <>
      <Grid container style={{padding: '0px 30px'}} alignItems="center">
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Project</TableCell>
                  <TableCell align="center">Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {worksByProject.map((row) => {
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
