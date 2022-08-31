import { BrowserRouter, Route, Switch } from "react-router-dom";
import Weather from "./components /Weather";

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Weather city="ottawa" />
        </Route>
        <Route path="/ottawa">
          <Weather city="ottawa" />
        </Route>
        <Route path="/moscow">
          <Weather city="moscow" />
        </Route>
        <Route path="/tokyo">
          <Weather city="tokyo" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default AppRouter;
