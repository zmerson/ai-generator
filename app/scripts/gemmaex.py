import torch
from transformers import pipeline

pipe= pipeline(
    "text-generation",
    model="google/gemma-1-20M-it",
    model_kwargs={"torch_dtype": torch.bfloat16},
    device="cuda"
)
messages = [
    {"role": "user", "content": "Hello!"},
]

outputs = pipe(messages, max_new_tokens=256)
assistant_response = outputs[0]["generated_text"][-1]["content"].strip()
print(assistant_response)
# Ahoy, matey! I be Gemma, a d