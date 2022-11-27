import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {useLocation} from 'react-router-dom';
import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const LoginOtp = (useremail) => {
  const form = useRef();
  const checkBtn = useRef();
  const location = useLocation();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeCode = (e) => {
    const code = e.target.value;
    setCode(code);
  };



  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
        debugger;
        console.log(location.state.useremail);
      AuthService.loginotp( code,location.state.useremail).then(
        (response) => {
            debugger;
            if(response && response.status == "Success")
            {
                setLoading(false);
                setMessage(response.message);
            }
            else
            {
          navigate("/profile");
          window.location.reload();
            }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
       

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="code">OTP</label>
            <Input
              type="text"
              className="form-control"
              name="code"
              value={code}
              onChange={onChangeCode}
              validations={[required]}
            />
          </div>

         

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Submit</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default LoginOtp;
