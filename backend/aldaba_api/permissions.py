from rest_framework.permissions import BasePermission


class IsStaffUser(BasePermission):
    message = "Se requiere un usuario administrador."

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class AllowCreateAnyOtherwiseStaff(BasePermission):
    """Permite POST público (reservas) y restringe el resto a staff."""

    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)
