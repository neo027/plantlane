import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {fetchOrderHistory, cancelOrder} from '../../api/orders';


class OrderHistory extends Component {

	state = {
		orders:[],
		error:null,
		isLoading:true
	}

	componentDidMount(){
		fetchOrderHistory(this.props.user.id)
		.then(({items}) => this.setState({orders:items, isLoading:false}))
		.catch(error => this.setState({error:error.response.data, isLoading:false}));
	}

	handleCancelOrder = (orderId) => {
		return cancelOrder(orderId)
		.then(data => {
			if(data){
				let orders = [...this.state.orders];
				let idx = orders.findIndex(order => order.entity_id === orderId);
				if(idx > -1){
					orders[idx].status = 'canceled';
				}
				this.setState({orders});
			}
		})
		.catch(error => this.setState({error:error.response.data}));
	}


	handleReturn = (orderId) => {

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
			<div className="order-history-tab">
				{loader}
				{
					this.state.orders.map(order => 
						<div key={JSON.stringify(order)} className="order-card my-2 card">
							<div className="card-header" data-toggle="collapse" data-target={"#ORDER_ID_" + order.increment_id} aria-expanded="false" aria-controls={"ORDER_ID_" + order.increment_id}>
								<div className="row">
									<div className="col-sm-6">
										<b>
											<div>ORDER ID</div>
											<div>{order.increment_id}</div>
										</b>
									</div>
									<div className="col-sm-6 text-right">
										<b>
											<div>ORDER STATUS</div>
											<div>{order.status}</div>
										</b>
									</div>
								</div>
							</div>
							<div className="card-body collapse" id={"ORDER_ID_" + order.increment_id}>
								<div className="table-responsive">
									<table className="table table-borderless">
									  <thead>
									    <tr>
									      <th scope="col">#</th>
									      <th scope="col">Product Name</th>
									      <th scope="col">Price</th>
									      <th scope="col">Quantity</th>
									      <th scope="col">Subtotal</th>
									    </tr>
									  </thead>
									  <tbody>
										  {
										  	order.items.map(item =>
											    <tr key={JSON.stringify(item)}>
											      <th scope="row">{item.product_id}</th>
											      <td>{item.name}</td>
											      <td>{order.base_currency_code} {item.price_incl_tax}</td>
											      <td>{item.qty_ordered}</td>
											      <td>{order.base_currency_code} {item.base_row_total_incl_tax}</td>
											    </tr>
										  	)
										}
									  	<tr className="border-top">
									      <th scope="row"></th>
									      <td></td>
									      <td></td>
									      <td>Subtotal</td>
									      <td>{order.base_subtotal_incl_tax}</td>
										</tr>
										<tr>
									      <th scope="row"></th>
									      <td></td>
									      <td></td>
									      <td>Shipping & Handling</td>
									      <td>{order.base_shipping_incl_tax}</td>
										</tr>
										<tr>
									      <th scope="row"></th>
									      <td></td>
									      <td></td>
									      <td><b>Grand Total</b></td>
									      <td><b>{order.base_grand_total}</b></td>
										</tr>
									  </tbody>
									</table>
								</div>
								{
									(order.status === 'pending') && 
									<div className="text-right">
										<button onClick={() => this.handleCancelOrder(order.entity_id)} className="btn btn-sm btn-danger">Cancel Order</button>
									</div>
								}
								{
									order.status !== 'pending' && order.status !== 'canceled' && 
									<div className="text-right">
										<button onClick={() => this.handleReturn(order.entity_id)} className="btn btn-sm btn-danger">Cancel / Return</button>
									</div>
								}
							</div>
						</div>
					)
				}
			</div>
		);
	}
}

export default OrderHistory;