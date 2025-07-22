from flask import request
from model.user_model import UserModel
from view.response_view import success_response, error_response

def register():
    data = request.json
    try:
        result = UserModel.register_user(
            data.get('email'),
            data.get('password'),
            data.get('name')
        )
        if not result:
            return error_response("Registration failed")
        return success_response("User registered", {
            "user": {
                "id": result["user"]["id"],
                "email": result["user"]["email"],
                "name": result["user"]["name"]
            },
            "token": result["token"]
        })
    except Exception as e:
        return error_response(str(e))

def login():
    data = request.json
    try:
        # Validate input
        if not data or not data.get('email') or not data.get('password'):
            return error_response("Email and password are required")
        
        # Attempt login
        result = UserModel.login_user(data["email"], data["password"])
        
        if not result:
            return error_response("Invalid credentials")
        
        # Return success response with user data and token
        return success_response("Login successful", {
            "user": result["user"],
            "token": result["token"]
        })
    except Exception as e:
        return error_response(str(e))

def protected():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return error_response("Missing or invalid token")
    
    token = auth_header.split(" ")[1]
    token_data = UserModel.verify_token(token)
    
    if not token_data:
        return error_response("Invalid or expired token")
    
    return success_response("Protected route accessed", {
        "user_id": token_data['user_id']
    })