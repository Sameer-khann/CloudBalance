export const redirectToLogin = () => {
  if (window.location.pathname !== "/") {
    window.location.replace("/");
  }
};
