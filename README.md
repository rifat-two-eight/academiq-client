## 🎓 AcademIQ

A full-stack web application for managing and exploring online courses. Users can register, enroll in limited-seat courses, and manage their learning journey in an intuitive and responsive UI.

## 🌐 Live URL

🔗 [https://academiq-dfb4c.web.app]

## 🛠️ Purpose

The purpose of AcademIQ is to create a user-friendly platform where:

- Users can browse and enroll in courses.
- Admins/instructors can add, edit, and manage their own courses.
- The platform handles real-time seat availability and enrollment logic securely using MongoDB and Node.js.

## ✨ Key Features

- 🔐 **Authentication** with Firebase (Register/Login)
- 👤 **User Role Management** (Instructor & Student features)
- 📚 **Course Enrollment System** with:
  - Seat limits per course
  - Enroll/Unenroll toggle
  - Max 3 enrollments per user
- 🧮 **Live seat count updates**
- 📋 **Manage My Courses** & **My Enrollments**
- 🧑‍🏫 **Meet the Instructors** animated section
- 📊 **Popular Courses** based on highest enrollments
- 🧾 **CRUD operations** on courses with confirmation modals
- 🌙 **Responsive & Themed Design**

## 📦 Technologies & NPM Packages Used

## 🔧 Frontend (React + Tailwind CSS)

- [`react-router-dom`](https://www.npmjs.com/package/react-router-dom)
- [`axios`](https://www.npmjs.com/package/axios)
- [`firebase`](https://www.npmjs.com/package/firebase)
- [`sweetalert2`](https://www.npmjs.com/package/sweetalert2)
- [`framer-motion`](https://www.npmjs.com/package/framer-motion)
- [`lottie-react`](https://www.npmjs.com/package/lottie-react)
- [`react-slick`](https://www.npmjs.com/package/react-slick)
- [`slick-carousel`](https://www.npmjs.com/package/slick-carousel)
- `tailwindcss` & `daisyui`

### 🖥️ Backend (Express + MongoDB)

- [`express`](https://www.npmjs.com/package/express)
- [`mongodb`](https://www.npmjs.com/package/mongodb)
- [`cors`](https://www.npmjs.com/package/cors)
- [`dotenv`](https://www.npmjs.com/package/dotenv)
