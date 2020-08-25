/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';
import CreateActivityStyled from './CreateActivityStyled';
import Field from './Field';

const CreateActivity = ({
  handleCreate,
  title,
  description,
  free_place,
  location,
  date,
  hour,
  tagId,
  tagValue,
  isLoading,
  changeField,
  changeTag,
}) => {
  useEffect(() => {
    document.title = 'Création d\'activité';
  }, []);

  const [message, setMessage] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // eslint-disable-next-line camelcase
    if (title === '' || description === '' || free_place === '' || location === '' || date === '' || hour === '' || tagValue === '') {
      return setMessage('Veuillez remplir tout les champs.');
    }

    setMessage('');
    handleCreate();
  };

  const handleChangeTag = (evt) => {
    changeTag(evt.target.value);
  };

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;

  return (
    <CreateActivityStyled>
      <section>
        <h1>Créaction d'activité</h1>
        <form className="login-form-element" onSubmit={handleSubmit}>
          <Field
            name="title"
            placeholder="Titre"
            onChange={changeField}
            value={title}
          />
          <Field
            name="description"
            placeholder="Description"
            onChange={changeField}
            value={description}
          />
          <Field
            name="free_place"
            type="number"
            placeholder="Place disponible"
            onChange={changeField}
            value={free_place}
          />
          <Field
            name="location"
            placeholder="Lieu"
            onChange={changeField}
            value={location}
          />
          <Field
            name="date"
            type="date"
            min={today}
            placeholder="Date"
            onChange={changeField}
            value={date}
          />
          <Field
            name="hour"
            type="time"
            placeholder="Heure"
            onChange={changeField}
            value={hour}
          />
          <p>Tag :</p>
          <select onChange={handleChangeTag} name="tagId" id="chooseTag">
            {tagId.map((tag) => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
          <div>
            <button
              type="submit"
              className="login-form-button"
            >
              Valider
            </button>
          </div>
        </form>
        <p style={{ color: 'red' }}>{message}</p>
        <ClipLoader
          css="loading"
          size={100}
          color="orange"
          loading={isLoading}
        />
      </section>
    </CreateActivityStyled>

  );
};
CreateActivity.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  free_place: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  tagId: PropTypes.array.isRequired,
  handleCreate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  changeTag: PropTypes.func.isRequired,
  tagValue: PropTypes.string.isRequired,
};

export default CreateActivity;
