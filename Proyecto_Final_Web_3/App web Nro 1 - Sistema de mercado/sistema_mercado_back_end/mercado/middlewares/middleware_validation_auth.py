import jwt
from django.http import JsonResponse
from rest_framework import status

class ValidationAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        url = request.META.get('PATH_INFO')
        jwtReqWithBearer = request.headers.get('authorization')
        role_user = None

        if (not (jwtReqWithBearer == None)):
            jwtNotBearer = jwtReqWithBearer.replace("Bearer ", "")
            jwtDecode = jwt.decode(jwtNotBearer, "salt", algorithms=["HS256"])
            role_user = jwtDecode.get('roles')
            print(role_user)

        if ((url == "/mercado/empresa/") & (role_user == "superadmin") | (role_user == "mercadoadmin")):
            pass
        else:
            return JsonResponse({"msg": "no tienes permisos suficiente"}, safe=False, status=status.HTTP_403_FORBIDDEN)
