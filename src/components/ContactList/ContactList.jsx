import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={s.contList}>
      {contacts.map((cont) => (
        <li className={s.contItem} key={cont.id}>
          <p className={s.contText}>
            {cont.name}: {cont.number}
          </p>
          <button
            type="button"
            className={s.contBtn}
            onClick={() => deleteContact(cont.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;