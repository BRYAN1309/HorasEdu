from config.supabase_client import supabase

class UserModel:
    @staticmethod
    def register_user(email, password, name):
        # Insert directly into your user table
        response = supabase.table("user").insert({
            "email": email,
            "password": password,  # Note: You should hash this first!
            "name": name
        }).execute()
        
        return response.data[0] if response.data else None

    @staticmethod
    def login_user(email, password):
        # Query the user table directly
        response = supabase.table("user").select("*").eq("email", email).eq("password", password).execute()
        return response.data[0] if response.data else None