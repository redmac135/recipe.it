import admin from 'firebase-admin';
import serviceAccount from './privkey.json'; 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
export default db;
