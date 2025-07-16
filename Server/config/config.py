from pydantic_settings import BaseSettings
from functools import lru_cache

class Config(BaseSettings):
    gemini_api_key: str
    
    class Config:
        env_file = "../.env"
        
@lru_cache
def generate_config() -> Config:
    return Config()