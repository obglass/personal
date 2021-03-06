import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from './pages/Movies'
import Shows from './pages/Shows'
import Home from './pages/Home'
import Navigation from './components/Navigation'

class AppControl extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation />
                        <Routes>
                            <Route path='/personal/' element={<Home/>}/>
                            <Route path='/personal/movies' element={<Movies/>} />
                            <Route path='/personal/shows' element={<Shows/>} />
                            <Route element={<Home/>}/>
                        </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppControl