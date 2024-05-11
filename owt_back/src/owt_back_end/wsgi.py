"""
WSGI config for owt_back_end project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""
import os
import sys

from django.core.wsgi import get_wsgi_application

sys.path.append('/owt_back/src')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.owt_back_end.settings')

application = get_wsgi_application()