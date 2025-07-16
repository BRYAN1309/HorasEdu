from supabase import create_client, Client

url = "https://ctyfivrabfcxxsxjdpvz.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0eWZpdnJhYmZjeHhzeGpkcHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1ODI3NjksImV4cCI6MjA2ODE1ODc2OX0.RM9pMQkwGP7RQbHx8NZg5CFTZU2v82pJ28P7H0cZbUA"

supabase: Client = create_client(url, key)
