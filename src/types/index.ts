export interface IUser {
  id: string;
  email: string;
  bio: string;
  photoUrl: string;
  username: string;
  name: string;
  createdAt: string;
}

export interface INewUser {
  email: string;
  password: string;
}

export interface IErrors {
  email: string;
  password: string;
  name: string;
}

export interface ILoginErrors {
  email: string;
  password: string;
}
