// firestore.js
import admin from 'firebase-admin';
import serviceAccount from './privkey.json';  // Your service account JSON

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();
export default db;
