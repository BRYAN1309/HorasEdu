from config.supabase_client import supabase

class MaterialModel:
    @staticmethod
    def create_material(data):
        return supabase.table("materials").insert(data).execute()

    @staticmethod
    def get_materials_by_module(module_id):
        return supabase.table("materials").select("*").eq("module_id", module_id).execute()
