from django.conf import settings
from django.http import JsonResponse
from .utils import render_react_page

# Create your views here.

def landing(request):
    if request.method == 'GET':
        context = {
            "message": "This is your landing page"
        }
        return render_react_page(
            request,
            "page",
            "page",
            template="page.html",
            react_context=context,
            django_context=context
        )
    else:
        return JsonResponse({})