import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import SuperHeroesPage from "./components/SuperHeroes.page";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import HomePage from "./components/Home.page";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient(); // instance of query client

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={<HomePage />}>
              <HomePage />
            </Route>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
