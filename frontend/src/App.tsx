// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { WeeklyCalendar } from './features/WeeklyCalendar/WeeklyCalendar';
import Stores from './features/stores/Stores';
import MainLayout from './layouts/MainLayout/MainLayout';
import CreateStore from './features/stores/CreateStore';


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<WeeklyCalendar />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/create" element={<CreateStore />} />
      </Route>
    </Routes>
  );
}

export default App;
