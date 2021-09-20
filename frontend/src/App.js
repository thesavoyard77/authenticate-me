import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import PropertiesContainer from "./components/PropertiesContainer";
import PropertyPage from "./components/PropertyPage/PropertyPage";
import AddPropertyForm from './components/AddPropertyFormPage/AddPropertyForm'
import EditPropertyForm from "./components/EditPropertyForm/EditPropertyForm";
import UsersPage from "./components/UserPage/UserPage";
import ReservationPage from "./components/ReservationPage";

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
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/properties"  exact>
            <PropertiesContainer />
          </Route>
          <Route path="/properties/new">
            <AddPropertyForm />
            </Route>
          <Route path="/properties/:id" exact>
            <PropertyPage />
          </Route>
          <Route path="/properties/:id/edit">
            <EditPropertyForm />
          </Route>
          <Route path="/users/:id/reservations">
            <UsersPage />
          </Route>
          <Route path="/reservations/:id">
            <ReservationPage />
          </Route>
          <Route exact path="/">
            <PropertiesContainer />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
