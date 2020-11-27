import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

class Filters extends React.Component{
    
    constructor(){
        super();
        this.state = {
            filter:{
                launch_year: null,
                launch_success: null,
                land_success: null,
            }
        }

    }

    componentDidUpdate(){
        this.props.dispatch({
            'type': 'filterLaunches',
            payload: { filter: this.state.filter}
        })
    }
    
    componentDidMount(){
        let params = queryString.parse(this.props.location.search);
        let filter = {
            launch_year: (params.launch_year) ? params.launch_year : null,
            launch_success: (params.launch_success) ? params.launch_success : null,
            land_success: (params.land_success) ? params.land_success : null,
        }
        this.setState({
            filter: filter
        });
    }

    changeFilterHandler = (event) => {

        let filter = {...this.state.filter};
        filter[event.target.name] = event.target.value
        this.setState({
            filter:filter
        });

        let params = [];
        for (const key in filter) {
            if(filter[key]){
                params.push(`${key}=${filter[key]}`);
            }
        }

        this.props.history.push('/?'+params.join('&'));
        

    }

    resetForm = (event) => {
        let filter = {
            launch_year: null,
            launch_success: null,
            land_success: null,
        }

        this.setState({
            filter: filter
        })
        /* this.props.dispatch({
            'type': 'filterLaunches',
            payload: { filter: filter}
        }) */
        this.props.history.push('/');
    }

    render(){
        let selectYear = [];
        for(let i=2006; i<= 2020; i++){
            selectYear.push(i);
        }

        
        return (
            <div className="col-md-3">
				
				<section className="panel">
					<header className="panel-heading">Filter</header>
					<div className="panel-body">
						<form role="form product-form">
                            
                            <div>
                                <h5>Launch Year</h5>
                                <select
                                    name="launch_year"
                                    className="form-control"
                                    onChange={this.changeFilterHandler}
                                    value={(this.state.filter.launch_year) ? this.state.filter.launch_year : ''}
                                    
                                >
                                    <option value=''>Select year</option>
                                    {
                                        selectYear.map((year,index)=>{
                                            return (<option key={index} value={year}>{year}</option>)
                                    
                                        })
                                    }
                                </select>
                            </div>


                            <div>
                                <h5>Successful Launch</h5>	
                                <div className="radio">
                                    <label>
                                        <input 
                                            checked={this.state.filter.launch_success == "true"}
                                            type="radio"
                                            name="launch_success"
                                            value="true"
                                            onChange={this.changeFilterHandler}
                                        />True 
                                    </label>
                                </div>

                                <div className="radio">
                                    <label>
                                        <input 
                                            checked={this.state.filter.launch_success == "false"}
                                            type="radio"
                                            name="launch_success"
                                            value="false"
                                            onChange={this.changeFilterHandler}
                                        />False 
                                    </label>
                                </div>
                            </div>

                            <div>
                                <h5>Successful Land</h5>	
                                <div className="radio">
                                    <label>
                                        <input
                                            checked={this.state.filter.land_success == "true"} 
                                            type="radio" 
                                            name="land_success" 
                                            value="true" 
                                            onChange={this.changeFilterHandler}
                                        />True 
                                    </label>
                                </div>

                                <div className="radio">
                                    <label>
                                        <input
                                            checked={this.state.filter.land_success == "false"} 
                                            type="radio" 
                                            name="land_success" 
                                            value="false" 
                                            onChange={this.changeFilterHandler}
                                        />False 
                                    </label>
                                </div>
                            </div>

                            <button className="btn btn-danger" type='reset' onClick={this.resetForm}>Reset</button>
						</form>
					</div>
				</section>
			</div>
        );
    }
}

export default connect()(withRouter(Filters));