const COGNITO_CONFIG = {
  region: "us-east-1",
  userPoolId: "us-east-1_bt8hGblD3",
  clientId: "fgvo4399l4u33pvgcl69pqafk",
  domain: "https://us-east-1bt8hgbld3.auth.us-east-1.amazoncognito.com",
  redirectUri:
    "https://doodles-website-bucket.s3.us-east-1.amazonaws.com/pages/homePage/index.html",
};

function login() {
  const loginUrl = `${COGNITO_CONFIG.domain}/login?client_id=${
    COGNITO_CONFIG.clientId
  }&response_type=token&scope=email+openid+profile&redirect_uri=${encodeURIComponent(
    COGNITO_CONFIG.redirectUri
  )}`;
  window.location.href = loginUrl;
}

function signup() {
  const signupUrl = `${COGNITO_CONFIG.domain}/signup?client_id=${
    COGNITO_CONFIG.clientId
  }&response_type=token&scope=email+openid+profile&redirect_uri=${encodeURIComponent(
    COGNITO_CONFIG.redirectUri
  )}`;
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
