import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  Avatar,
  IconButton,
  Tooltip,
  Button
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UsersContext } from "../ContextApi/UsersContext";
import { useHistory } from "react-router-dom";
import { getJwt } from "../../helpers/jwt";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4),
    padding: theme.spacing(4)
  },
  table: {
    minWidth: 650
  },
  link: {
    textDecoration: "none",
    color: "white"
  },
  av: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
}));

const AllUsers = () => {
  const [users, setUsers, isLoading,userRole,changeRole,deletUser] = useContext(UsersContext);
  const token = getJwt();
  let history = useHistory();
 
  const text = userRole === "User" ? "Make Admin" : "Remove Admin"
  const classes = useStyles();
  return (
    <div>
      {token ? (
        <div>
          <Navbar />
          <div className={classes.root}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead >
                    <TableRow>
              
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user._id} hover>
                        <TableCell>{user.firstname}</TableCell>
                        <TableCell>{user.lastname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{userRole}</TableCell>
                        <TableCell>
                          <Tooltip title="Delete user">
                          <IconButton
                            onClick={() => {
                              if(window.confirm("Are you sure?")) deletUser(`${user._id}`);
                            }}
                          >
                            <Delete />
                          </IconButton>
                          </Tooltip>
                          <Tooltip title={text}>
                          <Button onClick={changeRole}>{text}</Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
      ) : (
        history.push("/signin")
      )}
    </div>
  );
};

export default AllUsers;
