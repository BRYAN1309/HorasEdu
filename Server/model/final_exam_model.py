from config.supabase_client import supabase
from typing import Optional

class FinalExamModel:
    @staticmethod
    def create_quiz(data):
        return supabase.table("quiz").insert(data).execute()

    @staticmethod
    def update_final_exam(data, final_exam_id):
        return supabase.table("final_exam").update(data).eq("id", final_exam_id).execute()

    # @staticmethod
    # def get_all_quizzes_by_modules(module_id):
    #     return supabase.table("quiz").select("*").eq("module_id",module_id).execute()

    @staticmethod
    def get_final_exam(course_id: int):
        return supabase.table("final_exam").select("*, final_exam_questions(*)").eq("course_id", course_id).single().execute()
        