import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './Form.module.css';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
    )
    .required(''),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
    )
    .required(''),
});

export default class ContactForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          this.props.onSubmit(values);
          resetForm();
        }}
      >
        <Form autoComplete="off">
          <div className={s.inputBox}>
            <Field className={s.input} type="text" name="name" />
            <label className={s.label}>Name</label>
            <ErrorMessage
              component="div"
              name="name"
              className={s.errorMsg}
            ></ErrorMessage>
          </div>
          <div className={s.inputBox}>
            <Field className={s.input} type="tel" name="number" />
            <label className={s.label}>Number</label>
            <ErrorMessage
              component="div"
              name="number"
              className={s.errorMsg}
            ></ErrorMessage>
          </div>
          <button className={s.button} type="submit">
            <span className={s.buttonName}>Add contact</span>
          </button>
        </Form>
      </Formik>
    );
  }
}
