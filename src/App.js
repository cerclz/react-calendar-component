// import logo from './logo.svg';
import './App.css';
import { WeeklyCalendar } from './components/WeeklyCalendar/WeeklyCalendar';

const tasks = [
  {
    id: "1",
    title: "Gym",
    date: "2026-01-10",
    start: 9 * 60 + 15,
    end: 10 * 60 + 30,
    category: "Health",
    comments: "Leg day",
  },
  {
    id: "2",
    title: "Client call",
    date: "2026-01-10",
    start: 12 * 60,
    end: 12 * 60 + 45,
    category: "Work",
    comments: "",
  },
]

function App() {
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
    <WeeklyCalendar tasks={tasks}/>
  );
}

export default App;
