from config.supabase_client import supabase

class QuizModel:
    @staticmethod
    def create_quiz(data):
        return supabase.table("quiz").insert(data).execute()
    @staticmethod
    def get_all_quizzes_by_modules(module_id):
        return supabase.table("quiz").select("*").eq("module_id",module_id).execute()
    