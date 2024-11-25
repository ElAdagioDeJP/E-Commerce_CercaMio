from django.shortcuts import render

# Create your views here.
def login(request):
    if request.method == 'POST':
        #request.POST["USERNAME"] = "AASDASDA"
        #{"USERNAME": "AASDASDA", "PASSWORD": "ASDASDASD"}
        return render(request, 'SesionUsuraio.jsx')
    else:
        pass
    # logica de login
    return render(request, 'SesionUsuraio.jsx')