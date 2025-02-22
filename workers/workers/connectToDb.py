from firebase_admin import credentials, firestore, initialize_app

cred = credentials.Certificate("privkey.json")
initialize_app(cred)

db = firestore.client()

