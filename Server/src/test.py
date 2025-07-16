from model import ChatBot


if __name__ == "__main__":
    chatbot = ChatBot()

    material = ""
    chatbot.start_conversation(material=material)

    while True:
        user_input = input("Question : ")

        if user_input.lower() == "exit":
            break
        
        chatbot.continue_chat(user_input=user_input)
        response = chatbot.continue_chat(user_input)
        print("🤖 " + response)