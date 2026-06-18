import bcrypt from 'bcryptjs';

const password = bcrypt.hashSync('password123', 10);

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: password,
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: password,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: password,
  },
];

export default users;
