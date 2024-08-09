# urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from supermarket import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'admins', views.AdminViewSet)
router.register(r'suppliers', views.SupplierViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'inventory', views.InventoryViewSet)
router.register(r'sales', views.SaleViewSet)
router.register(r'customers', views.CustomerViewSet)
router.register(r'employees', views.EmployeeViewSet)
router.register(r'salaries', views.SalaryViewSet)
router.register(r'departments', views.DepartmentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
