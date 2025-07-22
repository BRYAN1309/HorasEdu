from config.supabase_client import supabase

class QuestionModel:
    @staticmethod
    def create_question(data):
        return supabase.table("questions").insert(data).execute()
    @staticmethod
    def get_questions_by_quiz(quiz_id):
        return supabase.table("questions").select("*").eq("quiz_id", quiz_id).execute()
    @staticmethod
    def get_question_by_id(question_id):
        return supabase.table("questions").select("*").eq("id",question_id).single().execute()
