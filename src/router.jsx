import { createBrowserRouter } from 'react-router-dom';
import DecisionPage from './pages/DecisionPage';
import WpMethodPage from './pages/WpMethodPage';
import DirectMethodPage from './pages/DirectMethodPage';
import FruitPreferenceSlider from './components/FruitPreferenceSlider';
import AhpMethodPage from './pages/AhpMethodPage';
import AlternativeParametersForm from './pages/AlternativeParamPage';
import RankedAlternativesTable from './components/RankedAlternativesTable';
import InvestasiPage from './pages/InvestasiPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <InvestasiPage />,
  },
  {
    path: "/decision",
    element: <DecisionPage />,
  },
  {
    path: "/alternative-params",
    element: <AlternativeParametersForm />,
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
  {
    path: "/result",
    element: <RankedAlternativesTable />,
  },
  // Example
  {
    path: "/fruit-slider",
    element: <FruitPreferenceSlider />,
  },
]);

export default router;
