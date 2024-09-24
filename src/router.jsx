import { createBrowserRouter } from 'react-router-dom';
import DecisionPage from './components/DecisionPage';
import WpMethodPage from './components/WpMethodPage';
import DirectMethodPage from './components/DirectMethodPage';
import FruitPreferenceSlider from './components/FruitPreferenceSlider';
import AhpMethodPage from './components/AhpMethodPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DecisionPage />,
  },
  {
    path: "/weight-wp-method",
    element: <WpMethodPage />,
  },
  {
    path: "/weight-direct-method",
    element: <DirectMethodPage />,
  },
  {
    path: "/weight-ahp-method",
    element: <AhpMethodPage />,
  },
  // Example
  {
    path: "/fruit-slider",
    element: <FruitPreferenceSlider />,
  },
]);

export default router;
