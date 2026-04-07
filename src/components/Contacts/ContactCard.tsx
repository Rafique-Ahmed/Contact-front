import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiMail, FiPhone } from 'react-icons/fi';

interface Contact {
  id: number;
  user_id: number;
  name: string;
  email: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{contact.name}</h3>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(contact)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiEdit2 className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(contact.id)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <FiTrash2 className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {contact.email && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center mb-2 text-gray-600"
        >
          <FiMail className="h-4 w-4 mr-2" />
          <span className="text-sm break-all">{contact.email}</span>
        </motion.div>
      )}

      {contact.phone && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center text-gray-600"
        >
          <FiPhone className="h-4 w-4 mr-2" />
          <span className="text-sm">{contact.phone}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactCard;
