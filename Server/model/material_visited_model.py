from config.supabase_client import supabase
from typing import List

class MaterialVisitedModel:
    @staticmethod
    def create_material_visited(data):
        return supabase.table("material_visited").insert(data).execute()

    @staticmethod
    def get_all_materials_visited(material_ids: List[int]):
        return supabase.table("material_visited") \
            .select("*") \
            .in_("materials_id", material_ids) \
            .execute()