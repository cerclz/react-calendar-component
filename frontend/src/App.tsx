import { Route, Routes } from 'react-router-dom';
import './App.css';
// elements imports
import { WeeklyCalendar } from './features/WeeklyCalendar/WeeklyCalendar';
import Stores from './features/stores/Stores';
import MainLayout from './layouts/MainLayout/MainLayout';
import CreateStore from './features/stores/CreateStore';
import EditStore from './features/stores/EditStore';


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<WeeklyCalendar />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/create" element={<CreateStore />} />
        <Route path="/stores/:id/edit" element={<EditStore />} />
      </Route>
    </Routes>
  );
}

export default App;
