// import './App.css';
import './css/normalize.css';
import './css/styles.css';
import Header from './components/Header';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<AuthPage />} />
          <Route path="/dashboard/" element={<Dashboard />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
