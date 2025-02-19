import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InfiniteScroll from './components/InfiniteScroll';
import './App.css';

function App() {	

	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/infinite-scroll" element={<InfiniteScroll />}  />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;