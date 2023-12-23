import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactRemoved, selectAllContacts } from '../../store/contactsSlice';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

import './ContactsList.scss';

interface Contact {
    id: string;
    username: string;
    name: string;
    phone: string;
}

function ContactsList() {
    const dispatch = useDispatch();
    const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const contacts = useSelector(selectAllContacts) as Contact[];

    const handleDeleteClick = (contactId: string) => {
      setSelectedContactId(contactId);
      setIsModalOpen(true);
    };
    
    const handleConfirmDelete = () => {
      if (selectedContactId) {
        dispatch(contactRemoved(selectedContactId));
        setIsModalOpen(false);
      }
    };
    
    if (!contacts || contacts.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
          <h1>Contacts List</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Phone</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
            {contacts.map((contact: Contact) => (
                <tr key={contact.id}>
                  <td>{contact.username}</td>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <button onClick={() => handleDeleteClick(contact.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {selectedContactId !== null && (
              <DeleteConfirmationModal
              isOpen={isModalOpen}
                onCancel={() => setSelectedContactId(null)}
                onConfirm={handleConfirmDelete}
              >
                Are you sure you want to delete this contact?
              </DeleteConfirmationModal>
            )}
          </div>
        </div>
      );
    }
    
export default ContactsList;