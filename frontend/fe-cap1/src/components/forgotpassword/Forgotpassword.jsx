import React, { useEffect ,useState } from "react";
import "./Forgotpassword.css";
import userService from "../../services/user.service";
import { ToastContainer, toast } from "react-toastify";
export default function Forgotpassword() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [veryfipassword,setverifiPassword]=useState("");
  const [code,setCode]=useState("");
  const [validatepassword,setvalidate]=useState(false);  
  const [validateveryfipassword,setvalidateveryfipassword]=useState(false);  
  const [validate,setValidate]=useState(false); 
  const forgotPass = async (e) => {
    e.preventDefault();
    if (email.length === 0) {
      return ;
    } else {
      const res = await userService.forgotPassword(email);
      toast.success(" Success ,Please enter a new password in the form on the right", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const resetPassword = async (e) => {
    e.preventDefault();
    if (password.length === 0 ) {
      setvalidate(!validatepassword)
      return ;
    } 
    if (veryfipassword.length === 0 ) {
      setvalidateveryfipassword(!validateveryfipassword)
      return ;
    }
    if (veryfipassword !==password ) {
      setValidate(!validate)
      return ;
    }
    else {
      
      const res = await userService.resetPassword(password,code);
      setValidate(false)
      console.log("hsgdsd",res)
      toast.success(res.message
        , {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div>
      <div className="forgotPassword">
        <div className="forgotPassWord-mail">
          <h2>Forgot Password</h2>
          <p>Enter yor email address</p>
          <div>
            <input placeholder="Enter email address" type="text"   onChange={(e) => {
            setEmail(e.target.value);
          }}/>
          </div>
          <button onClick={forgotPass}>CONTINUE</button>
        </div>
        <div className="forgotPassWord-reset">
          <h2>Reset Password</h2>
          <p>Please create a new password that you don't use any other site</p>
          <div>
            <input placeholder="Create new password" type="password" onChange={(e) => {
            setPassword(e.target.value);
          }} />
           {validatepassword && password?.length <=0 ?
        <label className="l1 l2">cannot be left blank</label> :" "}
          </div>
          <div>
            <input placeholder="Confirm your password" type="password" onChange={(e) => {
            setverifiPassword(e.target.value);
          }}/>
          {validateveryfipassword && veryfipassword?.length <=0 ?
        <label className="l1 l2">cannot be left blank</label> :" "}
          </div>
          <div>
            <input placeholder="Enter code verrify" type="text" onChange={(e) => {
            setCode(e.target.value);
          }} />
         {validate ?
        <label className="l1 l2">passwords do not match</label> :" "}
          </div>
          <button onClick={resetPassword}>CHANGE</button>
          <div className="loginnnn-linkkk">
                <a href="/login" className="alink_logggginnn">Login</a>
            </div>
        </div>
      </div> 
    </div>
  );
}
