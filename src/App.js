import './App.scss';
import Home from './components/Home';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect
} from "react-router-dom";
import Posts from './components/Posts';
import Albums from './components/Albums';
import PostDetail from './components/PostDetail';
import Photos from './components/Photos';

function App() {
  return(
    <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/posts/:userId' component={Posts} />
      <Route exact path='/post-detail/:postId' component={PostDetail} />
      <Route exact path='/albums/:userId' component={Albums} />
      <Route exact path='/photos/:albumId' component={Photos} />
      <Route exact path='*' component={()=> <div className='fof'><h2><b>404</b>  | Page not found..</h2></div>} />
    </Switch>
  </Router>
  )
}

export default App;
