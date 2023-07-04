import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Create a reference to the file we want to download
const storage = getStorage();

export const downloadStorage = (path) => {
  const starsRef = ref(storage, path);
  
  return new Promise((resolve, reject) => {
    // Get the download URL
    getDownloadURL(starsRef)
      .then((url) => {
        resolve(url); // Resuelve la promesa con la URL
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            console.log("File doesn't exist");
            break;
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.log("User canceled the upload");
            break;
          case "storage/unknown":
            console.log("Unknown error occurred, inspect the server response");
            break;
          default:
            console.log(error);
        }
        
        reject(error); // Rechaza la promesa con el error
      });
  });
};

export const uploadStorage = (path) => {
  
}