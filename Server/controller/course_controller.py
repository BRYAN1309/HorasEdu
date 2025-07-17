from flask import request
from model.course_model import CourseModel
from view.response_view import success_response, error_response

def create_course():
    try:
        data = request.json

        # Ensure ENUMs are valid
        if data["status"] not in ["aktif", "selesai"]:
            return error_response("Invalid status")

        if data["kesulitan"] not in ["pemula", "menengah", "lanjutan"]:
            return error_response("Invalid kesulitan")

        res = CourseModel.create_course(data)
        return success_response("Course created", res.data)
    except Exception as e:
        return error_response(str(e))


def get_courses():
    try:
        res = CourseModel.get_all_courses()
        return success_response("Course list", res.data)
    except Exception as e:
        return error_response(str(e))
    
def get_course_by_id(course_id):
    try:
        res = CourseModel.get_course_by_id(course_id)
        if res.data:
            return success_response("Course found", res.data)
        else:
            return error_response(f"Course with ID {course_id} not found")
    except Exception as e:
        return error_response(str(e))