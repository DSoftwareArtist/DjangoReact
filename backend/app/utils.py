import json
import logging
import requests

from django.shortcuts import render

logger = logging.getLogger(__name__)

def render_react_page(
    request,
    title,
    react_page_name,
    react_context,
    template="react_base.html",
    django_context=None,
    ssr=True
):
    react_html = ""
    if ssr:
        try:
            resp = requests.post(
                f"http://ssr:3001/render/{react_page_name}/",
                json=react_context,
                timeout=0.1,
            )
            react_html = resp.text
        except (requests.HTTPError, requests.ReadTimeout, requests.ConnectionError):
            logger.exception("Server side rendering failed")

    context = {
        "react_html": react_html,
        "react_context": json.dumps(react_context),
        "css_file": f"css/{react_page_name}.css",
        "react_page_name": react_page_name,
        "body_class": react_page_name,
        "title": title,
    }
    if django_context:
        context.update(django_context)

    return render(request, template, context)
