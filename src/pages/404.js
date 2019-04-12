import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class NotFount extends Component {

	render(){
		return (
			<React.Fragment>
				<div className="breadcrumb-section">
				    <div className="container">
				        <div className="row">
				            <div className="col-sm-6">
				                <div className="page-title">
				                    <h2>404 page</h2>
				                </div>
				            </div>
				            <div className="col-sm-6">
				                <nav aria-label="breadcrumb" className="theme-breadcrumb">
				                    <ol className="breadcrumb">
				                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
				                        <li className="breadcrumb-item active" aria-current="page">404 page</li>
				                    </ol>
				                </nav>
				            </div>
				        </div>
				    </div>
				</div>
				<section className="p-0">
				    <div className="container">
				        <div className="row">
				            <div className="col-sm-12">
				                <div className="error-section">
				                    <h1>404</h1>
				                    <h2>page not found</h2>
				                    <Link to="/" className="btn btn-solid">back to home</Link>
				                </div>
				            </div>
				        </div>
				    </div>
				</section>
			</React.Fragment>
		);
	}
}

export default NotFount;