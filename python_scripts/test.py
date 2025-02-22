from dotenv import load_dotenv
import os

load_dotenv()  # This loads variables from the .env file into os.environ

api_key = os.environ.get("PERPLEXITY_API_KEY")
print("Your API key is:", api_key)
