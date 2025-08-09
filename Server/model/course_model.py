from config.supabase_client import supabase

class CourseModel:
    @staticmethod
    def create_course(data):
        return supabase.table("courses").insert(data).execute()

    @staticmethod
    def update_course(data, course_id):
        if not course_id:
            raise ValueError("Course ID is required to update a course")

        # Remove the ID from the update fields if you don't want to overwrite it
        update_data = {k: v for k, v in data.items() if k != "id"}

        return (
            supabase.table("courses")
            .update(update_data)  # dynamically update fields
            .eq("id", course_id)  # match by ID
            .execute()
        )

    @staticmethod
    def get_all_courses():
        return supabase.table("courses").select("*").order("created_at", desc=True).execute()
    
    @staticmethod
    def get_course_by_id(course_id):
        return supabase.table("courses").select("*").eq("id", course_id).single().execute()

    @staticmethod
    def get_course_modules_materials_quizzes(course_id):
        return supabase.table("courses") \
            .select("*, modules(*, materials(*), quiz(*))") \
            .eq("id", course_id) \
            .single() \
            .execute()
            
    @staticmethod
    def get_all_course_modules_materials():
        return supabase.table("courses") \
            .select("*, modules(*, materials(*))") \
            .execute()
            
    
