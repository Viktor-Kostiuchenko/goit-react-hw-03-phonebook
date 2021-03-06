import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Section from '../Section';
import ContactForm from '../Form';
import ContactList from '../ContactList';
import Filter from '../Filter';
import Logo from '../Logo';
import { notificate } from '../../helpers/notifications';
import s from './App.module.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'Viktor Kost', number: '221-19-88' },
    ],
    filter: '',
  };

  #localStorageKey = 'contacts';

  componentDidMount() {
    const contacts = localStorage.getItem(this.#localStorageKey);
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const updatedContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (updatedContacts !== prevContacts) {
      localStorage.setItem(
        this.#localStorageKey,
        JSON.stringify(updatedContacts),
      );
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const nameDublicate = contacts.find(contact => contact.name === name);
    const numberDublicate = contacts.find(contact => contact.number === number);

    if (nameDublicate) {
      notificate(name);
      return;
    } else if (numberDublicate) {
      notificate(number);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filterByName = e => {
    this.setState({ filter: e.target.value });
  };

  showFiltered = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.showFiltered();
    const filterByName = this.filterByName;
    const addContact = this.addContact;
    const deleteContact = this.deleteContact;

    return (
      <div className={s.container}>
        <Logo />
        <Section title="Phonebook">
          <ContactForm onSubmit={addContact} />
        </Section>

        <Section title="Contacts">
          <Filter value={filter} onChange={filterByName} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={deleteContact}
          />
        </Section>
      </div>
    );
  }
}
