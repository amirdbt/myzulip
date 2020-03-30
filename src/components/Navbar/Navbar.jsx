import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Forum } from "@material-ui/icons";
import MoreIcon from "@material-ui/icons/MoreVert";
import { People } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { UsersContext } from "../ContextApi/UsersContext";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  link: {
    textDecoration: "none",
    cursor: "pointer",
    color: "black"
  },
  link1: {
    textDecoration: "none",
    cursor: "pointer",
    color: "white"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [users] = useContext(UsersContext);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const delToken = () => {
    return localStorage.removeItem("token");
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link className={classes.link} to="/dashboard">
        {" "}
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <Link className={classes.link} to="/signin">
        {" "}
        <MenuItem onClick={delToken}>Log out</MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge color="secondary">
            <Forum />
          </Badge>
        </IconButton>
        <Link to="/chat" className={classes.link}>
          {" "}
          <p>Channels</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show all users" color="inherit">
          <Badge color="secondary">
            <People />
          </Badge>
        </IconButton>
        <Link to="/users" className={classes.link}>
          <p>All Users</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            MyZulip
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link className={classes.link1} to="/chat">
              <Tooltip title="MyZulip Channels" arrow>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge color="secondary">
                  <Forum />
                </Badge>
              </IconButton>
              </Tooltip>
            </Link>
            <Link className={classes.link1} to="/users">
              <Tooltip title="All Users" arrow>
                <IconButton aria-label="show all users" color="inherit">
                  <Badge badgeContent={users.length} color="secondary">
                    <People />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip title="My Profile" arrow>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            </Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Navbar;
