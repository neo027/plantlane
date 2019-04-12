import React, {Component} from 'react';


class Success extends Component {

	render(){
		return (
			<section className="section-b-space light-layout">
			    <div className="container">
			        <div className="row">
			            <div className="col-md-12">
			                <div className="success-text"><i className="fa fa-check-circle" aria-hidden="true"></i>
			                    <h2>thank you</h2>
			                    <p>Payment is successfully processsed and your order is on the way</p>
			                    <p>Transaction ID:{this.props.match.params.txnId}</p>
			                </div>
			            </div>
			        </div>
			    </div>
			</section>
		);
	}
}

export default Success;