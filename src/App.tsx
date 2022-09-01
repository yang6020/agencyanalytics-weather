import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import NotFound from "./pages/404";
import Weather from "./pages/Weather";
import { Config } from "./types";

const config: Config = require("./config.json");

const paths = ["/"].concat(config.cities.map((city) => `/${city}`));
interface MatchParams {
  city?: string;
}

console.log(paths);
export interface Props extends RouteComponentProps<MatchParams> {}

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={paths}
          render={(props: Props) => <Weather {...props} />}
        />
        <Route path="/404">
          <NotFound />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
}
export default AppRouter;
