import { useState } from 'react';
import close from '../../i/close.png';
import { useFilms } from '../contexts/FilmsContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddFilm = ({isOpenFilm, isCloseFilm, onAddFilm}) => {
  const [filmName, setFilmName] = useState('');
  const [filmDuration, setFilmDuration] = useState('');
  const [filmDescription, setFilmDescription] = useState('');
  const [filmCountry, setFilmCountry] = useState('');
  const { handleAddFilm} = useFilms();

  const [posterFile, setPosterFile] = useState(null);
  if (!isOpenFilm) return null; 

  const handleSubmit = async () => {
    if (filmName && filmDuration && filmDescription && filmCountry) {
      const formData = new FormData();
      formData.append("name", filmName);
      formData.append("duration", filmDuration);
      formData.append("description", filmDescription);
      formData.append("country", filmCountry);
      if (posterFile) {
        formData.append("poster", posterFile);
      }
  
      await handleAddFilm(formData);
  
      setFilmName('');
      setFilmDuration('');
      setFilmDescription('');
      setFilmCountry('');
      setPosterFile(null);
      isCloseFilm();
    }
  }
  
  return (
    <Formik
      initialValues={{
        name: '',
        duration: '',
        description: '',
        country: '',
        text: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Введите название фильма'),
        duration: Yup.number()
          .typeError('Введите число') 
          .required('Введите продолжительность фильма')
          .min(15, 'Минимум 15 минут'),
        description: Yup.string()
          .typeError('Введите число')
          .required('Введите описание фильма'),
        country: Yup.string()
        .required('Введите страну фильма'),
      })}
      onSubmit={handleSubmit}
    >
    {({ setFieldValue }) => (
      <div className="popup active">
        <div className="popup__container">
          <div className="popup__content">
            <div className="popup__header">
              <h2 className="popup__title">
                Добавление фильма
                <a className="popup__dismiss" href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  isCloseFilm()}}
                  ><img src={close} alt="Закрыть"/></a>
              </h2>
            </div>
            <div className="popup__wrapper">
              <Form action="add_movie">
                <div className="popup__container">
                  <div className="popup__poster"></div>
                  <div className="popup__form">
                    <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                      Название фильма
                      <Field 
                      className="conf-step__input" 
                      type="text" 
                      value={filmName}
                      placeholder="Например, Гражданин Кейн" 
                      name="name" 
                      onChange={(e) => {
                        setFilmName(e.target.value);
                        setFieldValue("name", e.target.value)
                      }}/>
                      <ErrorMessage component="div" className="error" name="name" style={{width: '100%'}}/>
                    </label>
                    <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                      Продолжительность фильма (мин.)
                      <Field 
                      className="conf-step__input" 
                      type="text"  
                      name="duration" 
                      value={filmDuration}
                      onChange={(e) => {
                        setFilmDuration(e.target.value);
                        setFieldValue("duration", e.target.value)
                      }}/>
                     <ErrorMessage component="div" className="error" name="duration" style={{width: '100%'}}/>
                    </label>
                    <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                      Описание фильма
                      <Field 
                        value={filmDescription} 
                        className="conf-step__input" 
                        type="text" 
                        name="description"  
                        as="textarea"
                        onChange={(e) => {
                          setFilmDescription(e.target.value);
                          setFieldValue("description", e.target.value)
                        }}>
                        </Field>
                      <ErrorMessage component="div" className="error" name="description" style={{width: '100%'}}/>
                    </label>
                    <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                      Страна
                      <Field 
                      className="conf-step__input" 
                      value={filmCountry}  
                      type="text"  
                      name="country" 
                      onChange={(e) => {
                        setFilmCountry(e.target.value);
                        setFieldValue("country", e.target.value)
                      }}/>
                      <ErrorMessage component="div" className="error" name="country" style={{width: '100%'}}/>
                    </label>
                  </div>
                </div>
                <div className="conf-step__buttons text-center">
                  <input type="submit" value="Добавить фильм" className="conf-step__button conf-step__button-accent" data-event="film_add"/>
                  <label className="conf-step__button conf-step__button-accent" style={{ cursor: 'pointer' }}>
                    Загрузить постер
                    <input 
                      type="file" 
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => setPosterFile(e.target.files[0])}
                    />
                  </label>
                  <button className="conf-step__button conf-step__button-regular" type="button" onClick={isCloseFilm}>Отменить</button>
                </div>
              </Form>
        
            </div>
          </div>
        </div>
      </div>
    )}
    </Formik>
  )
}

export default AddFilm;