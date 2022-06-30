import re

import jwt
from django.http import JsonResponse
from rest_framework import status
import json


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

        url_regex = re.compile("/(\w+)/(\w+)/(\d?)")

        # if ((url == '/entrega/pedido/')
        #         & (method_http_req == 'POST')
        #         | (role_user == "superadmin") | (role_user == "entregaadmin")):
        #
        #     json_new_body = json.loads(request.body)
        #     json_new_body["usuario_id"] = jwt_decode["userId"]
        #     json_new_body["username"] = jwt_decode["username"]
        #
        #     json_dictionary = json.dumps(json_new_body)
        #     bytes_json = bytes(json_dictionary)
        #     print(bytes_json)
        #
        #     request._body = bytes_json
        #     pass

        if ((bool(url_regex.match(url)))
                & (method_http_req == 'GET')
                | (role_user == "superadmin") | (role_user == "entregaadmin")
        ):
            pass

        else:
            return JsonResponse({"msg": "no tiene permisos suficiente o si desea actualizar use FMS"}, safe=False,
                                status=status.HTTP_403_FORBIDDEN)
