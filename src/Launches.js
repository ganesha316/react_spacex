import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Launches extends React.Component{
    constructor(){
        super();
    }
    
    render(){
        console.log('props', this.props);
        
        let processing = '';
        if(this.props.processing){
            processing = <h2>Processing...</h2>;
        }
        
        let launchList = '';
        if(this.props.launchList){
            launchList = this.props.launchList.map((item, index) => {
                return (
                    <div key={index} className="col-md-4">
                        <section className="panel">
                            <div className="pro-img-box">
                                <img src={item.links.mission_patch_small} alt="" /> 
                            </div>
                            <div className="panel-body text-center">
                                <h4><a href="#" className="pro-title"> {item.mission_name} </a></h4>
                                <p className="">Mission Ids: {item.mission_id.join(',')}</p>
                                <p className="">Launch Year: {item.launch_year}</p>
                                <p className="">Successful Launch: {(item.launch_success)? 'True' : 'False'}</p>
                                <p className="">Successful Landing:{(item.rocket.first_stage.cores[0].land_success) ? 'True' : 'False'}</p>
                            </div>
                        </section>
                    </div>
                )
            });
            if(!this.props.launchList.length && !this.props.processing){
                launchList = <h2>No Records Found!</h2>
            }
        }
        return (
            <div className="col-md-9">
				<div className="row product-list">
                    {processing}
                    {launchList}
				</div>
			</div>
        );
    }
}

export default connect((state,props)=>{
    return { 
        processing : state['LaunchReducers']['processing'],
        launchList : state['LaunchReducers']['launchList'] 
    };
})(Launches);