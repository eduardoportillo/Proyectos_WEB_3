from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse, reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView

from entidades.forms.user_register_form import UserRegisterForm


class UserListView(ListView):
    model = User
    template_name = "users/list.html"

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            return redirect('user.login')
    else:
        form = UserRegisterForm()

    context = {'form': form}
    return render(request, 'users/register.html', context)

class UserUpdateView(UpdateView):
    model = User
    template_name = "users/form.html"
    fields = "__all__"
    success_url = '/users'


def delete(request, user_id):
    persona = get_object_or_404(User, pk=user_id)
    persona.delete()
    return redirect(reverse('user.list'))
