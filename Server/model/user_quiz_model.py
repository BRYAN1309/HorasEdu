from config.supabase_client import supabase


class UserQuizModel:
    @staticmethod
    def save_user_answer(data):
        return supabase.table("user_answers").insert(data).execute()

    @staticmethod
    def get_user_answers(user_id, quiz_id):
        return supabase.table("user_answers").select("*").eq("user_id", user_id).eq("quiz_id", quiz_id).execute()

    @staticmethod
    def save_user_quiz_result(data):
        return supabase.table("user_quizzes").insert(data).execute()
    
    @staticmethod
    def get_user_quiz(user_id, quiz_id):
        return supabase.table("user_quizzes").select("*").eq("user_id", user_id).eq("quiz_id", quiz_id).execute()


        