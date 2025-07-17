from flask import request
from model.material_model import MaterialModel
from view.response_view import success_response, error_response

def create_material():
    try:
        data = request.json
        res = MaterialModel.create_material(data)
        return success_response("Material created", res.data)
    except Exception as e:
        return error_response(str(e))

def get_materials_by_module(module_id):
    try:
        res = MaterialModel.get_materials_by_module(module_id)
        return success_response("Materials retrieved", res.data)
    except Exception as e:
        return error_response(str(e))
