from django.db import models

# Pmid_keywords 테이블 Model
class PmidKeywords(models.Model):
    pmid = models.CharField(max_length=20, primary_key=True)
    keyword_info = models.JSONField()
    
    class Meta:
        db_table = 'pmid_keywords'
        managed=False