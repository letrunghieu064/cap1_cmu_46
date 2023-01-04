import React, { useEffect } from "react";
import "./Forgotpassword.css";
export default function Forgotpassword() {
  return (
    <div>
      <div className="forgotPassword">
        <div className="forgotPassWord-mail">
          <h2>Forgot Password</h2>
          <p>Enter yor email address</p>
          <div>
            <input placeholder="Enter email address" type="text" />
          </div>
          <button>CONTINUE</button>
        </div>
        <div className="forgotPassWord-reset">
          <h2>Reset Password</h2>
          <p>Please create a new password that you don't use any other site</p>
          <div>
            <input placeholder="Create new password" type="text" />
          </div>
          <div>
            <input placeholder="Confirm your password" type="text" />
          </div>
          <div>
            <input placeholder="Enter code verrify" type="text" />
          </div>
          <button>CHANGE</button>
        </div>
      </div> 
    </div>
  );
}
