from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

class Admin(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

class Supplier(models.Model):
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=20)
    email = models.EmailField()

class Product(models.Model):
    name = models.CharField(max_length=100)
    barcode = models.CharField(max_length=50)
    price = models.FloatField()
    stock = models.IntegerField()

class Inventory(models.Model):
    item = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price = models.FloatField()
    barcode = models.CharField(max_length=50)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, null=True)

class Sale(models.Model):
    product = models.CharField(max_length=100)
    quantity = models.IntegerField()
    total = models.FloatField()
    paymentMethod = models.CharField(max_length=50)
    customer = models.CharField(max_length=100)

class Customer(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)

class Employee(models.Model):
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    shift = models.CharField(max_length=50)
    attendance = models.IntegerField()

class Salary(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, null=True)
    salary = models.FloatField()

class Department(models.Model):
    name = models.CharField(max_length=100)
    baseSalary = models.FloatField()
