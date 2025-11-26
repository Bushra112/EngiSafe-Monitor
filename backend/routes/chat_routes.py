from flask import Blueprint, request, jsonify
import google.generativeai as genai
import os

chat_bp = Blueprint("chat_bp", __name__)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

@chat_bp.route("/ask", methods=["POST"])
def ask_ai():
    data = request.get_json()
    question = data.get("question", "")

    if not question.strip():
        return jsonify({"answer": "Please ask a valid question."}), 400

    try:
        response = model.generate_content(question)
        return jsonify({"answer": response.text})
    except Exception as e:
        return jsonify({"answer": "AI service unavailable. Try again later."}), 500
