from django.urls import path
from api.views import LoginView, LogoutView, SignUpView, UserView

urlpatterns = [
    path('signup/', SignUpView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('user/', UserView.as_view())
]
