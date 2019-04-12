import React, {Component} from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';

import {fetchCategoryDetail} from '../../api/categories';
import {fetchProductsByCategory} from '../../api/products';

import ProductListContainer from '../../containers/products/ProductListGeneral';
import ProductFilter from '../../containers/products/ProductFilter';


import './ProductList.css';

class ProductList extends Component {

	constructor(){
		super();
	
		this.state = {
			category:{},
			products:[],
			isLoading:true,
			error:false,
			locked:false,
			currentPage:0,
			hasMore:true,
			filters:null
		}
	}


	loadData = () => {
		this.setState({isLoading:true});
		return fetchCategoryDetail(this.props.match.params.categoryId)
		.then(category => {
			this.setState({category, isLoading:false});
			this.loadProducts(category.id, 0)
		})
		.catch(error => this.setState({isLoading:false, error:true}));
	}

	loadProducts = (categoryId, pageNo, filters) => {
		let nextPage = (pageNo === 0 ? pageNo : this.state.currentPage);
		nextPage += 1;
		let hasMore = (nextPage === 1) ? true : this.state.hasMore;

		let appliedFilter = (filters ? filters : this.state.filters);
		
		if(hasMore && !this.state.isLoading){
			this.setState({isLoading:true});
			return fetchProductsByCategory(categoryId, nextPage, appliedFilter)
			.then(data => {
				let currentPage = data.search_criteria.current_page, total = data.total_count, pageSize = data.search_criteria.page_size;
				let hasMore = (total - (currentPage * pageSize)) > 0;
				let products = nextPage === 1 ? data.items : [...this.state.products, ...data.items];
				this.setState({products, locked:true, currentPage, hasMore, isLoading:false, filters:appliedFilter})
			})
			.catch(error => this.setState({isLoading:false, error:true}));
		}
		else {
			return Promise.resolve(true);
		}
	}

	componentDidMount(){
		if (this.props.match.params.categoryId){
			this.loadData()
			.then(() => {
				window.addEventListener('scroll', this.onScroll, false);
			});
		}

		$('.filter-btn').on('click', function(e) {
        	$('.collection-filter').css("left","-15px");
	    });

	    $('.filter-back').on('click', function(e) {
	        $('.collection-filter').css("left","-365px");
	    });
	    // sidebar popup
	    $('.sidebar-popup').on('click', function(e) {
	        $('.open-popup').toggleClass('open');
	        $('.collection-filter').css("left","-15px");
	    });
	    $('.filter-back').on('click', function(e) {
	        $('.collection-filter').css("left","-365px");
	        $('.sidebar-popup').trigger('click');
	    });
	}

	componentDidUpdate(prevProps){
		if (prevProps.match.params.categoryId !== this.props.match.params.categoryId){
			this.loadData();
		}
	}

	componentWillUnmount() {
	    window.removeEventListener('scroll', this.onScroll, false);
	}

	onScroll = () => {
      if (
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
        this.state.products.length && !this.state.isLoading
      ) {
        this.loadProducts(this.state.category.id);
      }
    }

    applyFilter = (filters) => {
    	console.log('apply')
    	this.loadProducts(this.state.category.id, 0, filters);
    }

	render(){
		let loader = null;

		if(this.state.isLoading){
			loader = ReactDOM.createPortal(
				<div className="loader-wrapper">
				    <div className="loader"></div>
				</div>,
				document.getElementById('modal-root')
			);
		}

		return (
			<React.Fragment>
				<div className="tt-breadcrumb">
					<div className="container">
						<ul>
							<li><a href="/">Plantlane</a></li>
							<li>Category</li>
						</ul>
					</div>
				</div>
				<div className="collection-wrapper mt-4">
					{loader}
					<div className="container">
						<div className="row">
							<ProductFilter onFilterChange={this.applyFilter} />
							<div className="collection-content col" style={{paddingLeft:'0px', paddingRight:'0px'}}>
								<div className="page-main-content">
			                        <div className="container-fluid" style={{paddingLeft:'0px', paddingRight:'0px'}}>
			                            <div className="row">
			                                <div className="col-sm-12">
			                                	<div className="top-banner-wrapper">
			                                        <div className="top-banner-content py-2 px-4 px-sm-0">
			                                            <h3>{this.state.category.name}</h3>
			                                        </div>
			                                    </div>
			                                    <div className="collection-product-wrapper">
			                                        <div className="product-top-filter">
			                                            <div className="container-fluid p-0 px-sm-0">
			                                                <div className="row">
			                                                    <div className="col-xl-12">
			                                                        <div className="filter-main-btn"><span className="filter-btn btn btn-theme"><i className="fa fa-filter" aria-hidden="true"></i> Filter</span></div>
			                                                    </div>
			                                                </div>
			                                            </div>
			                                        </div>
			                                        <div className="product-wrapper-grid">
			                                            <div className="container-fluid plantlane-product-list-container py-4">
															<ProductListContainer productCardClass="m-sm-2" data={this.state.products} />
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default ProductList;