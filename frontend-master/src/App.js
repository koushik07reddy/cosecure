import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./views/Home"
import AdminView from "./views/AdminView"
import AdminPage from "./views/AdminPage"
import AddPage from "./views/AddPage"

function App() {
  return (
    <div className="app">
      <Router>
        <div>
          <Switch>
            <Route path="/add-dataset">
              <AddPage />
            </Route>
            <Route path="/admin-page">
              <AdminPage />
            </Route>
            <Route path="/admin">
              <AdminView />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
