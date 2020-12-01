import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { AirlineContextProvider } from './context/AirlineContext';
import Home from './routes/Home';
import AirlineDetailPage from './routes/AirlineDetailPage';
import UpdatePage from './routes/UpdatePage';

const App = () => {
    return (
        <AirlineContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/restaurants/:id/update" component={UpdatePage}/>
                        <Route exact path="/restaurants/:id" component={AirlineDetailPage}/>
                    </Switch>
                </Router>
            </div>
        </AirlineContextProvider>
    );
};

export default App;