import jwt
from django.http import JsonResponse
from rest_framework import status


class ValidationAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    @staticmethod
    def process_view(request, view_func, view_args, view_kwargs):
        url = request.META.get('PATH_INFO')
        method_http_req = request.method
        jwt_req_with_bearer = request.headers.get('authorization')
        role_user = ""
        if not (jwt_req_with_bearer is None):
            jwt_not_bearer = jwt_req_with_bearer.replace("Bearer ", "")
            jwt_decode = jwt.decode(jwt_not_bearer, "salt", algorithms=["HS256"])
            role_user = jwt_decode.get('roles')

        if ((url == "/mercado/empresa/")
                & (method_http_req == 'GET')
                | (role_user == "superadmin") | (role_user == "mercadoadmin")
        ):
            pass

        elif ((url == "/mercado/producto/")
              & (method_http_req == 'GET')
              | (role_user == "superadmin") | (role_user == "mercadoadmin")
        ):
            pass

        elif ((url == "/mercado/categoria/")
              & (method_http_req == 'GET')
              | (role_user == "superadmin") | (role_user == "mercadoadmin")
        ):
            pass
        else:
            return JsonResponse({"msg": "no tiene permisos suficiente"}, safe=False, status=status.HTTP_403_FORBIDDEN)
