import logo from './logo.svg';
import './App.css';
import { Switch, Route} from 'react-router-dom';
import { LandingPage, MenuPage, DashboardPage, LoadingPage} from './pages';

function App() {
  
  return (
    <Switch>
      <Route path="/" exact={true} component={ LandingPage } />
      <Route path="/menu" exact={true} component={ MenuPage } />
      <Route path="/dashboard/:id" exact={true} component={ DashboardPage }/>
      <Route path="/loading" exact={true} component={ LoadingPage } />
      <Route
        path="/dashboard/:guildId/general/muted"
        exact={true}
        component={DashboardPage}
      />
      
    </Switch>
    
  );
}

export default App;
