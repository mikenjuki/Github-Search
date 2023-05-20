import { useState, useContext } from "react";
import { GithubContext } from "../../context/github/GithubContext";

const UserSearch = () => {
  const [text, setText] = useState("");

  const { users, searchUsers, clearSearch } = useContext(GithubContext);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      alert("Please enter a search term");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-8 mb-8">
      <div className="div">
        <form action="" onSubmit={handleFormSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-gray-200 pr-40 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={handleInputChange}
              />
              <button className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            className="btn btn-ghost btn-lg"
            onClick={() => {
              clearSearch();
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
