from .settings import *


# Dedicated key for tests to avoid weak-key warnings in JWT operations.
SECRET_KEY = "test-secret-key-aldaba-2026-with-strong-length-1234567890"
SIMPLE_JWT["SIGNING_KEY"] = SECRET_KEY


# Use SQLite for deterministic local/CI tests without requiring PostgreSQL.
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "test_db.sqlite3",
    }
}

PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]
