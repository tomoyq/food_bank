from django.db import models

#大カテゴリ
class LargeCategories(models.Model):
    categoryId = models.IntegerField(primary_key=True)
    categoryName = models.CharField(max_length=100)

    class Meta:
        verbose_name = verbose_name_plural = "大カテゴリ"
    
    def __str__(self):
        return self.categoryName

#中カテゴリ
class MediumCategories(models.Model):
    categoryId = models.IntegerField(primary_key=True)
    categoryName = models.CharField(max_length=100)
    parentCategoryId = models.ForeignKey(LargeCategories, on_delete=models.CASCADE)

    class Meta:
        verbose_name = verbose_name_plural = "中カテゴリ"

    def __str__(self):
        return self.categoryName

#小カテゴリ
class SmallCategories(models.Model):
    categoryId = models.IntegerField(primary_key=True)
    categoryName = models.CharField(max_length=100)
    parentCategoryId = models.ForeignKey(MediumCategories, on_delete=models.CASCADE)

    class Meta:
        verbose_name = verbose_name_plural = "小カテゴリ"

    def __str__(self):
        return self.categoryName