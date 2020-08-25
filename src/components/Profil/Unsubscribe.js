import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UnsubscribeStyled from './UnsubscribeStyled';

const Unsubscribe = ({ handleUnsubscribe, activities, userId }) => {
  useEffect(() => {
    document.title = 'Me désinscrire';
  }, []);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const findActivityAuthor = () => new Promise((resolve) => {
    const value = activities.find((activity) => activity.user_id === parseInt(userId, 10));
    resolve(value);
  });
  const buttonHandleClick = () => {
    findActivityAuthor().then((result) => {
      if (result) {
        // eslint-disable-next-line no-alert
        alert('Vous devez supprimer toutes les activités dont vous êtes l\'auteur avant de pouvoir vous désinscrire');
      }
      else {
        setLoading(true);
        setMessage('Désinscription en cours ...');
        setTimeout(() => {
          setLoading(false);
          handleUnsubscribe();
        }, 1000);
      }
    });
  };

  return (
    <UnsubscribeStyled>
      <p>Etes-vous sur de vouloir vous désinscrire, votre profil sera supprimé !</p>
      <button type="button" onClick={buttonHandleClick}>Se désinscrire</button>
      {loading && <p style={{ fontWeight: 'bold' }}>{message}</p>}
    </UnsubscribeStyled>
  );
};

Unsubscribe.propTypes = {
  handleUnsubscribe: PropTypes.func.isRequired,
  activities: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Unsubscribe;
