# Open Weight Tracker

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![DjangoREST](https://img.shields.io/badge/django%20rest-ff1709?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Debian](https://img.shields.io/badge/Debian-D70A53?style=for-the-badge&logo=debian&logoColor=white)
![Raspberry Pi](https://img.shields.io/badge/-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi)
<br>
**OpenWeightTracker (OWT)** is a free and open-source application released under the Copyleft license.
<br>It provides a simple and user-friendly way to track your weight while respecting your data and privacy.
<br><br>Coming soon on [OWT just here !](https://owt.quentingenet.fr)

## Technologies

**OWT** is developed using **Python** for the backend, along with the **Django REST** framework,
<br>For the frontend, the application is developed with **React**.

## How to run project?

Follow these steps to run the Open Weight Tracker locally:

### Prerequisites

Make sure you have the following installed:

- [Python3](https://www.python.org/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Clone the repository

```bash
git clone https://github.com/quentingenet/open_weight_tracker.git
```
**Don't forget to create your personal .env file for the environment variables used in the project (front and back)**

### Backend Setup
Assuming you have Python3 and pip installed, you should create your virtual environment and activate it.
```bash
python3 -m venv venv
source venv/bin/activate
cd open_weight_tracker/owt_back
pip install -r requirements.txt
cd open_weight_tracker/owt_back/src
python manage.py makemigrations
python manage.py migrate
```

### Start the backend server
```bash
cd open_weight_tracker/owt_back/src
python manage.py runserver
```
Backend server is currently running on **http://localhost:8000**

### Frontend Setup
In a separate terminal, install and start the frontend
```bash
cd open_weight_tracker/owt_front
npm install
```

### Start the frontend server
```bash
cd open_weight_tracker/owt_front
npm run dev
```
Visit **http://localhost:5173** in your web browser to see the Open Weight Tracker application.

## How to contribute ?

There are opportunities for further improvements and ideas.
<br>Contributions and pull requests are welcome !
<br>
Nobody should be restricted by the software they use. There are four freedoms that every user should have:

-   the freedom to use the software for any purpose,
-   the freedom to change the software to suit your needs,
-   the freedom to share the software with your friends and neighbors,
-   the freedom to share the changes you make.

## Author and contributors

-   Quentin GENET
-   Maybe you as contributor... ? 😄🚀

![OWT preview](https://github.com/quentingenet/open_weight_tracker/blob/develop/owt_preview.png)
