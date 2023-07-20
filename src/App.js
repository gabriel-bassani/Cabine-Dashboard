import './App.css';
import { Cabine } from './components/cabine';
import { Usuarios } from './components/usuarios';
import { Header } from './components/header';
import { Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Cabine />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </div>
    </LocalizationProvider>
  );
}

export default App;
