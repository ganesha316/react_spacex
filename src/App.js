import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Filters from './Filters';
import Launches from './Launches';

function App() {
  	return (
		<div className="container bootdey">
			<BrowserRouter>
				<div className="col-md-12"><h1>SpeceX</h1></div>
				<Filters/>
				<Launches/>
			</BrowserRouter>
			<div className="col-md-12">Developed by Ganesh Patil</div>
		</div>
	);
}

export default App;
