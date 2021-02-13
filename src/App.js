import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/index";
import Signin from "./containers/Signin/index";
import "./App.css";
import Signup from "./containers/Signup/index";
import PrivateRoute from "./components/HOC/privateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import Products from './containers/products/index';
import Orders from './containers/orders/index';
import Category from './containers/category/index';
import { getinitialData } from './actions/initialData.action';
import NewPage from './containers/NewPage/index';
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getinitialData());
    }
   
  },[auth.authenticate]);
  
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" component={NewPage} />
        <PrivateRoute path="/products"  component={Products} />
        <PrivateRoute path="/orders"  component={Orders} />
        <PrivateRoute path="/category"  component={Category} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup"  component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
