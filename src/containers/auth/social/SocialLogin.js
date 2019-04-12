import React from 'react';

import './SocialLogin.css';

const socialLogin = (props) => {

	return (
		<div className="plantlane-social-login">
			<button className="btn btn-block btn-social btn-facebook my-3"><span className="fab fa-facebook-f"></span> Sign In with Facebook</button>
			<button className="btn btn-block btn-social btn-google"><span className="fab fa-google"></span> Sign In with Google</button>
		</div>
	);
}

export default socialLogin;