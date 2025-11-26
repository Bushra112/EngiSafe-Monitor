from flask import Blueprint, request, jsonify
from bson import ObjectId
from utils.auth import mongo

equipment_bp = Blueprint("equipment", __name__)
equipment_collection = mongo.db.equipment

# CREATE equipment
@equipment_bp.route("/", methods=["POST"])
def create_equipment():
    data = request.json
    equipment_collection.insert_one(data)
    return jsonify({"message": "Equipment created"}), 201

# GET all equipment
@equipment_bp.route("/", methods=["GET"])
def get_all_equipment():
    equipment = list(equipment_collection.find())
    for e in equipment:
        e["_id"] = str(e["_id"])
    return jsonify(equipment)

# GET equipment by ID
@equipment_bp.route("/<id>", methods=["GET"])
def get_equipment(id):
    item = equipment_collection.find_one({"_id": ObjectId(id)})
    if not item:
        return jsonify({"error": "Equipment not found"}), 404

    item["_id"] = str(item["_id"])
    return jsonify(item)

# UPDATE equipment
@equipment_bp.route("/<id>", methods=["PUT"])
def update_equipment(id):
    data = request.json
    result = equipment_collection.update_one({"_id": ObjectId(id)}, {"$set": data})

    if result.matched_count == 0:
        return jsonify({"error": "Equipment not found"}), 404

    return jsonify({"message": "Equipment updated"})

# DELETE equipment
@equipment_bp.route("/<id>", methods=["DELETE"])
def delete_equipment(id):
    result = equipment_collection.delete_one({"_id": ObjectId(id)})

    if result.deleted_count == 0:
        return jsonify({"error": "Equipment not found"}), 404

    return jsonify({"message": "Equipment deleted"})
