from flask import Flask
from flask_cors import CORS
from config import Config
from utils.auth import mongo
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config["UPLOAD_FOLDER"] = os.path.join(os.path.dirname(__file__), "uploads")
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
    CORS(app)

    # Initialize MongoDB client
    mongo.init_app(app)

    # Import and register all blueprints
    from routes.auth_routes import auth_bp
    from routes.incident_routes import incident_bp
    from routes.worker_routes import worker_bp
    from routes.equipment_routes import equipment_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(incident_bp, url_prefix="/incidents")
    app.register_blueprint(worker_bp, url_prefix="/workers")
    app.register_blueprint(equipment_bp, url_prefix="/equipment")

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
