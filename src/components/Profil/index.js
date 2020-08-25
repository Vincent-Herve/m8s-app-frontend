/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoIosPeople } from 'react-icons/io';
import ProfilStyled from './ProfilStyled';

const Icon = () => (
  <IoIosPeople size="1.5em" className="author-icon" />
);

const Profil = ({ userProfil, userId, handleSignout, activities }) => {
  useEffect(() => {
    document.title = 'Mon profil';
  }, []);
  const Signout = () => {
    handleSignout();
  };

  const filteredActivities = [];

  for (let activityUsers of activities) {
    for (let activityUser of activityUsers.users) {
      if (activityUser.id === userId) {
        filteredActivities.push(activityUsers);
      }
    }
  }

  const viewActivities = (!filteredActivities.length);

  const [tab, setTab] = useState('infoUser');
  const generateClickHandler = (newTab) => () => {
    setTab(newTab);
  };

  const regex = /(\w+)-(\w+)-(\w+)/;

  return (
    <ProfilStyled>
      <h1>Mon profil</h1>
      <div>
        <div className="button-tab">
          <button type="button" className={tab === 'infoUser' ? 'currentTab' : ''} onClick={generateClickHandler('infoUser')}>Informations personnelles</button>
          <button type="button" className={tab === 'currentActivity' ? 'currentTab' : ''} onClick={generateClickHandler('currentActivity')}>Mes activités en cours</button>
        </div>
        {tab === 'infoUser' && (
          <section>
            <h2>Informations personnelles</h2>
            <ul className="ul">
              <li>Pseudo: {userProfil.username}</li>
              <li>Prénom: {userProfil.firstname}</li>
              <li>Nom: {userProfil.lastname}</li>
              <li>Email: {userProfil.email}</li>
            </ul>
          </section>
        )}
        {tab === 'currentActivity' && (
          <section className="section-activity">
            <h2>Mes activités en cours</h2>
            {viewActivities && <h4>Pas d'activité en cours</h4>}
            <div className="contain-card">
              {filteredActivities.map((activity) => {
                const authorActivity = (activity.user_id === userId);
                return (
                  <article className="article" key={activity.id}>
                    <h2 key={activity.title} className="content-title">{activity.title}</h2>
                    {activity.tags.map((tag) => (
                      <p key={tag.name} className="content-tag">{tag.name}</p>
                    ))}
                    <p key={activity.description} className="content-description"><span className="bold">Description</span>: {activity.description}</p>
                    <p key={activity.free_place} className="content-text"><span className="bold">Membre(s) inscrit(s) / Places max</span>: {activity.users.length} / {activity.free_place}</p>
                    <p key={activity.location} className="content-text"><span className="bold">Lieu</span>: {activity.location}</p>
                    <p key={activity.date} className="content-text"><span className="bold">Date</span>: {activity.date.replace(regex, '$3-$2-$1')}</p>
                    <p key={activity.hour} className="content-text"><span className="bold">Heure</span>: {activity.hour}</p>
                    {authorActivity && (
                      <>
                        <Icon />
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
      <Link className="button" to="/editprofil">Modifier mon profil</Link>
      <Link className="links" onClick={Signout} to="/">Se déconnecter</Link>
      <Link className="links" to="/unsubscribe">Se désinscrire</Link>
    </ProfilStyled>
  );
};

Profil.propTypes = {
  userProfil: PropTypes.object.isRequired,
  userId: PropTypes.node.isRequired,
  handleSignout: PropTypes.func.isRequired,
  activities: PropTypes.array.isRequired,
};

export default Profil;
