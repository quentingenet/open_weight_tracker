from setuptools import setup, find_packages

setup(
    name='owt_api',
    version='0.0.1',
    description='Open Weight Tracker API package.',
    long_description='OWT is a free and open-source weight tracking application under copyleft. This package contains the API for the application.',
    author='Quentin Genet',
    author_email='genetquentin@gmail.com',
    url='https://github.com/quentingenet/open_weight_tracker',
    install_requires=[
        'asgiref==3.7.2',
        'build==1.0.3',
        'Django==5.0.1',
        'django-cors-headers==4.3.1',
        'django-extensions==3.2.3',
        'djangorestframework==3.14.0',
        'djangorestframework-simplejwt==5.3.1',
        'packaging==23.2',
        'psycopg2-binary==2.9.9',
        'PyJWT==2.8.0',
        'pyproject_hooks==1.0.0',
        'python-dateutil==2.8.2',
        'python-decouple==3.8',
        'pytz==2023.3.post1',
        'six==1.16.0',
        'sqlparse==0.4.4',
    ],
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: GNU General Public License v3 (GPLv3)",
        "Operating System :: OS Independent",
    ],
)
