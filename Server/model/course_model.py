from config.supabase_client import supabase

class CourseModel:
    @staticmethod
    def create_course(data):
        return supabase.table("courses").insert(data).execute()

    @staticmethod
    def get_all_courses():
        return supabase.table("courses").select("*").order("inserted_at", desc=True).execute()
    
    def get_course_by_id(course_id):
        return supabase.table("courses").select("*").eq("id", course_id).single().execute()
