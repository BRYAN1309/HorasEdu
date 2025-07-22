from flask import request, jsonify
from model.question_model import QuestionModel
from view.response_view import success_response, error_response

def create_question():
    try:
        data = request.json
        res = QuestionModel.create_question(data)
        return success_response("Question created", res.data)
    except Exception as e:
        return error_response(str(e))

def get_all_questions_by_quiz(quiz_id):
    try:
        res = QuestionModel.get_questions_by_quiz(quiz_id)
        return success_response(f"Questions for quiz {quiz_id}", res.data)
    except Exception as e:
        return error_response(str(e))

def get_question_by_id(question_id):
    try:
        res = QuestionModel.get_question_by_id(question_id)
        return success_response("Question found", res.data)
    except Exception as e:
        return error_response(str(e))