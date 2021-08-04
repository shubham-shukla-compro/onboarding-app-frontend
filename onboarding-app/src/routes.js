import Dashboard from './components/Dashboard';
import AddTask from './components/AddTask';
import About from './components/About';

export default [
  { path: '/', component: Dashboard },
  { path: '/add-task', component: AddTask },
  { path: '/about', component: About },
];
