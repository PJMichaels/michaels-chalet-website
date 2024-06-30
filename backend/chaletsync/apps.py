from django.apps import AppConfig


class ChaletsyncConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'chaletsync'

    def ready(self):
        import chaletsync.signals  # Import the signals module to connect the signal
