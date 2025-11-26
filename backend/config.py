import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("JWT_SECRET")
    MONGO_URI = os.getenv("MONGO_URI")
