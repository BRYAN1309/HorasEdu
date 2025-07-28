from flask import request
from model.quiz_visited_model import QuizVisitedModel
from view.response_view import success_response, error_response
from model.user_model import UserModel

def create_quiz_visited():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return error_response("Missing or invalid token")
    
    token = auth_header.split(" ")[1]
    token_data = UserModel.verify_token(token)
    if not token_data:
        return error_response("Invalid or expired token")
    
    user_id = token_data["user_id"]
    data = request.json

    # Validation
    module_id = data.get("module_id")
    if not module_id:
        return error_response("module_id is required")


    # Inject user_id
    payload = {
        "user_id": user_id,
        "module_id": module_id
    }

    try:
        res = QuizVisitedModel.create_quiz_visited(payload)
        return success_response("Quiz visited recorded", res.data)
    except Exception as e:
        return error_response(str(e))
