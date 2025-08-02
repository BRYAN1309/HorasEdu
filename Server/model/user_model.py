from config.supabase_client import supabase
import jwt
from datetime import datetime, timedelta
from flask import current_app

class UserModel:
    @staticmethod
    def generate_token(user_id):
        """Generate JWT token"""
        try:
            payload = {
                'exp': datetime.utcnow() + timedelta(days=1),
                'iat': datetime.utcnow(),
                'sub': str(user_id)  # Ensure user_id is string
            }
            token = jwt.encode(
                payload,
                current_app.config["JWT_SECRET_KEY"],  # Changed from 'SECRET_KEY'
                algorithm='HS256'
            )
            # PyJWT 2.0+ returns string by default
            return token
        except Exception as e:
            raise Exception(f"Token generation failed: {str(e)}")

    @staticmethod
    def login_user(email, password):
        """Login user and return user data with JWT token"""
        try:
            response = supabase.table("user").select("*").eq("email", email).eq("password", password).execute()
            
            if not response.data:
                return None
                
            user = response.data[0]
            token = UserModel.generate_token(user['id'])
            
            return {
                "user": {
                    "id": user["id"],
                    "email": user["email"],
                    "name": user["name"]
                },
                "token": token
            }
        except Exception as e:
            raise Exception(f"Login failed: {str(e)}")

    @staticmethod
    def register_user(email, password, name):
        """Register a new user and return JWT token"""
        try:
            # First check if user exists
            existing_user = supabase.table("user").select("*").eq("email", email).execute()
            if existing_user.data:
                raise Exception("Email already registered")

            # Create new user
            response = supabase.table("user").insert({
                "email": email,
                "password": password,  # Warning: Store hashed passwords in production
                "name": name
            }).execute()
            
            if not response.data:
                return None
                
            user = response.data[0]
            token = UserModel.generate_token(user['id'])
            
            return {
                "user": {
                    "id": user["id"],
                    "email": user["email"],
                    "name": user["name"]
                },
                "token": token
            }
        except Exception as e:
            raise Exception(f"Registration failed: {str(e)}")
        
    @staticmethod
    def verify_token(token):
        import jwt
        from flask import current_app
        try:
            payload = jwt.decode(token, current_app.config["JWT_SECRET_KEY"], algorithms=["HS256"])
            return {"user_id": payload["sub"]}
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
