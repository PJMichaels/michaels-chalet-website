Running locally vs running containerized requires a switch to the proxy config in package.json.

swap localhost to backend to run in containers or visa versa


Everything can be run using the start-app.ps1 script, but this does docker-compose build and docker-compose up every time. I don't think these are both required every time but I need to figure out more about this. 



To run backend tests navigate to backend directory in terminal and run:

```pipenv run python manage.py test --settings=backend.test_settings```


To start the app in docker dev containers:
```docker-compose -f compose-dev.yaml up```

Note that this only spins up the backend and postgres db... it does add default settings.
Front end must be started from frontend dir using:
```npm start```


## Next steps:
- keep testing blocked dates approach now that provisioned dates has been depreciated and removed
- Make sure when requesting to book, it checks that all dates in request are available, and prevents action if necessary.

- Style calendars with tailwind...
- Admin Calendar - disable past dates.
- Set page text to configurable if admin - set maximum out date block for booking cal
- Fix MVP unit tests since they use the availability model...
- Update postman to remove availability links
- If reason is provided when blocking dates, add that reason to the dates
- Add hover on calendar management page - if over booking, get booking info
- Restyle bookings/blocked dates etc.. to look nicer
- Take a closer look at timezones, I think there is a bug here that I am solving as though it is a zero index issue.
- Get bookings automatically from Airbnb! - would require web scraping most likely...
- Add a configurations model and configuration page with things like number of days out for booking etc...
