import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setSignup} from '../../actions/nav';

import config from '../../config/config';

// import {scrollTop} from '../../utilities';

// components imports
import Carousel from '../../components/carousel/Carousel';
import IconWithText from '../../components/icons/IconWithText';
import CategoryCard from '../../components/cards/category/Card';

import InTheSpotlightList from '../../containers/landing/InTheSpotlightList';
import GiftList from '../../containers/landing/GiftList';
import ProductList from '../../containers/products/ProductList';

import HouseCard from '../../components/cards/house/Card';
import TrendingSearchCard from '../../components/cards/trendingsearch/Card';
import VideoCard from '../../components/cards/video/Card';
import BrandCard from '../../components/cards/brand/Card';

// assets import
import freeShippingIcon from '../../assets/free-shipping.png';
import easyReturnIcon from '../../assets/easy-returns.png';
import emiIcon from '../../assets/emi.png';
import freeAssemblyIcon from '../../assets/free-assembly.png';
import brand1 from '../../assets/1.png';
import brand2 from '../../assets/2.png';
import brand3 from '../../assets/3.png';
import brand4 from '../../assets/4.png';
import brand5 from '../../assets/5.png';
import brand6 from '../../assets/6.png';
import brand7 from '../../assets/7.png';
import brand8 from '../../assets/8.png';

// css imports
import './Landing.css';

class Landing extends Component {

	render(){
		let topCategories = this.props.categories.find(category => category.name === 'Categories');
		topCategories = (topCategories) ? topCategories.children_data : [];

		let inTheSpotLight = this.props.categories.find(category => category.name === 'In The Spotlight');
		inTheSpotLight = inTheSpotLight ? inTheSpotLight.children_data : [];

		let curatedCollection = this.props.categories.find(category => category.name === 'Curated Collection');
		curatedCollection = curatedCollection ? curatedCollection.children_data : [];
		
		let recentlyViewed = this.props.categories.find(category => category.name === 'Recently Viewed & More...');

		let shopForGifts = this.props.categories.find(category => category.name === 'Shop For Gifts');
		shopForGifts = shopForGifts ? shopForGifts.children_data : [];

		let houseHome = this.props.categories.find(category => category.name === 'What Makes Your House A Home');
		houseHome = houseHome ? houseHome.children_data : [];

		return (
			<div>
				<Carousel />
				<div className="">
					<div className="plantlane-landing-container">
						<div onClick={() => this.props.setSignup(true)} className="plantlane-landing-banner-register py-4"></div>
						<div className="plantlane-landing-benifits-icon-display my-4">
							<IconWithText capitalize image icon={freeShippingIcon} text="Free shipping above rs. 999" />
							<IconWithText capitalize image textClass icon={easyReturnIcon} text="Easy returns" />
							<IconWithText capitalize image icon={emiIcon} text="No cost emi available" />
							<IconWithText capitalize image textClass icon={freeAssemblyIcon} text="Free Assembly" />
						</div>
						
						<div className="plantlane-landing-categories-container">
						{
							topCategories.map((category) => 
								<CategoryCard key={category.name + category.id} link={'/products/category/' + category.id} image={config.mediaBaseURL + '/category/category-' + (category.position) + '.jpg'} category={category.name} />
							)
						}
						</div>
						<div className="py-3"></div>
					</div>
				</div>
				<div className="plantlane-landing-container plantlane-landing-bg-color">
					<h1 className="landing-header">IN THE SPOTLIGHT</h1>
					<div className="plantlane-landing-card-container">
						<InTheSpotlightList imagePrefix='in-the-spotlight' data={inTheSpotLight} />
					</div>
				</div>
				<div className="plantlane-landing-container ">
					<h1 className="landing-header">SHOP FOR GIFTS</h1>
					<div className="plantlane-landing-card-container">
						<GiftList imagePrefix='in-the-spotlight' data={shopForGifts} />
					</div>
				</div>
				<div className="plantlane-landing-container plantlane-landing-bg-color">
					<h1 className="landing-header plantlane-capitalize">What makes your house a home</h1>
					<div className="plantlane-landing-card-container plantlane-mobile-scroll-card-container">
					{
						houseHome.map(category => 
							<HouseCard 
								key={category.name + category.id}
								capitalize 
								link={'/products/category/' + category.id}
								category={category.name} 
								text={`${category.product_count} Items`} 
								image={config.mediaBaseURL + '/category/what-makes-your-' + category.position + '.jpg'} 
							/>
						)
					}
					</div>
				</div>
				<div className="">
					<div className="plantlane-landing-container">
						<h1 className="landing-header plantlane-capitalize">Recently viewed & More ...</h1>
						<div className="plantlane-landing-card-container">
							{recentlyViewed && <ProductList category={recentlyViewed} />}
						</div>
					</div>
					<div className="py-4"></div>
				</div>
				<div className="plantlane-landing-container plantlane-landing-bg-color">
					<h1 className="landing-header plantlane-capitalize">Trending searches</h1>
					<div className="plantlane-landing-trendingsearch-card-container">
						<TrendingSearchCard searchText="Vertical Garden decor" />
						<TrendingSearchCard searchText="Vertical Garden decor" />
						<TrendingSearchCard searchText="Vertical Garden decor" />
						<TrendingSearchCard searchText="Vertical Garden decor" />
						<TrendingSearchCard searchText="Vertical Garden decor" />
						<TrendingSearchCard searchText="Vertical Garden decor" />
					</div>
				</div>
				<div className="plantlane-landing-container ">
					<h1 className="landing-header plantlane-capitalize">Curated Collection</h1>
					<div className="plantlane-landing-card-container">
						<InTheSpotlightList imagePrefix='curated-collection' data={curatedCollection} />
					</div>
				</div>
				<div className="plantlane-landing-container plantlane-landing-bg-color">
					<h1 className="landing-header plantlane-capitalize">Home & Garden advice</h1>
					<div className="plantlane-landing-brand-container">
						<VideoCard title="Garden decoration Ideas Home made 2018" videoId="a9a9mafyqhk" views={669359} likes="3K" />
						<VideoCard title="32 DECOR LIFE HACKS" videoId="GXo_LmuIu7E" views={5362516} likes="56K" />
						<VideoCard title="How to make a Dragon Island | Aquascape | diorama" videoId="Sq5HcBypjAM" views={1240639} likes="26K" />
						<VideoCard title="Fascinating balcony garden designs" videoId="ria8AZR82ww" views={1227535} likes="3.7K" />
					</div>
				</div>
				<div className="plantlane-landing-container ">
					<h1 className="landing-header plantlane-capitalize">Top Brands</h1>
					<div className="plantlane-landing-brand-container">
						<BrandCard image={brand1} />
						<BrandCard image={brand2} />
						<BrandCard image={brand3} />
						<BrandCard image={brand4} />
						<BrandCard image={brand5} />
						<BrandCard image={brand6} />
						<BrandCard image={brand7} />
						<BrandCard image={brand8} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		categories:state.categories
	}
}

const mapDispatchToProps = {
	setSignup
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);