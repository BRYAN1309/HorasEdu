from config.supabase_client import supabase

class ModuleModel:
    @staticmethod
    def create_module(data):
        return supabase.table("modules").insert(data).execute()

    @staticmethod
    def get_modules_by_course(course_id):
        return supabase.table("modules").select("*").eq("course_id", course_id).execute()

    @staticmethod
    def get_module(module_id):
        return supabase.table("modules") \
            .select("*, quiz(*, questions(*)), materials(*)") \
            .eq("id", module_id) \
            .single() \
            .execute()

    @staticmethod
    def get_modules_materials(module_id):
        return supabase.table("modules") \
            .select("*, materials(*)") \
            .eq("id", module_id) \
            .single() \
            .execute()
            