from django.contrib import admin

from .models import LargeCategories, MediumCategories, SmallCategories

admin.site.register(LargeCategories)
admin.site.register(MediumCategories)
admin.site.register(SmallCategories)