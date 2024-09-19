from transformers import pipeline

classifier = pipeline('sentiment-analysis') 

results = classifier('We are very happy to show you the 🤗 Transformers library.'
                     'We hope you do not hate it.') 
print(results)

