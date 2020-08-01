import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import Activity from './Activity';
import ActivitiesStyled from './ActivitiesStyled';
import Field from './Field';

const Icon = () => (
  <IoMdAdd color="green" size="1.5em" />
);

const Activities = ({
  activities,
  userId,
  isLogged,
  registerActivity,
  leftActivity,
  tags,
  location,
  tagName,
  changeField,
  changeTag,
}) => {
  const [stateActivities, setStateActivities] = useState('');
  const [message, setMessage] = useState('');

  const showActivity = [];
  const showActivity2 = [];
  const viewActivity = (!!stateActivities.length);

  useEffect(() => {
    activities.forEach((activity) => {
      if (tagName !== '') {
        if (activity.tags[0].name.toLowerCase().indexOf(tagName.toLowerCase()) !== -1) {
          showActivity.push(activity);
        }
      }
      if (location !== '') {
        if (activity.location.toLowerCase().indexOf(location.toLowerCase()) !== -1
          && !showActivity.includes(activity)) {
          showActivity.push(activity);
        }
      }
    });
    setMessage(`${showActivity.length} activité(s) disponible(s)`);
    setStateActivities(showActivity);
  }, [tagName, location]);

  useEffect(() => {
    activities.forEach((activity) => {
      if (tagName !== '') {
        if (activity.tags[0].name.toLowerCase().indexOf(tagName.toLowerCase()) !== -1) {
          showActivity2.push(activity);
        }
      }
      if (location !== '') {
        if (activity.location.toLowerCase().indexOf(location.toLowerCase()) !== -1
          && !showActivity2.includes(activity)) {
          showActivity2.push(activity);
        }
      }
    });

    setMessage(`${showActivity2.length} activité(s) disponible(s)`);
    setStateActivities(showActivity2);
  }, [activities]);

  useEffect(() => {
    document.title = 'Activités';
  }, []);

  const handleChangeTag = (evt) => {
    changeTag(evt.target.value);
  };
  return (
    <ActivitiesStyled>
      <h1>Faites votre recherche</h1>
      <form className="login-form-element">
        <Field
          name="location"
          placeholder="Lieu"
          onChange={changeField}
          value={location}
        />
        <p>Tag :</p>
        <select onChange={handleChangeTag} name="tagList" id="chooseTag">
          {tags.map((tag) => (
            <option key={tag.id} value={tag.name}>{tag.name}</option>
          ))}
        </select>
      </form>
      {isLogged && (
        <div className="div-link">
          <Link to="/create" className="link-activity">Créer votre activité <Icon /></Link>
        </div>
      )}
      {viewActivity && (
      <div className="contain">
        <p className="message">{message}</p>
        <div className="cards">
          {stateActivities.map((activity) => (
            <Activity
              key={activity.id}
              tagList={tags}
              {...activity}
              userProfilId={userId}
              leftActivity={leftActivity}
              isLogged={isLogged}
              registerActivity={registerActivity}
            />
          ))}
        </div>
      </div>
      )}
      {!viewActivity && (
        <div className="contain">
          <div className="cards">
            {activities.map((activity) => (
              <Activity
                key={activity.id}
                tagList={tags}
                {...activity}
                userProfilId={userId}
                leftActivity={leftActivity}
                isLogged={isLogged}
                registerActivity={registerActivity}
              />
            ))}
          </div>
        </div>
      )}
    </ActivitiesStyled>
  );
};

Activities.propTypes = {
  leftActivity: PropTypes.func.isRequired,
  registerActivity: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  userId: PropTypes.node.isRequired,
  tags: PropTypes.array.isRequired,
  location: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  changeTag: PropTypes.func.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Activities;
