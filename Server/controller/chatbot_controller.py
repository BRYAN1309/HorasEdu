from view.response_view import success_response, error_response
from model.chatbot import ChatBot
from flask import request
import json

def start_chat(chatbot: ChatBot):
    try:
        data = request.json
        material = data.get("material")
        material_str = json.dumps(material, ensure_ascii=False)
        chatbot.start_conversation(material_str)

        return success_response("Starting a conversation success","")
    except Exception as e:
        print("Error start chat : ", str(e))
        return error_response(str(e))

def generate_answer(chatbot: ChatBot):
    try:
        question = request.json
        answer = chatbot.continue_chat(question)
        return success_response("Generate answer success", answer)
    except Exception as e:
        print("Error generate answer : ", str(e))
        return error_response(str(e))