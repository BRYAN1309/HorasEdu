from config.supabase_client import supabase
from typing import List

class QuizVisitedModel:
    @staticmethod
    def create_quiz_visited(data):
        return supabase.table("quiz_visited").insert(data).execute()

    @staticmethod
    def get_all_quiz_visited(module_ids: List[int]):
        return supabase.table("quiz_visited") \
            .select("*") \
            .in_("module_id", module_ids) \
            .execute()
    