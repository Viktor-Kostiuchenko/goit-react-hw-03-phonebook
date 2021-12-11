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

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const updatedContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (updatedContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = { id: nanoid(), name, number };
    const nameDublicate = contacts.find(
      contact => contact.name === newContact.name,
    );
    const numberDublicate = contacts.find(
      contact => contact.number === newContact.number,
    );

    if (nameDublicate) {
      notificate(newContact.name);
      return;
    } else if (numberDublicate) {
      notificate(newContact.number);
      return;
    }

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
        <Logo></Logo>
        <Section title="Phonebook">
          <ContactForm onSubmit={addContact}></ContactForm>
        </Section>

        <Section title="Contacts">
          <Filter value={filter} onChange={filterByName}></Filter>
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={deleteContact}
          ></ContactList>
        </Section>
      </div>
    );
  }
}
