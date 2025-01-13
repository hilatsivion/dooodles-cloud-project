function login() {
  const loginUrl = `https://us-east-1qiuvxugwi.auth.us-east-1.amazoncognito.com/login?client_id=7m59qe2baupre61mo36mbbvi5q&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=https%3A%2F%2Fdoodles-website-bucket.s3.us-east-1.amazonaws.com%2Fpages%2FhomePage%2Findex.html`;
  window.location.href = loginUrl;
}

function signup() {
  const signupUrl = `https://us-east-1qiuvxugwi.auth.us-east-1.amazoncognito.com/signup?client_id=7m59qe2baupre61mo36mbbvi5q&redirect_uri=https%3A%2F%2Fdoodles-website-bucket.s3.us-east-1.amazonaws.com%2Fpages%2FhomePage%2Findex.html&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile`;
  window.location.href = signupUrl;
}

function logout() {
  clearTokens();
  const logoutUrl = `${COGNITO_CONFIG.domain}/logout?client_id=${
    COGNITO_CONFIG.clientId
  }&logout_uri=${encodeURIComponent(COGNITO_CONFIG.redirectUri)}`;
  window.location.href = logoutUrl;
}

function parseTokens() {
  const hash = window.location.hash.substr(1);
  const params = new URLSearchParams(hash);

  const idToken = params.get("id_token");
  const accessToken = params.get("access_token");

  if (idToken && accessToken) {
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("accessToken", accessToken);
    return { idToken, accessToken };
  }
  return null;
}

function isLoggedIn() {
  const idToken = localStorage.getItem("idToken");
  const accessToken = localStorage.getItem("accessToken");
  return Boolean(idToken && accessToken);
}

function clearTokens() {
  localStorage.removeItem("idToken");
  localStorage.removeItem("accessToken");
}

function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

function logTokens() {
  console.log("ID Token:", localStorage.getItem("idToken"));
  console.log("Access Token:", localStorage.getItem("accessToken"));
}

export {
  login,
  signup,
  logout,
  parseTokens,
  isLoggedIn,
  clearTokens,
  decodeToken,
  logTokens,
};
