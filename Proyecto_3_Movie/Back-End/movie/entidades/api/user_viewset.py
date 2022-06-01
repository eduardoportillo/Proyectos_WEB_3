from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import generics, status, serializers


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True)
    username = serializers.CharField(
        required=True)
    password = serializers.CharField(
        min_length=8)

    def validate_password(self, password):
        return make_password(password)

    class Meta:
        model = get_user_model()
        fields = ('email', 'username', 'password')

class SignupView(generics.CreateAPIView):
    serializer_class = UserSerializer
