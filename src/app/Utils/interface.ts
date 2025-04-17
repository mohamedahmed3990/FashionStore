// Define TypeScript interfaces for better type safety
// interface Product {
//     _id: number;
//     title: string;
//     oldprice: number;
//     currentprice: number;
//     description: string;
//     quantity: number;
//     image: string;
//     categoryId: string;
//     rating: {
//       rate: number;
//       count: number;
//     };
//     createdAt: string;
//     updatedAt: string;
//   }
  
  interface ProductApiResponse {
    // products: Product[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
  }
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

export type {  ProductApiResponse }
