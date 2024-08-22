import { faker } from "@faker-js/faker";
import axios from "axios";
import { addDoc, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

/* ---------------------------- */
/* CREATE RANDOM USER */
/* ---------------------------- */

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
        const docRef = doc(collection(db, "users"));
        const userId = docRef.id;

        const userWithId = { ...user, userId };

        await setDoc(docRef, userWithId);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  }
}

/* ------------------------ */
/* CREATE DUMMY POSTS */
/* ------------------------ */

/* Get Post Images */

const allPhotos: any[] = [];
const categories = [
  "nature",
  "animals",
  "architecture",
  "people",
  "travel",
  "technology",
  "sports",
  "food",
  "fashion",
  "music",
  "movies",
  "art",
  "business",
  "education",
  "health",
  "transportation",
  "space",
  "ocean",
  "mountains",
];

export async function fetchDummyPostPhotos() {
  try {
    for (const category of categories) {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${category}&per_page=10`,
        {
          headers: {
            Authorization:
              "Client-ID kN5ce6cJD-IDwzHDF7tDACXvJ8BQ5XA-HFaYD1WdfU4",
          },
        },
      );
      // The response data is an object that includes a results array of photos
      const photos = response.data.results;
      allPhotos.push(...photos);
    }

    shuffleArray(allPhotos);
    console.log("allPhotos: ", allPhotos);
    return allPhotos;
  } catch (error) {
    console.error("Error: ", error);
  }
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* Create Dummy Posts */

export async function createPosts() {
  await fetchDummyPostPhotos();
  const posts = [];
  const usersSnapshot = await getDocs(collection(db, "users"));
  const users = usersSnapshot.docs.map((doc) => ({
    ...doc.data(),
    userId: doc.id,
  }));

  for (let i = 0; i < 50; i++) {
    const userId = users[Math.floor(Math.random() * users.length)].userId;

    console.log(userId);

    const numPhotos =
      Math.random() < 0.7 ? 1 : Math.floor(Math.random() * 2) + 2;
    const randomIndex = Math.floor(Math.random() * allPhotos.length);
    const selectedPhotos = allPhotos?.splice(randomIndex, numPhotos);

    console.log(selectedPhotos);

    if (selectedPhotos.length === 0) {
      continue;
    }

    const post = {
      caption:
        selectedPhotos.length === 1
          ? selectedPhotos[0].alt_description
          : faker.lorem.sentence(),
      createdAt: new Date(),
      userId: userId,
      location: faker.location.city(),
      photoUrls: selectedPhotos.map((photo) => photo.urls.full),
      tags: selectedPhotos.flatMap((photo) =>
        photo.tags.map((tag: any) => tag.title),
      ),
    };

    posts.push(post);

    try {
      const docRef = doc(collection(db, "posts"));
      const postId = docRef.id;

      const postWithId = { ...post, postId };

      await setDoc(docRef, postWithId);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  }
  console.log(posts);
}
