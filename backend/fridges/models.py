from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class Fridges(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    expiry_date = models.DateField()
    quantity = models.IntegerField()

    class Meta:
        verbose_name = verbose_name_plural = "在庫"

