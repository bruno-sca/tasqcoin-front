import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Feedback, Login } from './pages';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Login />} />
      <Route path="/" element={<Feedback />} />
    </Routes>
  );
};
