from flask import Blueprint, request, jsonify
from bson import ObjectId
from utils.auth import mongo

worker_bp = Blueprint("workers", __name__)
workers_collection = mongo.db.workers

# CREATE worker
@worker_bp.route("/", methods=["POST"])
def create_worker():
    data = request.json
    workers_collection.insert_one(data)
    return jsonify({"message": "Worker created"}), 201

# GET all workers
@worker_bp.route("/", methods=["GET"])
def get_workers():
    workers = list(workers_collection.find())
    for w in workers:
        w["_id"] = str(w["_id"])
    return jsonify(workers)

# GET worker by ID
@worker_bp.route("/<id>", methods=["GET"])
def get_worker(id):
    worker = workers_collection.find_one({"_id": ObjectId(id)})
    if not worker:
        return jsonify({"error": "Worker not found"}), 404

    worker["_id"] = str(worker["_id"])
    return jsonify(worker)

# UPDATE worker
@worker_bp.route("/<id>", methods=["PUT"])
def update_worker(id):
    data = request.json
    result = workers_collection.update_one({"_id": ObjectId(id)}, {"$set": data})

    if result.matched_count == 0:
        return jsonify({"error": "Worker not found"}), 404

    return jsonify({"message": "Worker updated"})

# DELETE worker
@worker_bp.route("/<id>", methods=["DELETE"])
def delete_worker(id):
    result = workers_collection.delete_one({"_id": ObjectId(id)})

    if result.deleted_count == 0:
        return jsonify({"error": "Worker not found"}), 404

    return jsonify({"message": "Worker deleted"})
