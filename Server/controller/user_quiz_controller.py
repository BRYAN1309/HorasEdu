from flask import request
from model.user_model import UserModel
from model.question_model import QuestionModel
from model.user_quiz_model import UserQuizModel
from view.response_view import success_response, error_response
from datetime import datetime

def submit_answer():
    try:
        # Auth
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return error_response("Missing or invalid token")
        token = auth_header.split(" ")[1]
        token_data = UserModel.verify_token(token)
        if not token_data:
            return error_response("Invalid or expired token")
        user_id = token_data["user_id"]

        # Parse JSON
        data = request.json
        quiz_id = data.get("quiz_id")
        question_id = data.get("question_id")
        selected_answer = data.get("selected_answer")

        if not quiz_id or not question_id or not selected_answer:
            return error_response("quiz_id, question_id, and selected_answer are required")

        # Get correct answer
        question_res = QuestionModel.get_question_by_id(question_id)
        if not question_res.data:
            return error_response("Question not found")

        correct_answer = question_res.data["correct_answer"]
        is_correct = selected_answer.upper() == correct_answer.upper()

        # Save answer
        UserQuizModel.save_user_answer({
            "user_id": user_id,
            "quiz_id": quiz_id,
            "question_id": question_id,
            "selected_answer": selected_answer.upper(),
            "is_correct": is_correct,
            "answered_at": datetime.utcnow().isoformat()
        })

        return success_response("Answer submitted", {
            "is_correct": is_correct,
            "correct_answer": correct_answer.upper()
        })

    except Exception as e:
        return error_response(str(e))

def submit_quiz(quiz_id):
    try:
        # Auth
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return error_response("Missing or invalid token")

        token = auth_header.split(" ")[1]
        token_data = UserModel.verify_token(token)
        if not token_data:
            return error_response("Invalid or expired token")

        user_id = token_data["user_id"]

        data = request.get_json()
        score = data.get("score")

        result = UserQuizModel.update_user_quiz(user_id, quiz_id, score)

        return {
            "message": "Quiz submitted successfully.",
            "score": score,
            "result": result.data 
        }

    except Exception as e:
        return error_response(str(e))
    
def get_user_quiz(quiz_id):
    try:
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return error_response("Missing or invalid token")
        token = auth_header.split(" ")[1]
        token_data = UserModel.verify_token(token)
        if not token_data:
            return error_response("Invalid or expired token")
        user_id = token_data["user_id"]
        
        res = UserQuizModel.get_user_quiz(user_id, quiz_id)

        if (not res.data):
            res.data = None
            
        return success_response("Get user's quiz success", res.data)
    except Exception as e:
        return error_response(str(e))