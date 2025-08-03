from config.supabase_client import supabase

class MaterialModel:
    @staticmethod
    def create_material(data):
        return supabase.table("materials").insert(data).execute()

    @staticmethod
    def get_all_materials(material_id):
        query = supabase.table("materials").select("*")
        
        if (material_id):
            query = query.eq("id", material_id).single()

        return query.execute()

    @staticmethod
    def get_materials_by_module(module_id):
        return (
            supabase
            .table("materials")
            .select("*")
            .eq("module_id", module_id)
            .order("order", desc=False)  # ascending order
            .execute()
        )