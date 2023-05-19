import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

const UserList = () => {
  const gitUrl = import.meta.env.VITE_GIT_URL;
  const token = import.meta.env.VITE_APP_TOKEN;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${gitUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [gitUrl, token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default UserList;
