from config.supabase_client import supabase

class QuizVisitedModel:
    @staticmethod
    def create_quiz_visited(data):
        return supabase.table("quiz_visited").insert(data).execute()
    