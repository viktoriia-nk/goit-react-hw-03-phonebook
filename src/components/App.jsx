import { Component } from "react"
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      // { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      // { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      // { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      // { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    let haveContact = false;
    this.state.contacts.forEach(el => {
      if (el.name.toLowerCase() === normalizedName) {
        alert(`${name} is already in contacts`);
        haveContact = true;
      }
    });

    if (haveContact) {
      return;
    }

    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };


  getSearchingContacts = () => {
    const lowerNorm = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(lowerNorm));
  };

  handleChange = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };


  deleteContact = id =>
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));

    componentDidMount (){
      const localContacts = localStorage.getItem('contacts');
      const parseContacts = JSON.parse(localContacts)

      if (parseContacts) {
        this.setState({contacts : parseContacts})
      }
    }

    componentDidUpdate (prevProps, prevState) {
      if (this.state.contacts !== prevState.contacts){
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
      }
    }

  render(){
    return (
      <div className="div">
        <ContactForm onSubmit={this.addContact}/>
        <h2 className="contactsTitle">Contacts</h2>
        <ContactList contacts={this.getSearchingContacts()} deleteContact={this.deleteContact}/>
        <Filter filter={this.state.filter} handleChange={this.handleChange}/>
      </div>
    );
  }
};
