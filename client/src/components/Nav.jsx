import React from 'react';
import { Link } from 'react-router-dom';

import { CiMenuBurger } from 'react-icons/ci';

import { RiCloseFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const routes = [
  { route: 'produit', access: ['vendeur', 'admin', 'comptable'] },
  { route: 'utilisateur', access: ['admin'] },
  { route: 'fournisseur', access: ['admin', 'comptable'] },
  { route: 'client', access: ['vendeur', 'admin', 'comptable'] },
  { route: 'vente', access: ['vendeur', 'admin', 'comptable'] },

  { route: 'statistique', access: ['admin', 'comptable'] },
];
function Nav() {
  const navigate = useNavigate();

  const [hidden, setHidden] = React.useState(true);
  React.useEffect(() => {
    //fetching data
  }, []);
  function handleLogout() {
    localStorage.clear();
    navigate(`/`);
  }
  const currentRoute = window.location.pathname.substring(1);
  return (
    <>
      {hidden && (
        <CiMenuBurger
          className='absolute top-2 left-5 text-third text-3xl font-bold  cursor-pointer  lg:hidden'
          onClick={() => setHidden(() => false)}
        />
      )}

      <nav
        className={`bg-third p-5 rounded-3xl fixed  ${
          hidden ? 'hidden' : 'flex'
        } top-0 left-0 h-screen w-full z-10 flex-col gap-3 justify-center items-center shadow-xl lg:flex lg:static lg:h-[80vh] lg:w-[25%]`}
      >
        {!hidden && (
          <RiCloseFill
            className='absolute top-5 left-5 text-3xl font-bold text-red-500  cursor-pointer lg:hidden'
            onClick={() => setHidden(() => true)}
          />
        )}
        <h3 className='font-semibold text-xl'>
          {localStorage.getItem('user')}
        </h3>
        <button className=' font-semibold text-signM' onClick={handleLogout}>
          Déconnexion
        </button>
        <h2 className='font-bold text-2xl '>Menu</h2>
        <div className='flex flex-col items-center justify-center gap-3 w-full mt-2'>
          {routes.map((route, index) =>
            route.access.includes(localStorage.getItem('role')) ? (
              <Link
                to={'/' + route.route}
                key={index}
                className={`w-[90%] font-bold ${
                  currentRoute === route.route
                    ? 'bg-secondary shadow-lg'
                    : 'bg-primary'
                } rounded-lg p-2 text-third text-xl hover:opacity-80`}
              >
                {route.route}
              </Link>
            ) : null
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
