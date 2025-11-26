from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId
from utils.auth import mongo
from datetime import datetime
from werkzeug.utils import secure_filename
import os

incident_bp = Blueprint("incidents", __name__)
incidents_collection = mongo.db.incidents

# CREATE Incident  (supports JSON & multipart for image)
@incident_bp.route("/", methods=["POST"])
def create_incident():
  if request.content_type and "multipart/form-data" in request.content_type:
      form = request.form
      file = request.files.get("image")

      incident = {
          "description": form.get("description"),
          "severity": form.get("severity", "low"),
          "workerId": form.get("workerId") or None,
          "equipmentId": form.get("equipmentId") or None,
          "createdAt": datetime.utcnow(),
      }

      if file and file.filename:
          filename = secure_filename(file.filename)
          save_path = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
          file.save(save_path)
          incident["imageName"] = filename

  else:
      data = request.json or {}
      incident = {
          "description": data.get("description"),
          "severity": data.get("severity", "low"),
          "workerId": data.get("workerId"),
          "equipmentId": data.get("equipmentId"),
          "createdAt": datetime.utcnow(),
      }

  result = incidents_collection.insert_one(incident)
  return jsonify({"message": "Incident created", "_id": str(result.inserted_id)}), 201


# GET all incidents
@incident_bp.route("/", methods=["GET"])
def get_incidents():
  incidents = list(incidents_collection.find().sort("createdAt", -1))
  for i in incidents:
      i["_id"] = str(i["_id"])
      if "createdAt" in i:
          i["createdAt"] = i["createdAt"].isoformat()
  return jsonify(incidents)


# UPDATE incident
@incident_bp.route("/<id>", methods=["PUT"])
def update_incident(id):
  data = request.json or {}
  result = incidents_collection.update_one(
      {"_id": ObjectId(id)},
      {"$set": data}
  )
  if result.matched_count == 0:
      return jsonify({"error": "Incident not found"}), 404
  return jsonify({"message": "Incident updated"})


# DELETE incident
@incident_bp.route("/<id>", methods=["DELETE"])
def delete_incident(id):
  result = incidents_collection.delete_one({"_id": ObjectId(id)})
  if result.deleted_count == 0:
      return jsonify({"error": "Incident not found"}), 404
  return jsonify({"message": "Incident deleted"})
