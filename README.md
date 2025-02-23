# Recipeit 🇨🇦🍲

Food costs are skyrocketing in Canada, and every morsel counts! Recipeit is here to help you save money by ensuring nothing goes to waste. With Recipeit, you can manage your groceries efficiently, and get recipe suggestions based on ingredients you already have, especially those nearing their expiration date.

## Overview 🚀
Recipeit leverages cutting-edge technologies to transform your grocery management experience:
- **Receipt Scanning**: Capture your receipts using our Expo-based mobile app 📱.
- **OCR Integration**: Use Tesseract OCR to convert receipt images into text.
- **Smart Data Parsing**: Gemini processes the text into structured JSON data with fields such as ingredient name, expiry date, and quantity. All recipes and logic were handled with gemini API.
- **Database Management**: Store and retrieve your data effortlessly with Firestore.
- **FastAPI Backend**: Fetch data using our FastAPI-powered backend, ensuring smooth and reliable performance.

## How It Works 🔍
1. **Scan Receipts**: Open the Recipeit app and scan your grocery receipts.
2. **Extract Data**: Tesseract OCR parses the scanned images to extract text.
3. **Data Processing**: The extracted text is sent to Gemini, which converts it into structured JSON data.
4. **Store in Firestore**: The parsed data is saved in a Firestore database.
5. **Fetch via FastAPI**: Retrieve your data and view suggested recipes using our FastAPI backend.
6. **Workflows created with Orkes**: Most workflows (with the exception of get and set requests) were created and integrated using Orkes

## How to Use ⚙️
Follow these steps to get started with Recipeit:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/redmac135/recipe.it.git
   cd recipe.it

2. **Set Up Your Backend**
   - Recipeit's backend is made using Orkes, FastAPI, Gemini API, and Firestore. 
   - To create your Recipeit backend, please go to the [Recipeit Backend Readme](https://github.com/redmac135/recipe.it/blob/dev/backend/backend.md) and follow the instructions there to properly set up your frontend.


3. **Set Up Your Frontend**
   - Recipeit's backend is run using Expo, please go to . 
   - To create your Recipeit backend, please go to the [Recipeit Frontend Readme](https://github.com/redmac135/recipe.it/blob/dev/client/README.md) and follow the instructions there to properly set up your frontend.
