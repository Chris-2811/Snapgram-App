import { faker } from "@faker-js/faker";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

/* CREATE RANDOM USER */

export async function createRandomUser() {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const name = firstName + " " + lastName;
  const randomNum = Math.floor(Math.random() * 100); // Generate a random number between 0 and 999

  const email =
    `${firstName}.${lastName}${randomNum}@example.com`.toLowerCase();

  // Generate a random username
  const nameOptions = [firstName, lastName, `${firstName}.${lastName}`];
  const randomName =
    nameOptions[Math.floor(Math.random() * nameOptions.length)];
  const username = `${randomName}.${randomNum}`.toLowerCase();

  // Generate a random bio
  const jobTitle = faker.person.jobTitle();
  const jobDescriptor = faker.person.jobDescriptor();
  const companyName = faker.company.name();
  const catchPhrase = faker.company.catchPhrase();

  const bio = `I am a ${jobTitle} with a knack for ${jobDescriptor}. Currently working at ${companyName}. I believe that "${catchPhrase}".`;

  // Fetch a random user from the Random User Generator API

  try {
    const response = await axios.get(
      `https://randomuser.me/api/?gender=${sex}`,
    );
    const photoUrl = response.data.results[0].picture.large;

    return {
      bio,
      username: username,
      name,
      email,
      password: faker.internet.password(),
      createdAt: new Date(),
      photoUrl,
    };
  } catch (error) {
    console.error("Error fetching random user:", error);
  }
}

/* CREATE USERS */
export async function createUsers() {
  for (let i = 0; i < 250; i++) {
    const user = await createRandomUser();

    if (user) {
      try {
        await addDoc(collection(db, "users"), user);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  }
}
