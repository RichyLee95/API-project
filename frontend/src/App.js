import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch,Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/Spots/SpotIndex";
import CreateSpotForm from './components/Spots/CreateSpotForm'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
      <Switch>
        <Route exact path='/' component={SpotIndex}/>
        <Route path='/spots/new' component={CreateSpotForm}/>
        </Switch>
        )}
    </>
  );
}

export default App;
