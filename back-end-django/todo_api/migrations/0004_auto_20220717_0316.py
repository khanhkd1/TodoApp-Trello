# Generated by Django 3.2.13 on 2022-07-17 03:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_api', '0003_auto_20220716_1328'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='date',
        ),
        migrations.AddField(
            model_name='todo',
            name='createdAt',
            field=models.CharField(blank=True, default='17/07/2022-03:16:06', max_length=180),
        ),
        migrations.AlterField(
            model_name='todo',
            name='updatedAt',
            field=models.CharField(blank=True, default='17/07/2022-03:16:06', max_length=180),
        ),
    ]
