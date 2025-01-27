from django.http import JsonResponse
from .models import PmidKeywords
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import pmidKeywordsSerializer


# 검색 기능 (finder)
def get_by_pmid(request, pmid):
        try:
            info = PmidKeywords.objects.get(pmid=pmid)
            return JsonResponse({"pmid":pmid, "keyword_info":info.keyword_info}, status=status.HTTP_200_OK)
        except PmidKeywords.DoesNotExist:
            return JsonResponse({"error": "not found"}, status=status.HTTP_404_NOT_FOUND)

# 등록 기능 (manager)
@api_view(['POST'])
def post_pmid(request):
    print(request.data)
    
    try:
        data = request.data.copy()
        data['keyword_info'] = data.pop('keywordjson', None)
        
        # serializer로 데이터 검증
        serializer = pmidKeywordsSerializer(data=data)

        # is_valid() 함수 호출
        if serializer.is_valid():  
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        else:
            print("Validation errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
      
    except Exception as e:
        print("Exception occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)  
    
# 삭제 기능 (manager)
@api_view(['DELETE'])
def delete_by_pmid(request, pmid):
    try:
        info = PmidKeywords.objects.get(pmid=pmid)
        info.delete()
        return JsonResponse({"pmid":pmid, "keyword_info":info.keyword_info}, status=status.HTTP_200_OK)
    
    except PmidKeywords.DoesNotExist:
        return JsonResponse({"error": "not found"}, status=status.HTTP_404_NOT_FOUND)