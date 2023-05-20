import UserList from "../components/users/UserList";
import UserSearch from "../components/users/UserSearch";
const Home = () => {
  // const gitUrl = import.meta.env.VITE_GIT_URL;
  // const token = import.meta.env.VITE_APP_TOKEN;

  return (
    <>
      {/* Displays search input */}
      <UserSearch />

      {/* Displays a list of searched users */}
      <UserList />
    </>
  );
};

export default Home;
