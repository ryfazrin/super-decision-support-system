import { createBrowserRouter } from 'react-router-dom';
import DecisionPage from './components/DecisionPage';
import WpMethodPage from './components/WpMethodPage[BUG]';
import DirectMethodPage from './components/DirectMethodPage';
import FruitPreferenceSlider from './components/FruitPreferenceSlider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DecisionPage />,
  },
  {
    path: "/weight",
    element: <WpMethodPage />,
  },
  {
    path: "/weight-direct-method",
    element: <DirectMethodPage />,
  },
  {
    path: "/fruit-slider",
    element: <FruitPreferenceSlider />,
  },
]);

export default router;
