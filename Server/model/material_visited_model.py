from config.supabase_client import supabase

class MaterialVisitedModel:
    @staticmethod
    def create_material_visited(data):
        return supabase.table("material_visited").insert(data).execute()

