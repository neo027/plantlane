import React, {Component} from 'react';


import {fetchFilters} from '../../api/products';

import './productfilter.css';


class ProductFilter extends Component {

    state = {
        active:0,
        colorFilter:[],
        sizeFilter:[],
        min:100,
        max:100000,
        selectedColor:[],
        selectedSize:[]
    }

    componentDidMount(){
        fetchFilters()
        .then(([filter1, filter2]) => {
            let colorFilter = [], sizeFilter = [];
            if(filter1.attribute_code === 'color'){
                colorFilter = filter1.options.filter(option => !(option.label === "" || option.label === null || option.label === undefined))
                sizeFilter = filter2.options.filter(option => !(option.label === "" || option.label === null || option.label === undefined))
            }
            else {
                colorFilter = filter2.options.filter(option => !(option.label === "" || option.label === null || option.label === undefined))
                sizeFilter = filter1.options.filter(option => !(option.label === "" || option.label === null || option.label === undefined))
            }

            this.setState({sizeFilter, colorFilter});
        });
    }

    generateFilter = (min, max, selectedSize, selectedColor) => {
        let filter = `searchCriteria[filter_groups][1][filters][0][field]=price&searchCriteria[filter_groups][1][filters][0][value]=${min}&searchCriteria[filter_groups][1][filters][0][condition_type]=from&searchCriteria[filter_groups][2][filters][0][field]=price&searchCriteria[filter_groups][2][filters][0][value]=${max}&searchCriteria[filter_groups][2][filters][0][condition_type]=to&`

        let fgIdx = 0;
        selectedSize.forEach(size => {
            filter += `searchCriteria[filter_groups][3][filters][${fgIdx}][field]=size&searchCriteria[filter_groups][3][filters][${fgIdx}][value]=${size}&`
            fgIdx += 1;
        });

        fgIdx = 0;
        selectedColor.forEach(color => {
            filter += `searchCriteria[filter_groups][4][filters][${fgIdx}][field]=color&searchCriteria[filter_groups][4][filters][${fgIdx}][value]=${color}&`
            fgIdx += 1;
        });

        return filter;
    }

    handlePriceRange = (e) => {
        let max = parseInt(e.target.value) === 0 ? 100 : parseInt(e.target.value) * 1000;
        let {selectedSize, selectedColor, min} = this.state;

        this.props.onFilterChange(this.generateFilter(min, max, selectedSize, selectedColor));
        this.setState({max});
    }

    handleSizeFilterApply = (value) => {
        let selectedSize = [...this.state.selectedSize];
        let {max, selectedColor, min} = this.state;

        let idx = selectedSize.findIndex(size => size === value);
        
        if(idx > -1){
            selectedSize.splice(idx, 1);
        }
        else {
            selectedSize.push(value);
        }

        this.props.onFilterChange(this.generateFilter(min, max, selectedSize, selectedColor));
        this.setState({selectedSize});
    }

    handleColorFilterApply = (value) => {
        let selectedColor = [...this.state.selectedColor];
        let {selectedSize, max, min} = this.state;

        let idx = selectedColor.findIndex(size => size === value);
        
        if(idx > -1){
            selectedColor.splice(idx, 1);
        }
        else {
            selectedColor.push(value);
        }

        this.props.onFilterChange(this.generateFilter(min, max, selectedSize, selectedColor));
        this.setState({selectedColor});
    }

	render(){
        let {active} = this.state;

		return (
			<div className="col-sm-3 collection-filter plantlane-mobile-filter">
                
                <div className="collection-filter-block">
                    
                    <div className="collection-mobile-back"><span className="filter-back"><i className="fa fa-angle-left" aria-hidden="true"></i> back</span></div>
                    <div className="collection-filter-block-ex-back">
                        <div className={"collection-collapse-block border-0 open" + (active === 0 ? " active" : "")}>
                            <h3 onClick={() => this.setState({active:0})} className="collapse-block-title">price</h3>
                            <div className="collection-collapse-block-content">
                                <div className="collection-brand-filter">
                                    <div className="">
                                        <label className="mb-1 mt-2">&#8377;{this.state.min} - &#8377;{this.state.max}</label>
                                        <input type="range" onChange={this.handlePriceRange} className="form-control-range" id="hundred"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"collection-collapse-block border-0 open" + (active === 1 ? " active" : "")}>
                            <h3 onClick={() => this.setState({active:1})} className="collapse-block-title">size</h3>
                            <div className="collection-collapse-block-content">
                                <div className="collection-brand-filter">
                                {
                                    this.state.sizeFilter && this.state.sizeFilter.map(filter => 
                                        <div onClick={() => this.handleSizeFilterApply(filter.value)} key={'SIZE_' + filter.value} className="custom-control custom-checkbox collection-filter-checkbox">
                                            <input type="checkbox" className="custom-control-input" value={filter.value} checked={this.state.selectedSize.includes(filter.value)} readOnly/>
                                            <label className="custom-control-label" htmlFor="zara">{filter.label}</label>
                                        </div>
                                    )
                                }
                                </div>
                            </div>
                        </div>
                        
                        <div className={"collection-collapse-block border-0 open" + (active === 2 ? " active" : "")}>
                            <h3 onClick={() => this.setState({active:2})} className="collapse-block-title">colors</h3>
                            <div className="collection-collapse-block-content">
                                <div className="color-selector">
                                    <ul className="color-variant">
                                    {
                                        this.state.colorFilter && this.state.colorFilter.map(filter => 
                                            <li onClick={() => this.handleColorFilterApply(filter.value)} key={'COLOR_'+filter.value} style={{backgroundColor:filter.label}}>{this.state.selectedColor.includes(filter.value) ? <div className="selected">&#x2713;</div> : ""}</li>
                                        )
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
		);
	}
}

export default ProductFilter;