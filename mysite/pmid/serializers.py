from rest_framework import serializers
from pmid.models import PmidKeywords


class pmidKeywordsSerializer(serializers.ModelSerializer):

    class Meta:
        model = PmidKeywords
        fields = ('pmid', 'keyword_info')