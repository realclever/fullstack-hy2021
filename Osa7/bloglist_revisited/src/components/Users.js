import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { initializeUsers } from "../reducers/usersReducer";

const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);
  //fixes list syncing issues (works)

  if (users) {
    return (
      <div>
        <h2>Users</h2>
        <p>Blogs created</p>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th scope="col">user</th>
              <th scope="col">blog(s)</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>
                  {user.blogs.length === 0
                    ? "This user hasn't created any blogs yet"
                    : `${user.blogs.length}`}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
  return null;
};

export default Users;
