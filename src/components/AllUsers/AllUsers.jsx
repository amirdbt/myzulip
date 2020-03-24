import React, { useEffect, useState } from "react";
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
  Avatar
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

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
  avatar: {
    display: "flex",
    flexDirection: "row"
  },
  name: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  av: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setUsers(data);
    setIsLoading(false);
  };

  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <div className={classes.root}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.id}</TableCell>
                    <TableCell className={classes.avatar}>
                      <Avatar src="https://react-material-dashboard.devias.io/images/avatars/avatar_11.png" />
                      <div className={classes.name}>{user.name}</div>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>

                    <TableCell>
                      <Link className={classes.link} to={`users/${user.id}`}>
                        <Button size="small" variant="outlined" color="primary">
                          View User
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
