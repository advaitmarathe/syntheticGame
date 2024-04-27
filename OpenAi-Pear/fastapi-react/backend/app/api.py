from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from openai import OpenAI
client = OpenAI(api_key = "")

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

todos = [
    {"id": "1", "item": "Read a book"},
    {"id": "2", "item": "Cycle around town"}
]

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.get("/todo", tags=["todos"])
async def get_todos() -> dict:
    return {"data": todos}

@app.post("/todo", tags=["todos"])
async def add_todo(todo: dict) -> dict:
    todos.append(todo)
    return {"data": "Todo added."}

@app.put("/todo/{id}", tags=["todos"])
async def update_todo(id: int, body: dict) -> dict:
    for todo in todos:
        if int(todo["id"]) == id:
            todo["item"] = body["item"]
            return {"data": f"Todo with id {id} has been updated."}
    return {"data": f"Todo with id {id} not found."}

@app.delete("/todo/{id}", tags=["todos"])
async def delete_todo(id: int) -> dict:
    for todo in todos:
        if int(todo["id"]) == id:
            todos.remove(todo)
            return {"data": f"Todo with id {id} has been removed."}
    return {"data": f"Todo with id {id} not found."}

def create_summary(text): 
  prompt = "Summarize the piece of text for me in an informational way. Wikipedia Article Text:"
  response = client.chat.completions.create(
  model="gpt-4-turbo",
  messages=[
    {
      "role": "user",
      "content": f"{prompt} {text}"
    },
  ],
  temperature=1,
  max_tokens=256,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
  )
  return response.choices[0].message.content

@app.get("/random_wikipedia", tags=["Wikipedia"])
async def random_wikipedia_article():
    url = "https://en.wikipedia.org/w/api.php"

    def get_random_article():
        # Parameters for the API to get a random page title
        params_random = {
            "action": "query",
            "format": "json",
            "list": "random",
            "rnnamespace": 0,  # Main namespace only
            "rnlimit": "10"    # Fetching multiple random pages to check
        }

        # Request to get a random page
        response_random = requests.get(url, params=params_random)
        data_random = response_random.json()
        return data_random["query"]["random"]

    def check_if_person(title):
        # Parameters to get the categories of the page
        params_categories = {
            "action": "query",
            "format": "json",
            "titles": title,
            "prop": "categories",
            "cllimit": "max"  # Get all categories to check
        }

        # Request to get page categories
        response_categories = requests.get(url, params=params_categories)
        data_categories = response_categories.json()
        page_id = next(iter(data_categories["query"]["pages"]))
        categories = data_categories["query"]["pages"][page_id].get("categories", [])
        
        # Check if any category implies a biography
        for category in categories:
            if "births" in category["title"].lower() or "living people" in category["title"].lower():
                return True
        return False

    random_articles = get_random_article()
    for article in random_articles:
        if not check_if_person(article["title"]):
            title = article["title"]
            break
    else:
        return {"error": "No suitable article found."}

    def get_closest_concepts(text):
        prompt = ("Based on this text, identify the 5 main concepts that readers might find confusing. "
                "Format your response as a JSON object with one key named 'CONCEPTS', "
                "and the value should be a list of the concepts. Each concept should be 2-3 words long, "
                "slightly ambiguous, and presented in a comma-separated list inside the JSON value.")

        response = client.chat.completions.create(
            model="gpt-4-turbo",
            response_format = {"type": "json_object"},
            messages=[
            {
                "role": "user",
                "content": f"{prompt} {text}"
            },
            ],
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
            )
        return response.choices[0].message.content

    # Parameters to get the text of the selected page
    params_text = {
        "action": "query",
        "format": "json",
        "titles": title,
        "prop": "extracts",
        "explaintext": True
    }
    def create_summary(text): 
        prompt = "Summarize the piece of text for me in an informational way. Wikipedia Article Text:",
        response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {
            "role": "user",
            "content": f"{prompt} {text}"
            },
        ],
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
        return response.choices[0].message.content

    # Request to get the page content
    response_text = requests.get(url, params=params_text)
    data_text = response_text.json()
    page_id = next(iter(data_text["query"]["pages"]))
    content = data_text["query"]["pages"][page_id]["extract"]

    article_url = f"https://en.wikipedia.org/wiki/{title.replace(' ', '_')}"
    closest = get_closest_concepts(content)
    summary = create_summary(content)
    return {
        "title": title,
        "content": content,
        "url": article_url,
        "closest": closest,
        "summary": summary
    }