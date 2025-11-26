from flask import Blueprint, request, jsonify
from utils.auth import mongo, hash_password, verify_password
from utils.jwt_utils import create_token

auth_bp = Blueprint("auth", __name__)
users_collection = mongo.db.users


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    hashed_pw = hash_password(password)

    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_pw
    })

    return jsonify({"message": "Registration successful!"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "Invalid email"}), 401

    if not verify_password(user["password"], password):
        return jsonify({"error": "Incorrect password"}), 401

    token = create_token(email)

    return jsonify({"message": "Login successful", "token": token})
