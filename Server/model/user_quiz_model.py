from config.supabase_client import supabase
from datetime import datetime


class UserQuizModel:
    @staticmethod
    def save_user_answer(data):
        return supabase.table("user_quizzes").insert(data).execute()

    @staticmethod
    def get_user_answers(user_id, quiz_id):
        return supabase.table("user_answers").select("*").eq("user_id", user_id).eq("quiz_id", quiz_id).execute()

    @staticmethod
    def save_user_quiz_result(data):
        return supabase.table("user_quizzes").insert(data).execute()
    
    @staticmethod
    def get_user_quiz(user_id, quiz_id):
        return supabase.table("user_quizzes").select("*").eq("user_id", user_id).eq("quiz_id", quiz_id).execute()

    @staticmethod
    def update_user_quiz(user_id, quiz_id, score):
        # First, check if the record exists
        existing = supabase.table("user_quizzes") \
            .select("*") \
            .eq("user_id", user_id) \
            .eq("quiz_id", quiz_id) \
            .limit(1) \
            .execute()

        if existing.data:
            # Update the record
            return supabase.table("user_quizzes") \
                .update({
                    "score": score,
                    "updated_at": datetime.utcnow().isoformat()
                }) \
                .eq("user_id", user_id) \
                .eq("quiz_id", quiz_id) \
                .execute()
        else:
            # Insert new if not found (optional)
            return supabase.table("user_quizzes") \
                .insert({
                    "user_id": user_id,
                    "quiz_id": quiz_id,
                    "score": score,
                    "updated_at": datetime.utcnow().isoformat()
                }) \
                .execute()


        