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
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

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
  const [users, setUsers, isLoading,userRole,changeRole] = useContext(UsersContext);
  const token = getJwt();
  let history = useHistory();
  const delUser = id => {
    let newUsers = [...users];
    newUsers = newUsers.filter(e => e.id !== id);
    setUsers(newUsers);
  };
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
                      <TableCell>Profile Image</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user.id} hover>
                        <TableCell>
                          {" "}
                          <Avatar src="https://react-material-dashboard.devias.io/images/avatars/avatar_11.png" />
                        </TableCell>
                        <TableCell>{user.firstname}</TableCell>
                        <TableCell>{user.lastname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{userRole}</TableCell>
                        <TableCell>
                          <Tooltip title="Delete user">
                          <IconButton
                            onClick={() => {
                              delUser(`${user.id}`);
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
