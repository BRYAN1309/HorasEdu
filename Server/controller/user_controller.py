from flask import request
from model.user_model import UserModel
from view.response_view import success_response, error_response

def register():
    data = request.json
    try:
        res = UserModel.register_user(
            data["email"],
            data["password"],
            data["name"]
        )
        return success_response("User registered", res)
    except Exception as e:
        return error_response(str(e))


def login():
    data = request.json
    try:
        res = UserModel.login_user(data["email"], data["password"])
        return success_response("Login successful", res)
    except Exception as e:
        return error_response(str(e))
