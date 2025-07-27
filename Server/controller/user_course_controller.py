from flask import request
from model.user_course_model import UserCourseModel
from model.course_model import CourseModel
from model.user_model import UserModel
from view.response_view import success_response, error_response

def enroll_course():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return error_response("Missing or invalid token")
    
    token = auth_header.split(" ")[1]
    token_data = UserModel.verify_token(token)
    if not token_data:
        return error_response("Invalid or expired token")

    user_id = token_data["user_id"]
    data = request.json
    course_id = data.get("course_id")

    try:
        res = UserCourseModel.enroll_user_in_course(user_id, course_id)
        return success_response("User enrolled in course", res.data)
    except Exception as e:
        return error_response(str(e))

def get_user_courses():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return error_response("Missing or invalid token")
    
    token = auth_header.split(" ")[1]
    token_data = UserModel.verify_token(token)
    if not token_data:
        return error_response("Invalid or expired token")

    user_id = token_data["user_id"]
    try:
        res = UserCourseModel.get_user_courses(user_id)
        course_ids = [entry["course_id"] for entry in res.data]

        # Fetch full course details
        from config.supabase_client import supabase
        course_data = supabase.table("courses").select("*").in_("id", course_ids).execute()

        return success_response("User's enrolled courses", course_data.data)
    except Exception as e:
        return error_response(str(e))
