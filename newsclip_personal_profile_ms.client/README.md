# Newsclip Personal Profile App

A full-stack web application built using **ASP.NET Core 8** (Web API) and **React** (with Vite).  
This app allows users to view, edit, and persist personal profile data, including:

- Basic information
- Education history
- Work experiences
- Skills

---

## Project Structure

```
newsclip-personal-profile-ms/
├── newsclip_personal_profile_ms.client     # React frontend
├── newsclip_personal_profile_ms.Server     # ASP.NET Core Web API backend
├── newsclip_personal_profile_ms.sln        # Visual Studio solution
└── .gitignore                               # Git ignore rules
```

---

## Prerequisites

Ensure the following are installed:

| Tool            | Version      | Description                     |
|-----------------|--------------|---------------------------------|
| .NET SDK        | **8.0+**      | Required to run the backend     |
| Visual Studio   | **2022+**     | Or JetBrains Rider              |
| Node.js         | **v18+**      | Required to build the frontend  |
| npm             | Bundled with Node | Used to install dependencies   |
| SQL Server      | LocalDB or Express | *(Optional)* for database ops |

---

## Setup Instructions

Follow these steps after cloning:

### 1. Clone the repository
```bash
git clone https://github.com/ArmandMetal-22/newsclip-personal-profile-ms.git
cd newsclip-personal-profile-ms
```

### 2. Install frontend dependencies
```bash
cd newsclip_personal_profile_ms.client
npm install
```

### 3. Open the project in Visual Studio
- Open `newsclip_personal_profile_ms.sln`
- Right-click `newsclip_personal_profile_ms.Server` → **Set as Startup Project**

### 4. Run the app
- Press `F5` or click the **Run** button
- The React frontend will auto-proxy through the backend. If not auto proxy, open at:

[https://localhost:7096](https://localhost:57713)

---

## Database Information

If your project uses a database:

- The app uses Entity Framework Core.
- Tables will auto-create on first run if `EnsureCreated()` is enabled in `Program.cs`.

If not using a database yet, the app runs in memory and persists nothing between restarts.

---

## Development Notes

- **React (Vite)**: frontend is built with modern tooling and supports hot reload.
- **ASP.NET Core**: backend serves as a Web API and hosts the React dev server via proxy during development.
- **No DLLs, bin/, obj/, or node_modules/** are committed — all are excluded via `.gitignore`.

---

## 🙋 Contact

This project was submitted for academic purposes.

For questions or issues, contact:


**Email:** armandmet22@gmail.com

---

## License

MIT or Academic Use Only — customize this section if needed.
