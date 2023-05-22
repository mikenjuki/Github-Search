import axios from "axios";

const gitUrl = import.meta.env.VITE_GIT_URL;
const token = import.meta.env.VITE_APP_TOKEN;

const gitHub = axios.create({
  baseURL: gitUrl,
  headers: { Authorization: `Bearer ${token}` },
});

// Get users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  try {
    const response = await gitHub.get(`/search/users?${params}`);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Get users and repos
export const getUsersAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created", // Sort by creation date
    per_page: 10, // Get only 10 repositories
  });

  try {
    const [user, repos] = await Promise.all([
      gitHub.get(`/users/${login}`),
      gitHub.get(`/users/${login}/repos?${params}`),
    ]);

    return { user: user.data, repos: repos.data };
  } catch (error) {
    console.error("Error fetching users and repos:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

// Gets a single user
// export const getUser = async (login) => {
//   try {
//     const response = await axios.get(`${gitUrl}/users/${login}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (response.status === 404) {
//       window.location = "/notfound";
//     } else {
//       return response.data;
//     }
//     // console.log(response.data);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//   }
// };

// //   dispatch({
// //     type: "GET_USER",
// //     payload: response.data,
// //   });

// // Get user repos
// export const getUserRepos = async (login) => {
//   const params = new URLSearchParams({
//     sort: "created", // Sort by creation date
//     per_page: 10, // Get only 10 repositories
//   });

//   try {
//     const response = await axios.get(
//       `${gitUrl}/users/${login}/repos?${params}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//     // dispatch({
//     //   type: "GET_REPOS",
//     //   payload: response.data,
//     // });
//   } catch (error) {
//     console.error("Error fetching user repositories:", error);
//   }
// };
