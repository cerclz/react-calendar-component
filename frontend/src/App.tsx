// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { WeeklyCalendar } from './components/WeeklyCalendar/WeeklyCalendar';
import Stores from './components/stores/Stores';


function App() {
  return (
    <Routes>
      <Route path="/" element={<WeeklyCalendar />} />
      <Route path="/stores" element={<Stores />} />
    </Routes>
  );
}

export default App;
