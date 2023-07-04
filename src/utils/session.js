export const startSession = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const getSession = () => {
  const storedUser = sessionStorage.getItem("user");
  const user = JSON.parse(storedUser);
  return {
    user,
  };
};

export const endSession = () => {
  sessionStorage.clear();
};

export const isLoggedIn = () => {
  return getSession().user.stsTokenManager.accessToken;
};
