import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Login />} />
    </Routes>
  );
};
