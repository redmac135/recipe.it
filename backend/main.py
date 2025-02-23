from fastapi import FastAPI

app = FastAPI()

from routes import Routes

Routes(app)
