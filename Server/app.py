from flask import Flask
from flask_jwt_extended import JWTManager
from datetime import timedelta
from dotenv import load_dotenv
from config import generate_config  # Updated import

# Import controllers
from controller import (
    user_controller,
    course_controller,
    module_controller,
    material_controller,
    quiz_controller,
    question_controller,
    user_course_controller
)

# Load configuration
load_dotenv()
config = generate_config()

app = Flask(__name__)

# JWT Configuration
app.config["JWT_SECRET_KEY"] = config.jwt_secret_key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=config.jwt_access_token_expires)
jwt = JWTManager(app)

# Define routes
app.route("/user/register", methods=["POST"])(user_controller.register)
app.route("/user/login", methods=["POST"])(user_controller.login)

app.route("/courses", methods=["POST"])(course_controller.create_course)
app.route("/courses", methods=["GET"])(course_controller.get_courses)
app.route("/courses/<int:course_id>", methods=["GET"])(course_controller.get_course_by_id)  # ✅ NEW ROUTE

# Module routes
app.route("/modules", methods=["POST"])(module_controller.create_module)
app.route("/modules/course/<int:course_id>", methods=["GET"])(module_controller.get_modules_by_course)

# Endpoint Material
app.route("/materials", methods=["POST"])(material_controller.create_material)
app.route("/materials", methods=["GET"])(material_controller.get_materials)
app.route("/modules/<int:module_id>/materials", methods=["GET"])(material_controller.get_materials_by_module)
# Quiz routes
app.route("/quiz", methods=["POST"])(quiz_controller.create_quiz)
app.route("/modules/<int:module_id>/quiz", methods=["GET"])(quiz_controller.get_quizzes_by_module)

app.route("/questions", methods=["POST"])(question_controller.create_question)
app.route("/questions/<int:quiz_id>", methods=["GET"])(question_controller.get_all_questions_by_quiz)
app.route("/questions/<int:quiz_id><int:questions_id>", methods=["GET"])(question_controller.get_question_by_id)

app.route("/questions", methods=["POST"])(question_controller.create_question)
app.route("/questions/quiz/<int:quiz_id>", methods=["GET"])(question_controller.get_all_questions_by_quiz)
app.route("/questions/<int:question_id>", methods=["GET"])(question_controller.get_question_by_id)

app.route("/user/courses/enroll", methods=["POST"])(user_course_controller.enroll_course)
app.route("/user/courses", methods=["GET"])(user_course_controller.get_user_courses)

if __name__ == "__main__":
    app.run(debug=True)
