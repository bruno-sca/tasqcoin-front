import { Route, Routes } from 'react-router-dom';

import { Wrapper } from './components';
import { Feedback, Login } from './pages';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Login />} />
      <Route path="/" element={<Wrapper />}>
        <Route path="/" element={<Feedback />} />
      </Route>
    </Routes>
  );
};
