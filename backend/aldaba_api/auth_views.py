import logging
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


logger = logging.getLogger(__name__)


class SafeTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        "no_active_account": "Credenciales invalidas",
    }

    def validate(self, attrs):
        try:
            return super().validate(attrs)
        except AuthenticationFailed:
            logger.warning("Failed login attempt")
            raise AuthenticationFailed("Credenciales invalidas")


class SafeTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        try:
            return super().validate(attrs)
        except (InvalidToken, TokenError):
            raise AuthenticationFailed("Token invalido")


class ThrottledTokenObtainPairView(TokenObtainPairView):
    serializer_class = SafeTokenObtainPairSerializer
    throttle_scope = "login"


class ThrottledTokenRefreshView(TokenRefreshView):
    serializer_class = SafeTokenRefreshSerializer
    throttle_scope = "token_refresh"

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code != status.HTTP_200_OK:
            return Response({"detail": "Token invalido"}, status=response.status_code)
        return response
