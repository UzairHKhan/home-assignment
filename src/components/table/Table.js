import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import groupFindings from "../../data/grouped_findings.json";
import rawFindings from "../../data/raw_findings.json";

const groups = groupFindings;
const rows = rawFindings;

const RawFindingsTable = ({ expandibleRows }) => {
  // console.log("expandibleRows---> ", expandibleRows);
  return;
};

const GroupFindingsTable = ({ groups, index, rows }) => {
  const [expand, setExpand] = useState(false);
  const colors = {low: "#267cff", medium: "#F2BD14", high: "#ff6300", critical: "#ff000c"}
  let rowFindings = rows.filter((row) => index + 1 === row.properties.grouped_finding_id)

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setExpand(!expand)}
          >
            {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ color: "#9dabb1", fontSize: "13px" }}>
            <Typography 
            variant="div" 
            component="div" 
            sx={{
                width: "120px", 
                height: "28px", 
                color: "#ffff", 
                background: `${colors[groups.severity]}`, 
                borderRadius: "4px", 
                justifyContent: "center", 
                alignItems: "center", 
                display: "flex"}}>
                    {groups.severity}
            </Typography>
        </TableCell>
        <TableCell sx={{ color: "#9dabb1", fontSize: "13px" }}>
          {groups.grouped_finding_created}
        </TableCell>
        <TableCell sx={{ color: "#9dabb1", fontSize: "13px" }}>
          {groups.description}
        </TableCell>
        <TableCell sx={{ color: "#9dabb1", fontSize: "13px" }}>
          {groups.security_analyst}
        </TableCell>
        <TableCell sx={{ color: "#9dabb1", fontSize: "13px" }}>
          {groups.owner}
        </TableCell>
        <TableCell sx={{ color: "#9dabb1", fontSize: "13px" }}>
          {groups.workflow}
        </TableCell>
        <TableCell sx={{ color: "#9dabb1", fontSize: "13px" }}>
          {groups.status}
        </TableCell>
        <TableCell sx={{ color: "#9dabb1", fontSize: "13px"}}>
            {/* <Typography variant="div" component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}> */}
                <Typography variant="div" component="div" sx={{ width: "35px", height: "35px", zIndex: "10", background: `${colors.low}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#ffff", borderRadius: "4px"}}>
                    {rowFindings.length}
                </Typography>
            {/* </Typography> */}
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <RawFindingsTable expandibleRows={rowFindings} />
        </TableCell>
      </TableRow>
    </>
  );
};

const CreateTable = () => {
  const headings = [
    "",
    "Severity",
    "Time",
    "SLA",
    "Description",
    "Security Analyst",
    "Owner",
    "Workflow",
    "# of Findings",
    "Communications",
    "Action",
  ];

  return (
      <TableContainer component={Paper} sx={{fontFamily: "Arial", padding: "1%", height: "50vh", overflowY: "auto"}}>
        <Typography variant="h6" component="h6" sx={{fontFamily: "Arial" , color: "#4b4c64", fontWeight: "bold", marginLeft: "24px"}}>
          Grouped Findings
        </Typography>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {headings.map((heading) => (
                <TableCell sx={{ color: "#9dabb1", fontSize:"14px" }}>
                  {heading.toLocaleUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.features.map((group, idx) => (
              <GroupFindingsTable
                key={`group${idx}`}
                groups={group.properties}
                index={idx}
                rows={rows.features}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};
export default CreateTable;
