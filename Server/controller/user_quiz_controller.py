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

        # Get user's answers for this quiz
        answers_res = UserQuizModel.get_user_answers(user_id, quiz_id)
        answers = answers_res.data
        if not answers:
            return error_response("No answers submitted for this quiz")

        total_questions = len(answers)
        total_correct = sum(1 for a in answers if a["is_correct"])
        score = round((total_correct / total_questions) * 100, 2)

        # Save final result
        UserQuizModel.save_user_quiz_result({
            "user_id": user_id,
            "quiz_id": quiz_id,
            "score": score,
            "total_correct": total_correct,
            "total_questions": total_questions,
            "submitted_at": datetime.utcnow().isoformat()
        })

        return success_response("Quiz submitted successfully", {
            "score": score,
            "total_correct": total_correct,
            "total_questions": total_questions
        })

    except Exception as e:
        return error_response(str(e))
