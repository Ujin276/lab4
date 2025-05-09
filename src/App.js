import { useState } from 'react';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserPlaces from './pages/UserPlaces';
import AfterLogin from './pages/AfterLoginPage';
import Detail from './pages/PlacesDetail';
import AddPlacePage from './pages/AddPlaces';
import EditPlace from './pages/EditPlacePage';

export default function NavigationPage() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(null);

  const navigateTo = (page) => setCurrentPage(page);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
      {currentPage === 'register' && <RegisterPage navigateTo={navigateTo} />}
      {currentPage === 'login' && <LoginPage navigateTo={navigateTo} />}
      {currentPage === 'userPlaces' && (<UserPlaces navigateTo={navigateTo} setSelectedPlaceIndex={setSelectedPlaceIndex}
        />
      )}
      {currentPage === 'AfterLogin' && (<AfterLogin navigateTo={navigateTo} setSelectedPlaceIndex={setSelectedPlaceIndex}
        />
      )}
      {currentPage === 'detail' && <Detail navigateTo={navigateTo} />}
      {currentPage === 'addPlace' && <AddPlacePage navigateTo={navigateTo} />}
      {currentPage === 'editPlace' && selectedPlaceIndex !== null && (<EditPlace navigateTo={navigateTo} selectedPlaceIndex={selectedPlaceIndex}
        />
      )}
    </div>
  );
}
