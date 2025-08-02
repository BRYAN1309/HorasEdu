from config.supabase_client import supabase

class UserCourseModel:
    @staticmethod
    def enroll_user_in_course(user_id, course_id):
        return supabase.table("user_courses").insert({
            "user_id": user_id,
            "course_id": course_id
        }).execute()

    @staticmethod
    def get_user_courses(user_id):
        return supabase.table("user_courses").select("course_id").eq("user_id", user_id).execute()
