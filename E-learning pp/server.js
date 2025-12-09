require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'suicide_squad_academi',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
};

async function getConnection() {
  return mysql.createConnection(DB_CONFIG);
}

// Basic health check
app.get('/api/health', async (req, res) => {
  try {
    const conn = await getConnection();
    await conn.end();
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /api/enrollments?studentId=123
app.get('/api/enrollments', async (req, res) => {
  const studentId = req.query.studentId;

  try {
    const conn = await getConnection();
    let [rows] = [];

    if (studentId) {
      [rows] = await conn.execute(
        'SELECT * FROM student_progress_enrollment_t WHERE StudentID = ?',
        [String(studentId)]
      );
    } else {
      [rows] = await conn.execute('SELECT * FROM student_progress_enrollment_t');
    }

    await conn.end();

    // return rows as-is; front-end will map fields
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// A POST endpoint to run the seeder (disabled by default in env for safety)
app.post('/api/seed-enrollments', async (req, res) => {
  if (process.env.ALLOW_SEED !== 'true') {
    return res.status(403).json({ error: 'Seeder is disabled. Set ALLOW_SEED=true in .env to enable.' });
  }

  const count = parseInt(req.query.count || '10', 10);

  try {
    const conn = await getConnection();

    // Basic checks
    const [students] = await conn.execute('SELECT StudentID FROM student_t LIMIT 50');
    const [courses] = await conn.execute('SELECT CourseID FROM course_t LIMIT 50');

    if (!students.length || !courses.length) {
      await conn.end();
      return res.status(400).json({ error: 'student_t or course_t table appears empty. Seed them first or adjust seeder.' });
    }

    const inserts = [];

    const statuses = ['In Progress', 'Completed', 'Paused'];
    const lessons = ['All Completed', 'Partial', 'Intro Only'];

    function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function randomDate() {
      const start = new Date(2022, 0, 1).getTime();
      const end = Date.now();
      const d = new Date(start + Math.random() * (end - start));
      return d.toISOString().split('T')[0];
    }

    for (let i = 0; i < count; i++) {
      const student = students[Math.floor(Math.random() * students.length)];
      const course = courses[Math.floor(Math.random() * courses.length)];
      const LessonCompletationStatus = randomItem(lessons);
      const TimeSpend = Number((Math.random() * 60).toFixed(1));
      const EnrollmentDate = randomDate();
      const CurrentStatus = randomItem(statuses);

      inserts.push([
        String(student.StudentID),
        String(course.CourseID),
        LessonCompletationStatus,
        TimeSpend,
        EnrollmentDate,
        CurrentStatus
      ]);
    }

    // Insert all
    const sql = 'INSERT INTO student_progress_enrollment_t (StudentID, CourseID, LessonCompletationStatus, TimeSpend, EnrollmentDate, CurrentStatus) VALUES ?';
    await conn.query(sql, [inserts]);
    await conn.end();

    res.json({ ok: true, inserted: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(PORT, () => console.log(`API server listening on port ${PORT}`));
