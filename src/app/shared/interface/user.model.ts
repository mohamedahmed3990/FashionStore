export interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    profileImage?: string;
  
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface RegisterResponse {
    message: string;
    user: Omit<User, 'password'>;
  }