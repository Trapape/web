import { getDatabase, ref, set, push, update, remove, onValue, orderByChild, equalTo, query } from "firebase/database";

const db = getDatabase();

// Función para leer datos de un nodo
export const readData = (path) => {
  const dataRef = ref(db, path);
  return new Promise((resolve, reject) => {
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
};

// Función para leer datos de un nodo por field
export const readDataField = (path, field, value) => {
    const dataRef = query(ref(db, path), orderByChild(field), equalTo(value));
    return new Promise((resolve, reject) => {
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  };

// Función para escribir datos en un nodo
export const writeData = (path, data) => {
  const dataRef = ref(db, path);

  return new Promise((resolve, reject) => {
    set(dataRef, data)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Función para agregar datos a un nodo utilizando una clave generada automáticamente
export const addData = (path, data) => {
  const dataRef = ref(db, path);

  return new Promise((resolve, reject) => {
    const newDataRef = push(dataRef);
    set(newDataRef, data)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Función para actualizar datos en un nodo
export const updateData = (path, data) => {
  const dataRef = ref(db, path);

  return new Promise((resolve, reject) => {
    update(dataRef, data)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Función para eliminar un nodo
export const deleteData = (path) => {
  const dataRef = ref(db, path);

  return new Promise((resolve, reject) => {
    remove(dataRef)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Función que lee un dato desde su ID y mantiene en tiempo real los cambios
export function listenToItem(path, itemId, callback) {
  const itemRef = ref(db, `${path}/${itemId}`);
  onValue(itemRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

// Función que lee una lista y mantiene en tiempo real los cambios
export function listenToList(path, callback) {
  const listRef = ref(db, path);
  onValue(listRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

// Función que lee una lista con filtador por field y mantiene en tiempo real los cambios
export function filterItemsByField(path, field, value, callback) {
  const listRef = ref(db, path);
  onValue(listRef, (snapshot) => {
    const data = snapshot.val();
    const filteredItems = Object.values(data).filter(item => item[field] === value);
    callback(filteredItems);
  });
}
