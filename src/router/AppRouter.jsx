import { Routes, Route } from 'react-router-dom';
import { EditorPage } from '../editor/pages/EditorPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/:code" element={<EditorPage />} />
      <Route path="/*" element={<EditorPage />} />
    </Routes>
  );
};
