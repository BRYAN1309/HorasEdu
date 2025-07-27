from config.supabase_client import supabase

class CourseModel:
    @staticmethod
    def create_course(data):
        return supabase.table("courses").insert(data).execute()

    @staticmethod
    def get_all_courses():
<<<<<<< HEAD
        return supabase.table("courses").select("*").order("created_at", desc=True).execute()
=======
        # return supabase.table("courses").select("*").order("inserted_at", desc=True).execute()
        return supabase.table("courses").select("*").execute()
>>>>>>> b0953b6b30b4ba2f2b6da2dc93ec6350bb257860
    
    @staticmethod
    def get_course_by_id(course_id):
        return supabase.table("courses").select("*").eq("id", course_id).single().execute()

    @staticmethod
    def get_course_modules_materials(course_id):
        return supabase.table("courses") \
            .select("*, modules(*, materials(*))") \
            .eq("id", course_id) \
            .single() \
            .execute()
