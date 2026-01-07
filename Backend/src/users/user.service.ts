// user.service.ts
import { User } from './user.entity';

export class UserService {
  // This mimics our database for now (an empty list of users)
  private users: User[] = [];

  // 1. THE LOGIC TO CREATE A USER
  async create(username: string, email: string): Promise<User> {
    // Check: Does this user already exist?
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists!');
    }

    // Create the new user object
    const newUser = new User();
    newUser.id = "user-" + (this.users.length + 1); // Mock ID generation
    newUser.username = username;
    newUser.email = email;
    newUser.isPremium = false; // Default to free tier
    
    // In real life, we would hash the password here before saving
       // Save to our "database"
    this.users.push(newUser);
    
    console.log("Service: User created successfully!");
    return newUser;
  }

  // 2. THE LOGIC TO FIND A USER
  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}