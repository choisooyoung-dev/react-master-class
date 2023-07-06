import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/react-master-class/:coinId">
          <Coin />
        </Route>
        <Route path="/react-master-class">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
