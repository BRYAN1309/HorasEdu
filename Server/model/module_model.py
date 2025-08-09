from config.supabase_client import supabase

class ModuleModel:
    @staticmethod
    def create_module(data):
        return supabase.table("modules").insert(data).execute()

    @staticmethod
    def get_modules_by_course(course_id):
        return (
            supabase.table("modules")
            .select("*")
            .eq("course_id", course_id)
            .order("order", desc=False)  # or asc=False for descending
            .execute()
        )

    @staticmethod
    def get_all_modules():
        return supabase.table("modules").select("*").execute()

    @staticmethod
    def get_module(module_id):
        response = supabase.table("modules") \
            .select("*, quiz!quiz_module_id_fkey(*, questions(*)), materials(*)") \
            .eq("id", module_id) \
            .single() \
            .execute()

        data = response

        # If `quiz` is a list with one item, flatten it
        if data and "quiz" in data and isinstance(data["quiz"], list) and len(data["quiz"]) == 1:
            data["quiz"] = data["quiz"][0]

        return data

    @staticmethod
    def get_modules_materials(module_id):
        return supabase.table("modules") \
            .select("*, materials(*)") \
            .eq("id", module_id) \
            .single() \
            .execute()
            