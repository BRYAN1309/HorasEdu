from config.supabase_client import supabase
from datetime import datetime

class FinalUserQuizModel:
    @staticmethod
    def save_user_answer(data):
        return supabase.table("user_final_exams").insert(data).execute()

    # @staticmethod
    # def get_user_answers(user_id, quiz_id):
    #     return supabase.table("user_answers").select("*").eq("user_id", user_id).eq("quiz_id", quiz_id).execute()

    @staticmethod
    def save_user_exam_result(data):
        return supabase.table("user_final_exams").insert(data).execute()
    
    @staticmethod
    def get_user_final_exam(user_id, final_exam_id):
        return supabase.table("user_final_exams").select("*").eq("user_id", user_id).eq("final_exam_id", final_exam_id).execute()

    @staticmethod
    def update_user_final_exam(user_id, final_exam_id, score):
        # First, check if the record exists
        existing = supabase.table("user_final_exams") \
            .select("*") \
            .eq("user_id", user_id) \
            .eq("final_exam_id", final_exam_id) \
            .limit(1) \
            .execute()

        if existing.data:
            # Update the record
            return supabase.table("user_final_exams") \
                .update({
                    "score": score,
                    "updated_at": datetime.utcnow().isoformat()
                }) \
                .eq("user_id", user_id) \
                .eq("final_exam_id", final_exam_id) \
                .execute()
        else:
            # Insert new if not found (optional)
            return supabase.table("user_final_exams") \
                .insert({
                    "user_id": user_id,
                    "final_exam_id": final_exam_id,
                    "score": score,
                    "updated_at": datetime.utcnow().isoformat()
                }) \
                .execute()


        