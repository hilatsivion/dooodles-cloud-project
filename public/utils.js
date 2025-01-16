function login() {
  // const loginUrl = `https://us-east-1qiuvxugwi.auth.us-east-1.amazoncognito.com/login?client_id=7m59qe2baupre61mo36mbbvi5q&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=https%3A%2F%2Fdoodles-website-bucket.s3.us-east-1.amazonaws.com%2Fpages%2FhomePage%2Findex.html`;
  const loginUrl = `https://us-east-1qiuvxugwi.auth.us-east-1.amazoncognito.com/login?client_id=7m59qe2baupre61mo36mbbvi5q&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http://localhost:5500/pages/homePage/index.html`;
  window.location.href = loginUrl;
}

function signup() {
  // const signupUrl = `https://us-east-1qiuvxugwi.auth.us-east-1.amazoncognito.com/signup?client_id=7m59qe2baupre61mo36mbbvi5q&redirect_uri=https%3A%2F%2Fdoodles-website-bucket.s3.us-east-1.amazonaws.com%2Fpages%2FhomePage%2Findex.html&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+profile`;
  const signupUrl = `https://us-east-1qiuvxugwi.auth.us-east-1.amazoncognito.com/signup?client_id=7m59qe2baupre61mo36mbbvi5q&redirect_uri=http://localhost:5500/pages/homePage/index.html&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+profile`;
  window.location.href = signupUrl;
}

function logout() {
  clearTokens();
  const logoutUrl = `${COGNITO_CONFIG.domain}/logout?client_id=${
    COGNITO_CONFIG.clientId
  }&logout_uri=${encodeURIComponent(COGNITO_CONFIG.redirectUri)}`;

  window.location.href = logoutUrl;
  setTimeout(() => {
    location.reload();
  }, 500);
}

function parseTokens() {
  console.log("Parsing tokens...");
  const hash = window.location.hash.substr(1);
  const params = new URLSearchParams(hash);

  const idToken = params.get("id_token");
  if (idToken) {
    console.log("ID Token found:", idToken);
    sessionStorage.setItem("idToken", idToken);

    const tokenPayload = decodeToken(idToken);
    if (tokenPayload) {
      const username =
        tokenPayload["cognito:username"] || tokenPayload.email || "User";
      const isAdmin =
        tokenPayload["cognito:groups"]?.includes("Admin") || false;

      sessionStorage.setItem("username", username);
      sessionStorage.setItem("isAdmin", isAdmin);
      console.log("Username:", username, "Is Admin:", isAdmin);
    }
    return idToken;
  } else {
    console.log("No ID Token found in the URL.");
  }
  return null;
}

function isLoggedIn() {
  return Boolean(sessionStorage.getItem("idToken"));
}

function clearTokens() {
  sessionStorage.removeItem("idToken");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("isAdmin");
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
  console.log("ID Token:", sessionStorage.getItem("idToken"));
  console.log("Username:", sessionStorage.getItem("username"));
  console.log("Is Admin:", sessionStorage.getItem("isAdmin"));
}

const API_BASE_URL =
  "https://17v5i6rril.execute-api.us-east-1.amazonaws.com/Prod";

export {
  login,
  signup,
  logout,
  parseTokens,
  isLoggedIn,
  clearTokens,
  decodeToken,
  API_BASE_URL,
};
