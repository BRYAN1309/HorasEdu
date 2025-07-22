from pydantic_settings import BaseSettings
from functools import lru_cache

class AppConfig(BaseSettings):
    gemini_api_key: str
    jwt_secret_key: str = "fallback-secret-key"
    jwt_access_token_expires: int = 3600  # 1 hour in seconds
    
    class Config:
        env_file = ".env"
        extra = "ignore"

@lru_cache
def generate_config() -> AppConfig:
    return AppConfig()