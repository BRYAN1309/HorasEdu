from flask import request
from model.material_model import MaterialModel
from view.response_view import success_response, error_response

def create_material():
    try:
        data = request.json

        # Validasi enum type
        if data["type"] not in ["article", "video", "image"]:
            return error_response("Invalid material type")

        res = MaterialModel.create_material(data)
        return success_response("Material created", res.data)
    except Exception as e:
        return error_response(str(e))

def get_materials():
    try:
        material_id = request.args.get("material_id", type=int)
        res = MaterialModel.get_all_materials(material_id)
        return success_response("Material list : ", res.data)
    except Exception as e:
        return error_response(str(e))

def get_materials_by_module(module_id):
    try:
        res = MaterialModel.get_materials_by_module(module_id)
        return success_response(f"Materials for module {module_id}", res.data)
    except Exception as e:
        return error_response(str(e))
