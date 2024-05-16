import React from 'react';
import { useNavigate } from "react-router-dom";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

function AdminHomePage() {

  let navigate = useNavigate()

  const handleSelect = ({ itemId }) => {
    if (itemId === '/logout') {

      localStorage.removeItem('tokenAdmin');
      // Redirect to login page
      navigate('/');

    } else {
      navigate(itemId);
    }
  };

    return (
        <div style={styles.sidebar}>
            <Navigation
            // you can use your own router's api to get pathname
            activeItemId={window.location.pathname}
            onSelect={handleSelect}
            items={[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
                //elemBefore: () => <Icon name="inbox" />,
              },
              {
                title: 'Gestão de Utilizadores',
                itemId: '/management',
                //elemBefore: () => <Icon name="users" />,
                subNav: [
                  {
                    title: 'Novo Utilizador',
                    itemId: '/management/projects',
                  },
                  {
                    title: 'Gerir Utilizadores',
                    itemId: '/management/members',
                  },
                ],
              },
              {
                title: 'Logout',
                itemId: '/logout',
                // you can use your own custom Icon component as well
                // icon is optional
                //elemBefore: () => <Icon name="inbox" />,
              },
            ]}
          />
        </div>
        
    );
}

const styles = {
  sidebar: {
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'left',
      height: '20%',
  },
}


export default AdminHomePage