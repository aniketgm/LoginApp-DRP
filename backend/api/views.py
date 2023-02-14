import jwt, datetime
from rest_framework.authtoken.views import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.fields import json
from rest_framework.views import APIView
from api.models import UserAuth
from api.serializers import UserSerializer


class SignUpView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):

        email = request.data['email']
        password = request.data['password']
        user = UserAuth.objects.filter(email=email).first()
        
        if user is None:
            raise AuthenticationFailed('User not found!')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.now() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.now()
        }

        resp = Response()
        token = request.COOKIES.get('jwt', None)
        print('Token: ', token)
        if not token:
            token = jwt.encode(payload, 'secret', algorithm='HS256')
            resp.set_cookie('jwt', token, httponly=True)
        resp.data = {
            'jwt': token
        }
        return resp


class LogoutView(APIView):
    def delete(self, request):
        token = request.COOKIES.get('jwt', None)
        # print(request.HTTP_COOKIES)
        print(request.COOKIES)
        print(json.dumps( dict(request.META), default=str, indent=2))
        resp = Response()
        if token:
            resp.delete_cookie('jwt')
            resp.data = {
                'message': 'Logged out successfully'
            }
        else:
            resp.data = {
                'message': 'Already logged out'
            }

        return resp


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES['jwt']

        if not token:
            raise AuthenticationFailed('Authentication Failed: Token not found')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Authentication Failed: Signature Expired')

        user = UserAuth.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


