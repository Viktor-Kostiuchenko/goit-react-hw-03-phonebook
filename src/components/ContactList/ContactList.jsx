import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';
import s from './ContactList.module.css';

export default function ContactList({ contacts, onDeleteContact }) {
  return (
    <>
      <p className={s.total}>
        Total contacts:
        <span className={s.amount}> {contacts.length}</span>
      </p>
      <ul>
        {contacts.map(({ id, name, number }) => (
          <li key={id} className={s.item}>
            <ContactItem
              id={id}
              name={name}
              number={number}
              onDeleteContact={onDeleteContact}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
