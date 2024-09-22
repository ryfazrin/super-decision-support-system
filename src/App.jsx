// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { RouterProvider } from 'react-router-dom';
import './App.css'
import router from './router.jsx';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
