import torch
from transformers import pipeline
import sys

model_name= sys.argv[1]
prompt = sys.argv[2]
qa_pipeline = pipeline("question-answering", model=model_name)
# parameters = sys.argv[3]
# context = "Hugging Face is a French company based in New-York."
question = "Where is Hugging Face based?"
result = qa_pipeline(question=question)

# generator = pipeline('text-generation',model=model_name)
# result = generator(prompt)
# result = generator(prompt,**eval(parameters))

print(result)
print("Done")   
