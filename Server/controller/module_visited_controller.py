from flask import request
from view.response_view import success_response, error_response
from model.user_model import UserModel
from model.module_visited_model import ModuleVisitedModel

def create_module_visited():
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
    module_ids = data.get("module_ids")
    if not module_ids:
        return error_response("module_id is required")


    # Inject user_id
    payload = {
        "user_id": user_id,
        "modules_id": module_ids
    }

    try:
        res = ModuleVisitedModel.create_module_visited(payload)
        return success_response("module visited recorded", res.data)
    except Exception as e:
        return error_response(str(e))
    
def get_modules_visited():
    try:
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return error_response("Missing or invalid token")
        
        token = auth_header.split(" ")[1]
        token_data = UserModel.verify_token(token)
        if not token_data:
            return error_response("Invalid or expired token")
        
        user_id = token_data["user_id"]
        
        module_ids = request.args.getlist('module_ids', type=int)
        res = ModuleVisitedModel.get_all_module_visited(modules_id=module_ids, user_id=user_id)
        return success_response("Module Visited", res.data)
    except Exception as e:
        return error_response(str(e))

