import './signlogin.css';
import React from 'react';
import { useNavigate } from 'react-router';
import {Modal} from './loading.js';
/*
Current bugs:
when switching to register button has a delay
in that delay the register button cannot be clicked
Possiblities:
  Transition bug?
  css?
Never mind fixed it lmao
it was a css bug
a quick pointer events fixes it

*/
function SignLogin(props) {
  const [login, setLogin] = React.useState(props.login);
  const [load, setLoad] = React.useState(false);
  const [changePage, setChangePage] = React.useState(false);
  const navigate = useNavigate();
  function Change() {
    if (login) { //fixed 2 second lag delay by leaving out arrow function
        setLogin(false); //it just works yo
        navigate("../register", {"replace": true});
    } else {
        setLogin(true);
        navigate("../login", {"replace": true});
    }
  }
  async function WaitAnim() {
    await setTimeout(() => navigate("../chat", {"replace" : false}), 1000); //replace: replaces the history (didnt find anything about it in documentation bruh)
  }
  function foo(event) {
    console.log("activated");
    setLoad(false);
    setChangePage(true);
    WaitAnim();
  }
  function SignUpSubmit(event) {
      event.preventDefault();
    //post request back to backend server
    //obtain token
    //change route to chatapp
    setLoad(true); //possible promise
    //create promise for post request
    // then make it run a function from here when finished
    // or another function on fail
    //navigate("../chat", {"replace" : true});
  }
  function LoginSubmit(event) {
    event.preventDefault();
    
    setLoad(true);
    //navigate("../chat", {"replace" : true});
  }
  function Invalid(event) {
    //event.setCustom
  }
  return (
    <div className="signlogin">
      <div className="title"><h1>BlackBox ;)</h1></div>
      <div className='prompt'>
        <form className={login ? "register-form hidden" : "register-form"} onSubmit={SignUpSubmit}>
        <div className="userBox" id="email">
        <input type="text" placeholder=' 'onInvalid={Invalid} spellcheck="false" required/>
        <label>Email</label>
        </div>
        <div className="userBox" id="username">
        <input type="text" placeholder=' ' spellcheck="false" required/>
        <label>Username</label>
        </div>
        <div className="userBox" id="password">
        <input type="password" placeholder=' ' spellcheck="false" required/>
        <label>Password</label>
        </div>
        <div className="buttonBox">
          <input type="submit" className="button" value="Register"/>
        </div>
        <div className="switch">
          <p>Already have an account?</p>
          <input type="button" className="button" value="Sign In" onClick={Change}/>
          </div>
        </form>
        <form className={login ? 'signin-form' : "signin-form hidden"} onSubmit={LoginSubmit}>
          <div className="userBox" id="username">
          <input type="text" placeholder=' ' spellcheck="false" required/>
            <label>Username</label>
          </div>
          <div className="userBox" id="password">
          <input type="password" placeholder=' 'spellcheck="false" required/>
            <label>password</label>
          </div>
          <div className="buttonBox">
          <input type="submit" className="button" value="Sign In"/>
        </div>
        <div className="switch">
          <p>Don't have an account?</p>
          <input type="button" className="button" value="Register" onClick={Change}/>
          </div>
        </form>
      </div>
      <div className={ changePage ? "changePage" : "changePage hidden"}></div>
      <Modal button function={foo} show={load} buttonVal="continue"><p style={{"margin-top": "35px"}}>Loading</p></Modal>
    </div>
  );
}

export default SignLogin;
