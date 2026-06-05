# Reservations Management System

A web application for managing reservations. It supports role-based login, reservation creation, date/time scheduling, technician assignment, and reservation tracking with a simulated backend powered by `json-server`.

## Technologies

* Frontend: Vite, JavaScript, HTML, and CSS
* HTTP Client: Axios
* Icons: Lucide
* Simulated Backend: json-server
* Local Persistence: JSON files

## Project Structure

```txt
tickets-management-system/
├── backend/
│   ├── auth/
│   │   └── auth-db.json
│   ├── data/
│   │   └── data-db.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   └── views/
│   ├── style/
│   └── package.json
└── README.md
```

## Requirements

* Node.js
* npm

## Installation

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Environment Variables

Inside the `frontend` folder, create a `.env` file with the following content:

```env
VITE_AUTH_API_URL=http://localhost:3000
VITE_DATA_API_URL=http://localhost:3002
VITE_CONTENT_TYPE=application/json
VITE_TIMEOUT=5000
```

## Running the Application

Start three separate processes:

Authentication server:

```bash
cd backend
npm run start
```

Data server:

```bash
cd backend
npm run start2
```

Frontend:

```bash
cd frontend
npm run dev
```

Then open the URL displayed by Vite, typically:

```txt
http://localhost:5173
```

## Test Users

| Role       | Email                                     | Password |
| ---------- | ----------------------------------------- | -------- |
| Admin      | [felipe@test.com](mailto:felipe@test.com) | 123      |
| Technician | [luis@test.com](mailto:luis@test.com)     | 123      |
| Client     | [mateo@test.com](mailto:mateo@test.com)   | 123      |
| Technician | [daniel@test.com](mailto:daniel@test.com) | 123      |

## Main Routes

| Route               | View             |
| ------------------- | ---------------- |
| `/`                 | Login            |
| `/dashboard/admin`  | Admin Dashboard  |
| `/dashboard/client` | Client Dashboard |

## Scripts

Backend:

```bash
npm run start
npm run start2
```

Frontend:

```bash
npm run dev
npm run build
npm run preview
```

## Data Model

Each reservation record includes the following fields:

* `id` — unique reservation identifier
* `ticketName` — reservation title
* `description` — reservation details
* `reservationDate` — scheduled date (`YYYY-MM-DD`)
* `reservationTime` — scheduled time (`HH:MM`)
* `priority` — urgency level
* `caseType` — reservation type or category
* `status` — reservation status
* `Technician` — assigned technician name
* `UserId` — user id of the creator
* `requestingClient` — name of the requesting user

## Features

* Role-based authentication and access control
* Reservation creation and editing
* Reservation date and time fields
* Reservation listing for admin, client, and technician views
* Search by reservation name, description, client, technician, status, type, date, or time
* Reservation assignment to technicians
* Reservation deletion

## What Changed

### Frontend

* `frontend/src/views/modalTicket.html`
  * Updated labels from tickets to reservations
  * Added `reservationDate` and `reservationTime` fields

* `frontend/src/components/modalTIckets.js`
  * Sends `reservationDate` and `reservationTime` when creating or updating reservations
  * Loads reservation date/time values when editing

* `frontend/src/components/ticketTr.js`
  * Displays reservation date and time in the admin table

* `frontend/src/components/ticketCard.js`
  * Shows reservation date/time for client cards

* `frontend/src/components/ticketTechCard.js`
  * Shows reservation date/time for technician cards

* `frontend/src/pages/admin.js`, `frontend/src/pages/user.js`, `frontend/src/pages/tech.js`
  * Search now includes reservation date and time fields

### Backend

* `backend/data/data-db.json`
  * Added sample reservation records with `reservationDate` and `reservationTime`

## Upload to GitHub

If you want to push this project to your new repository, use these commands from the project root:

```bash
git init
# if origin already exists, remove it first:
# git remote remove origin

git remote add origin https://github.com/joseph080508/REPO_JS.git
git branch -M main
git add .
git commit -m "Add reservation management with date/time support and documentation"
git push -u origin main
```

If the repo already exists locally, simply update the remote and push:

```bash
git remote set-url origin https://github.com/joseph080508/REPO_JS.git
git add .
git commit -m "Document reservation changes and add docs"
git push
```

## Development Notes

* The backend is simulated with `json-server`; data is stored in JSON files.
* `frontend/.env` must define the API URLs for the auth and data servers.
* Use `npm run build` in `frontend` to validate production readiness.
