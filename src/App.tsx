
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import PersonalInfoPage from './pages/PersonalInfo/PersonalInfoPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/personal-info" replace />} />
      <Route
        path="/personal-info"
        element={
          <MainLayout>
            <PersonalInfoPage />
          </MainLayout>
        }
      />
      {/* Add more routes here as needed */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
