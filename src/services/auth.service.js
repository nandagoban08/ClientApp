import httpCommon from "../http-common";


const register = (username, email, password) => {
  return httpCommon.post( {
    username,
    email,
    password,
  },{
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json' } 
  })
  .then((response) => {
    if (response.data.username) {
      localStorage.setItem("userInfo", JSON.stringify(response.data));
    }

    return response.data;
  }).catch(error => {
    console.log(error.response)
});
};


const login = (UserEmail, Password) => {


  return httpCommon
    .post("/login", {
      UserEmail,
      Password,
    },{
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json' } 
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    }).catch(error => {
      console.log(error.response)
  });
};

const loginotp = (code, useremail) => {
  debugger;

  return httpCommon
    .post("/loginwithOTP", {
      code,
      useremail,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("otp", JSON.stringify(response.data));
      }

      return response.data;
    }).catch(error => {
      debugger;
      console.log(error.response)
  });
  
 


};


const logout = () => {
  localStorage.removeItem("user");
  return httpCommon.post("signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  loginotp,
  logout,
  getCurrentUser,
}

export default AuthService;
