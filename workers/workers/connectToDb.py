import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


cred = credentials.Certificate("privkey.json")
firebase_admin.initialize_app(cred)

deb = firestore.client()