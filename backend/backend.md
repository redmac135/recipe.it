# Backend READme 👋

Our app's back end is built on Python and calls Conductor to execute workflows. To run it, you just have to start the FastAPI server:

## Get started

1. First, you have to pass Firebase authentication by getting the service key. Thorough documentation on how to do this can be found on the following Firebase webpage:
https://firebase.google.com/docs/firestore/quickstart

2. If you have done the above steps properly, you should have a serviceAccountKey.json file in your backend folder.

3. Install the virtual environment

   ```bash
   python3 -m venv .venv #for mac and linux
   python -m venv .venv #for windows
   ```

3. Activate the virtual environment

   ```bash
   source .venv/bin/activate #for mac and linux
   ./.venv/Scripts/activate # for windows
   ```
4. Install dependencies

    ```bash
    pip3 install -r requirements.txt #for mac and linux
    pip install -r requirements.txt #for windows
    ```

4. Start the backend

   ```bash
   uvicorn main:app --reload
   ```


# Enjoy Recipe.it 😊
