import React from 'react';
import {Link} from 'react-router-dom';

import visa from "../../assets/icon/visa.png";
import mastercard from "../../assets/icon/mastercard.png";
import paypal from "../../assets/icon/paypal.png";
import amex from "../../assets/icon/american-express.png";
import disc from "../../assets/icon/discover.png";
import logo from '../../assets/logo.png';

import './Footer.css';

const Footer = (props) => {

	return (
		<footer className="footer-light">
		    <section className="section-b-space light-layout">
		        <div className="container">
		            <div className="row footer-theme partition-f">
		                <div className="col-lg-4 col-md-6">
		                    <div className="footer-title footer-mobile-title">
		                        <h4>about</h4>
		                    </div>
		                    <div className="footer-contant">
		                        <div className="footer-logo"><img style={{maxWidth:'180px'}} src={logo} alt=""/></div>
		                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
		                        <div className="footer-social">
		                            <ul>
		                                <li><Link to="/"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
		                                <li><Link to="/"><i className="fa fa-google-plus" aria-hidden="true"></i></Link></li>
		                                <li><Link to="/"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
		                                <li><Link to="/"><i className="fa fa-instagram" aria-hidden="true"></i></Link></li>
		                                <li><Link to="/"><i className="fa fa-rss" aria-hidden="true"></i></Link></li>
		                            </ul>
		                        </div>
		                    </div>
		                </div>
		                <div className="col offset-xl-1">
		                    <div className="sub-title">
		                        <div className="footer-title">
		                            <h4>my account</h4>
		                        </div>
		                        <div className="footer-contant">
		                            <ul>
		                                <li><Link to="/">mens</Link></li>
		                                <li><Link to="/">womens</Link></li>
		                                <li><Link to="/">clothing</Link></li>
		                                <li><Link to="/">accessories</Link></li>
		                                <li><Link to="/">featured</Link></li>
		                            </ul>
		                        </div>
		                    </div>
		                </div>
		                <div className="col">
		                    <div className="sub-title">
		                        <div className="footer-title">
		                            <h4>why we choose</h4>
		                        </div>
		                        <div className="footer-contant">
		                            <ul>
		                                <li><Link to="/">shipping & return</Link></li>
		                                <li><Link to="/">secure shopping</Link></li>
		                                <li><Link to="/">gallary</Link></li>
		                                <li><Link to="/">affiliates</Link></li>
		                                <li><Link to="/">contacts</Link></li>
		                            </ul>
		                        </div>
		                    </div>
		                </div>
		                <div className="col">
		                    <div className="sub-title">
		                        <div className="footer-title">
		                            <h4>store information</h4>
		                        </div>
		                        <div className="footer-contant">
		                            <ul className="contact-list">
		                                <li><i className="fa fa-map-marker"></i>Plantlane Store, Demo store India 345-659</li>
		                                <li><i className="fa fa-phone"></i>Call Us: 123-456-7898</li>
		                                <li><i className="fa fa-envelope-o"></i>Email Us: Support@plantlane.com</li>
		                                <li><i className="fa fa-fax"></i>Fax: 123456</li>
		                            </ul>
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </section>
		    <div className="sub-footer">
		        <div className="container">
		            <div className="row">
		                <div className="col-xl-6 col-md-6 col-sm-12">
		                    <div className="footer-end">
		                        <p><i className="fa fa-copyright" aria-hidden="true"></i> 2019 plantlane.com</p>
		                    </div>
		                </div>
		                <div className="col-xl-6 col-md-6 col-sm-12">
		                    <div className="payment-card-bottom">
		                        <ul>
		                            <li><Link to="/"><img src={visa} alt=""/></Link></li>
		                            <li><Link to="/"><img src={mastercard} alt=""/></Link></li>
		                            <li><Link to="/"><img src={paypal} alt=""/></Link></li>
		                            <li><Link to="/"><img src={amex} alt=""/></Link></li>
		                            <li><Link to="/"><img src={disc} alt=""/></Link></li>
		                        </ul>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </div>
		</footer>
	);
}

export default Footer;