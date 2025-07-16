from flask import Flask
from controller import user_controller

app = Flask(__name__)

# Define routes
app.route("/user/register", methods=["POST"])(user_controller.register)
app.route("/user/login", methods=["POST"])(user_controller.login)

if __name__ == "__main__":
    app.run(debug=True)
