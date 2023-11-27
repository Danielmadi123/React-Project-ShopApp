import React, { Fragment, useEffect, useState } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const SandboxPage = () => {
  const user = useSelector((state) => state.authSlice);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get("users");
        setUsers(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllUsers();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`users/${userId}`);
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const handleChangeUserType = async (userId, isBusiness) => {
    try {
      const data = { isBusiness: !isBusiness };
      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
        data
      );
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, isBusiness: !isBusiness };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.log("Error updating user status:", error);
    }
  };

  const makeRegularUser = (userId) => {
    handleChangeUserType(userId, true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Fragment>
      <Typography
        sx={{ fontFamily: "serif", textAlign: "center", p: 5 }}
        variant="h1"
      >
        SANDBOX
        <Divider sx={{ mt: 4, width: 750, mx: "auto" }} />
      </Typography>

      {user.isAdmin && <div></div>}

      {user.isAdmin && (
        <Box p={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell sx={{ fontWeight: 900, fontSize: "1.2rem" }}>
                    User ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 900, fontSize: "1.2rem" }}>
                    User Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 900, fontSize: "1.2rem" }}>
                    User Phone
                  </TableCell>
                  <TableCell sx={{ fontWeight: 900, fontSize: "1.2rem" }}>
                    User Type
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 900,
                      fontSize: "1.2rem",
                      paddingLeft: 7,
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? users.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : users
                ).map((userData, index) => (
                  <TableRow key={userData._id}>
                    <TableCell sx={{ fontWeight: 900, fontSize: "1rem" }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{userData._id}</TableCell>
                    <TableCell>{userData.name.first}</TableCell>
                    <TableCell>{userData.phone}</TableCell>
                    <TableCell>
                      {userData.isAdmin
                        ? "Admin"
                        : userData.isBusiness
                        ? "Business"
                        : "Regular"}
                    </TableCell>
                    <TableCell sx={{ color: "orange" }}>
                      {!userData.isAdmin && (
                        <>
                          <Button
                            sx={{ color: "red" }}
                            onClick={() => deleteUser(userData._id)}
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={() =>
                              handleChangeUserType(
                                userData._id,
                                userData.isBusiness
                              )
                            }
                          >
                            {userData.isBusiness
                              ? "Make Regular"
                              : "Make Business"}
                          </Button>
                        </>
                      )}
                      {userData.isAdmin && (
                        <>
                          <Button
                            onClick={() =>
                              handleChangeUserType(
                                userData._id,
                                userData.isBusiness
                              )
                            }
                          >
                            {userData.isBusiness
                              ? "Make Regular"
                              : "Make Business"}
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ mt: 3, display: "flex", justifyContent: "center" }}
            rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </Fragment>
  );
};

export default SandboxPage;
