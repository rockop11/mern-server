const { initializeApp } = require("firebase/app")
const { getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    deleteObject,
} = require("firebase/storage")

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);


const uploadUserImage = async (id, name, image) => {
    const storageRef = ref(storage, `Users/${id}/${name}`)

    const metadata = {
        contentType: 'image/jpeg',
    };

    uploadBytes(storageRef, image, metadata)
        .catch((err) => {
            console.log("error de subida", err);
        })
}

const getUserImage = async (id, name) => {
    try {
        const urlImage = await getDownloadURL(ref(storage, `Users/${id}/${name}`))
        return urlImage
    } catch (err) {
        console.log('no pude traer la img', err);
    }
}

const uploadProductImages = async (id, images) => {
    const metadata = {
        contentType: 'image/jpeg',
    };

    for (let i = 0; i < images.length; i++) {
        const storageRef = ref(storage, `Products/${id}/${images[i].originalname}`)

        await uploadBytes(storageRef, images[i].buffer, metadata)
            .catch((err) => {
                console.log("no se pudieron subir las imagenes", err);
            })
    }
}

const getProductsImages = async (id) => {
    try {
        const storageRef = ref(storage, `Products/${id}`)
        const imagesUrls = []
        const { items } = await listAll(storageRef)

        for (const item of items) {
            const url = await getDownloadURL(item)

            imagesUrls.push(url)
        }

        return imagesUrls
    } catch (err) {
        console.log("No pude traer las Imagenes", err);
    }
}

const deleteProductImages = async (id, imageName) => {
    const storageRef = ref(storage, `Products/${id}/${imageName}`)

    await deleteObject(storageRef)
        .catch((err) => {
            console.log("no se pudo eliminar las imagenes", err);
        })
}

module.exports = {
    firebase,
    storage,
    getUserImage,
    uploadUserImage,
    uploadProductImages,
    getProductsImages,
    deleteProductImages
}