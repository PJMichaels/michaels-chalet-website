Running locally vs running containerized requires a switch to the proxy config in package.json.

swap localhost to backend to run in containers or visa versa


Everything can be run using the start-app.ps1 script, but this does docker-compose build and docker-compose up every time. I don't think these are both required every time but I need to figure out more about this. 



To run backend tests navigate to backend directory in terminal and run:

```pipenv run python manage.py test --settings=backend.test_settings```


To start the app in docker dev containers:
```docker-compose -f compose-dev.yaml up```