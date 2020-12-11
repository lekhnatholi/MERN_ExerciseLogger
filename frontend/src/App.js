import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar.component';

import ExerciseList from './components/list_exercise.component';
import createExercise from './components/create_exercise.component';
import EditExercise from './components/edit_exercise.component';
import createUser from './components/create_user.component';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact={true} component={ExerciseList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create" component={createExercise} />
          <Route path="/user" component={createUser} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
