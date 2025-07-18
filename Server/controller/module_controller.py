from flask import request
from model.module_model import ModuleModel
from view.response_view import success_response, error_response

def create_module():
    try:
        data = request.json
        res = ModuleModel.create_module(data)
        return success_response("Module created", res.data)
    except Exception as e:
        return error_response(str(e))

def get_modules_by_course(course_id):
    try:
        res = ModuleModel.get_modules_by_course(course_id)
        return success_response("Modules retrieved", res.data)
    except Exception as e:
        return error_response(str(e))
