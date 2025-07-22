from flask import request
from model.quiz_model import QuizModel
from view.response_view import success_response, error_response

def create_quiz():
    try:
        data = request.json
        res = QuizModel.create_quiz(data)
        return success_response("Quiz created", res.data)
    except Exception as e:
        return error_response(str(e))
    
def get_quizzes_by_module(module_id):
    try:
        res = QuizModel.get_all_quizzes_by_modules(module_id)
        return success_response(f"Quizzes for module {module_id}", res.data)
    except Exception as e:
        return error_response(str(e))
    