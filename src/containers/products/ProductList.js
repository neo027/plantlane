import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';

import config from '../../config/config';

import {fetchProductsByCategory} from '../../api/products';
import {addToUserCart, addToGuestCart, fetchUserQuoteId, fetchGuestQuoteId} from '../../api/cart';

import {addToCart} from '../../actions/cart';
import {addToWishList} from '../../actions/wishlist';

import ProductCard from '../../components/cards/product/Card';

class ProductList extends Component {

	constructor(props){
		super(props);
	
		this.state = {
			data:[],
			imagePrefix:props.imagePrefix,
			locked:false,
			isLoading:false,
			currentPage:0,
			hasMore:true
		}
	}

	loadData = (pageNo) => {
		let nextPage = (pageNo === 0 ? pageNo : this.state.currentPage);
		nextPage += 1;
		let hasMore = (nextPage === 1) ? true : this.state.hasMore;
		
		if(hasMore && !this.state.isLoading){
			this.setState({isLoading:true});
			return fetchProductsByCategory(this.props.category.id, nextPage)
			.then(data => {
				let currentPage = data.search_criteria.current_page, total = data.total_count, pageSize = data.search_criteria.page_size;
				let hasMore = (total - (currentPage * pageSize)) > 0;
				let products = nextPage === 1 ? data.items : [...this.state.data, ...data.items];
				this.setState({data:products, locked:true, currentPage, hasMore, isLoading:false})
			})
			.catch(error => this.setState({isLoading:false, error:true}));
		}
		else {
			return Promise.resolve(true);
		}
	}

	componentDidMount(){
		if (this.props.category && Object.keys(this.props.category).length > 0 && !this.state.locked){
			this.loadData()
			.then(() => {
				window.addEventListener('scroll', this.onScroll, false);
			});
		}
	}

	componentDidUpdate(prevProps){
		if (this.props.category && prevProps.category && Object.keys(this.props.category).length > 0 && this.props.category.id && prevProps.category.id && this.props.category.id !== prevProps.category.id){
			this.loadData(0);
		}
	}

	componentWillUnmount() {
	    window.removeEventListener('scroll', this.onScroll, false);
	}

	handleAddToCart = (product) => {
		let promise = null;
		this.setState({isLoading:true});
		if(this.props.isLoggedIn){
			promise = fetchUserQuoteId()
			.then(quote_id => addToUserCart({
				cart_item:{
					sku:product.sku,
					qty:1,
					quote_id
				}
			}));
		}
		else {
			promise = fetchGuestQuoteId()
			.then(quote_id => addToGuestCart({
				cart_item:{
					sku:product.sku,
					qty:1,
					quote_id
				}
			}));
		}

		if(promise){
			let newPrice = product.custom_attributes.find(attr => attr.attribute_code === 'special_price');
			promise.then(item => {
				this.props.addToCart({
					item_id:item.item_id,
					id:product.id,
					sku:product.sku,
					name:product.name,
					qty:item.qty,
					newPrice: newPrice ? newPrice.value : null,
					oldPrice:product.price,
					image:config.mediaBaseURL + 'product/' + product.custom_attributes.find(attr => attr.attribute_code === 'image').value,
					metadata:product
				});
				this.setState({isLoading:false});
				swal('Added To Cart', `${product.name} added to cart successfully.`, 'success');
			})
		}
	}

	onScroll = () => {
      if (
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
        this.state.data.length && !this.state.isLoading
      ) {
        this.loadData();
      }
    }

	handleAddToWishList = (product) => {
		this.props.addToWishList({
			id:product.id,
			sku:product.sku,
			name:product.name,
			qty:1,
			newPrice:product.custom_attributes.find(attr => attr.attribute_code === 'special_price'),
			oldPrice:product.price,
			image:config.mediaBaseURL + 'product/' + product.custom_attributes.find(attr => attr.attribute_code === 'image').value
		});
		swal('Added To wishlist', `${product.name} added to wishlist successfully.`, 'success');
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
			{loader}
			{
				this.state.data.map(product => 
					<ProductCard 
						name={product.name} 
						key={product.name + product.id}
						className={this.props.productCardClass}
						id={product.id} 
						sku={product.sku} 
						typeId={product.type_id}
						addToCart={() => this.handleAddToCart(product)}
						addToWishList={() => this.handleAddToWishList(product)}
						link={`/product/${product.custom_attributes.find(attr => attr.attribute_code === 'url_key').value}?sku=${product.sku}`}
						text={product.custom_attributes.find(attr => attr.attribute_code === 'description')} 
						newPrice={product.custom_attributes.find(attr => attr.attribute_code === 'special_price')} 
						oldPrice={product.price} 
						image={config.mediaBaseURL + 'product/' + product.custom_attributes.find(attr => attr.attribute_code === 'image').value} />
				)
			}
			</React.Fragment>
		);
	}
}



const mapStateToProps = (state) => {
	return {
		isLoggedIn:state.auth.isLoggedIn
	}
}

const mapDispatchToProps = {
	addToCart:addToCart,
	addToWishList:addToWishList
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductList);