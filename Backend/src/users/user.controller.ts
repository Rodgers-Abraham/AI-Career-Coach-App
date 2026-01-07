// user.controller.ts
import { User } from './user.entity';

export class UserController {
  
  // 1. CREATE USER (Sign Up)
  // This listens for a POST request to '/users'
  // It receives the data (username, email, password) inside the 'body'
  create(body: any): User {
    console.log("Received request to create user:", body.username);
    
    // In a real app, we would save this to the database here.
    // For now, we return a "mock" user to confirm it works.
    const newUser = new User();
    newUser.username = body.username;
    newUser.email = body.email;
    return newUser;
  }

  // 2. FIND USER (Profile)
  // This listens for a GET request like '/users/123'
  // The ':id' is a dynamic parameter (it changes for every user)
  findOne(id: string): User {
    console.log("Searching for user with ID:", id);
    
    // logic to find the user in the database would go here
    const foundUser = new User();
    foundUser.id = id;
    foundUser.username = "SampleUser";
    return foundUser;
  }
}