# Use an official Python runtime as a base image
FROM python:3.10-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /backend

# Install dependencies
COPY requirements.txt /backend/
RUN pip install -r requirements.txt

# Install Gunicorn
RUN pip install gunicorn

# Copy the current directory contents into the container
COPY . /backend/

# Overwrite settings.py with production_settings.py for production deployment
# RUN cp ./backend/production_settings.py ./backend/settings.py 

# Migrate and make db - not sure this matters since it is also called in compose file
RUN python manage.py migrate

EXPOSE 8000

# start server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]