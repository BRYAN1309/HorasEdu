from flask import Flask
from controller import user_controller
from controller import course_controller
from controller import module_controller, material_controller
from controller import quiz_controller
from controller import question_controller
app = Flask(__name__)

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
app.route("/questions/<int:module_id>", methods=["GET"])(question_controller.get_all_questions_by_quiz)
app.route("/questions/<int:module_id>/<int:quiz_id>", methods=["GET"])(question_controller.get_question_by_id)

if __name__ == "__main__":
    app.run(debug=True)
