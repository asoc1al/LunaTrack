from django.shortcuts import render, redirect
from django.http import HttpResponse



# def index(request):
#     return HttpResponse("<h1>Hello</h1>")

def index(request):
    # return render(request, 'main/home.html')

    context = {

    }
    return render(request, 'main/index.html', context) # Главная страница


    # return redirect(request, 'main/index.html')

def articles(request):
    return render(request, 'main/articles.html')

def lunapro(request):
    return render(request, 'main/lunapro.html')

