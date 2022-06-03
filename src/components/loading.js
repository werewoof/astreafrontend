import React from 'react';
import './loading.css';


//find better way to fix button shit
function Modal (props) { //manual transition fix for now
    return (<div className={props.show ? "modal-container"  : "modal-container hidden"}>
        <div className={props.show ? "modal" : "hidden"} style={{width: (props.width || "350")+"px", height: (props.height || "150")+"px", transition: props.transition || "0s"}}>
            <div className="buttons">
            { props.otherbuttons && props.otherbuttons.filter(button => button.back).map((button) => <input type="button" key={""} value={button.value} onClick={button.function}/>)}
            { props.button && <input type="button" value={props.buttonVal} onClick={props.function}/>}
            { props.otherbuttons && props.otherbuttons.filter(button => !button.back).map((button) => <input type="button" key={""} value={button.value} onClick={button.function}/>)}
            </div>
            <div className={props.show ? "content":"content hidden"}>
            {props.children}
            </div>
        </div>
    </div>)
}
/*
function Menu(props) { //will be unused
    return (
        <div className={props.show ? "modal-container" : "modal-container hidden"}>
            <div className={props.show ? "modal" : "hidden"} id="menu">
                <input type="button" value="Exit" onClick={props.function}/>
            </div>
        </div>
    );
}
*/

function CheckBox(props) {
    return ( //I want to die css is so hard go damn it
        <div className="checkBox">
            <input id="toggle" type="checkbox"disabled={props.disabled}/>
            <div></div>
        </div>
    );
}

function ProfileSettings(props) {
    return (
    <div className="profile-settings">
        <div className="profile-container">
            <div className="profile-settings-information">
                <div className="profile-details" id="username">
                <label >Username:</label><div><p id="username">JohnCena</p><input className="default" type="button" value="Change" onClick={() => props.userFunc(true)}/></div>
                </div>
                <div className="profile-details" id="email">
                <label>Email:</label><div><p>123@biglore.com</p><input className="default" type="button" value="Change" onClick={() => props.emailFunc(true)}/></div>
                </div>
            </div>
            <img src="https://i.kym-cdn.com/entries/icons/original/000/037/512/004ergTRgx07MxKZhGEw01041200l6Sn0E010.mp4_snapshot_00.02.418.jpg"/>
        </div>
        <div className="option-box">
            <p className="option-title">Password</p>
            <div id="passwordChange"><label>Change password</label> <input type="button" value="Change Password" onClick={() => props.passFunc(true)}/></div>
        </div>
    </div>
    );
}

function Appearance() {
    return (
        <div className="appearance-settings">
            <p>
                Coming Soon!
            </p>
        </div>
    );
}

function Menu(props) { //pass set states function to be able change options through scopes
    const [active, setActive] = React.useState(0);
    const [changeUser, showChangeUser] = React.useState(false);
    const [changeEmail, showChangeEmail] = React.useState(false);
    const [changePass, showChangePass] = React.useState(false);
    function render() {
        switch (active) {
            case 0:
                return <ProfileSettings userFunc={showChangeUser} emailFunc={showChangeEmail} passFunc={showChangePass}/>;
            case 1:
                return <Appearance/>;
            default:
                return <p>Something is Wrong!</p>
        }
    }
    return (
        <div className={props.show ? "menu-container" : "menu-container hidden"}>
            <div className="options-menu">
                <div className="option-heading"><p>User Settings</p></div>
                <div className={ active === 0 ? "option-button active" : "option-button"} ><input type="button" value="User Profile" onClick={() => {setActive(0)}}/></div>
                <div className={ active === 1 ? "option-button active" : "option-button"}><input type="button" value="Appearance" onClick={() => {setActive(1)}}/></div>
                <div className="option-button"><input type="button" value="Log Out" id="logout" /></div>
            </div>
                <div className="options-container">
                    <div className="options">   
                        {render()}
                    </div>
                <div className="exit-button">
                <input className="default" type="button" onClick={() => {setActive(0);props.exit()}} value="×"/>
                <label>Exit</label>
                </div>
            </div>
            <Modal show={changeUser} function={() => showChangeUser(false)} otherbuttons={[{ value : "Done", function : () => {}}]} buttonVal="Exit" button width="450" height="300">
                <form className="changeUsernameModal">
                    <label>New Username</label>
                    <input type="text" id="changeUsernameInput"/>
                    <label>Current Password</label>
                    <input type="password" id="confirmPass"/>
                </form>
            </Modal>
            <Modal show={changeEmail} function={() => showChangeEmail(false)} otherbuttons={[{ value : "Done", function : () => {}}]} buttonVal="Exit" button width="450" height="300">
                <form className="changeEmailModal">
                    <label>New Email</label>
                    <input type="text"/>
                    <label>Current Password</label>
                    <input type="password"/>
                </form>
            </Modal>
            <Modal show={changePass} function={() => showChangePass(false)} otherbuttons={[{ value : "Done", function : () => {}}]} buttonVal="Exit" button width="450" height="300">
                <form className="changePasswordModal">
                    <label>New Password</label>
                    <input type="password"/>
                    <label>Current Password</label>
                    <input type="password"/>
                </form>
            </Modal>
        </div>
    )
}

export { Modal, Menu, CheckBox };