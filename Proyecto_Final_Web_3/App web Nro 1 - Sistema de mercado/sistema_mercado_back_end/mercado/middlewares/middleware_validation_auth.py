# import requests
import jwt

class ValidationAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        url = request.META.get('PATH_INFO')
        jwtReq = request.headers.get('authorization')
        jwtReq = jwtReq.replace("Bearer ", "")
        print(jwtReq)
        jwtDecode = jwt.decode(jwtReq, "salt", algorithms=["HS256"])
        
        # def generate_request(url, params={}):
        #     response = requests.get(url, params=params)
        #
        #     if response.status_code == 200:
        #         return response.json()
        #
        # def get_user(params={}):
        #     res = generate_request('http://localhost:3000/api/user/', params)
        #     if res:
        #         user = str(res)
        #         return print(user)

            # return {}

