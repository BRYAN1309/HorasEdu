from config.supabase_client import supabase
from typing import List

class ModuleVisitedModel:
    @staticmethod
    def create_module_visited(data):
        return supabase.table("module_visited").insert(data).execute()

    @staticmethod
    def get_all_module_visited(modules_id: List[int], user_id: int):
        return supabase.table("material_visited") \
            .select("*") \
            .in_("materials_id", modules_id) \
            .eq("user_id", user_id) \
            .execute()
            
