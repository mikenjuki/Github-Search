import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserItem = ({ user: { login, avatar_url } }) => {
  return (
    <div className="card shadow-md compact bg-base-100">
      {login}
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full shadow w-14 h-14">
              <img src={avatar_url} alt={`${login}'s avatar`} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="card-title">{login}</h2>
          <Link
            to={`/users/${login}`}
            className=" text-base-content text-opacity-40 "
          >
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserItem;
