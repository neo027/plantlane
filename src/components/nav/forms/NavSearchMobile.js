import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import './NavSearch.css';

class NavSearchMobile extends Component {

	state = {
		searchText:''
	}

	handleSearchTextChange = (e) => {
		this.setState({searchText:e.target.value});
		this.props.search(e);
	}
	
	handleSubmit = (e) => {
		e.preventDefault();

		if(this.state.searchText && this.state.searchText !== ''){
			this.props.history.push('/search/' + this.state.searchText);
		}
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit}>
			    <input onChange={this.handleSearchTextChange} className="form-control form-control-sm plantlane-nav-search-box" placeholder="Search for products, brands etc." aria-label="Search" />
			    <i className="plantlane-search-icon fa fa-search"></i>
			    {this.props.result && 
					<div className="search-dropdown bg-white">
						<ul>
							{
								this.props.result.map(({name, image, sku, price, description}) => 
									<li className="my-1">
										<a href={'/product/' + name.replace(/^\s+|\s+$/g, '').toLowerCase() + '?sku=' + sku} className="product-search-card">
											<img src={image} alt={name}/>
											<div>
												<h5 className="m-0">{name}</h5>
												<div>{description}</div>
												<div dangerouslySetInnerHTML={{__html:price}}></div>
											</div>
										</a>
									</li>
									
								)
							}
							{
								this.props.result.length === 0 && <li>No result found</li>
							}
						</ul>
					</div>
				}
			</form>
		);
	}
}

export default withRouter(NavSearchMobile);