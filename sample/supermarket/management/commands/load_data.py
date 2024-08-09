# management/commands/load_data.py

import json
from django.core.management.base import BaseCommand
from supermarket.models import User, Admin, Supplier, Product, Inventory, Sale, Customer, Employee, Salary, Department

class Command(BaseCommand):
    help = 'Load data from db.json'

    def handle(self, *args, **kwargs):
        with open('db.json') as f:
            data = json.load(f)

            for user_data in data['users']:
                User.objects.create(**user_data)

            for admin_data in data['admins']:
                Admin.objects.create(**admin_data)

            for supplier_data in data['suppliers']:
                Supplier.objects.create(**supplier_data)

            for product_data in data['products']:
                Product.objects.create(**product_data)

            for inventory_data in data['inventory']:
                Inventory.objects.create(**inventory_data)

            for sale_data in data['sales']:
                Sale.objects.create(**sale_data)

            for customer_data in data['customers']:
                Customer.objects.create(**customer_data)

            for employee_data in data['employees']:
                Employee.objects.create(**employee_data)

            for salary_data in data['salaries']:
                Salary.objects.create(**salary_data)

            for department_data in data['departments']:
                Department.objects.create(**department_data)

        self.stdout.write(self.style.SUCCESS('Data loaded successfully'))
