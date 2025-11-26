from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash

mongo = PyMongo()

def hash_password(password):
    return generate_password_hash(password)

def verify_password(hashed_pw, password):
    return check_password_hash(hashed_pw, password)
