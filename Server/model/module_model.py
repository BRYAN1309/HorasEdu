from config.supabase_client import supabase

class ModuleModel:
    @staticmethod
    def create_module(data):
        return supabase.table("modules").insert(data).execute()

    @staticmethod
    def get_modules_by_course(course_id):
        return supabase.table("modules").select("*").eq("course_id", course_id).execute()
