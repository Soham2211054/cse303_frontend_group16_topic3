require('dotenv').config();
const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'suicide_squad_academi',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
};

async function run(count = 10) {
  const conn = await mysql.createConnection(DB_CONFIG);
  try {
    const [students] = await conn.execute('SELECT StudentID FROM student_t LIMIT 50');
    const [courses] = await conn.execute('SELECT CourseID FROM course_t LIMIT 50');

    if (!students.length || !courses.length) {
      console.error('student_t or course_t appears empty. Please add students/courses before seeding.');
      await conn.end();
      return;
    }

    const statuses = ['In Progress', 'Completed', 'Paused'];
    const lessons = ['All Completed', 'Partial', 'Intro Only'];

    function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function randomDate() {
      const start = new Date(2022, 0, 1).getTime();
      const end = Date.now();
      const d = new Date(start + Math.random() * (end - start));
      return d.toISOString().split('T')[0];
    }

    const inserts = [];
    for (let i = 0; i < count; i++) {
      const student = students[Math.floor(Math.random() * students.length)];
      const course = courses[Math.floor(Math.random() * courses.length)];
      inserts.push([
        String(student.StudentID),
        String(course.CourseID),
        randomItem(lessons),
        Number((Math.random() * 60).toFixed(1)),
        randomDate(),
        randomItem(statuses)
      ]);
    }

    const sql = 'INSERT INTO student_progress_enrollment_t (StudentID, CourseID, LessonCompletationStatus, TimeSpend, EnrollmentDate, CurrentStatus) VALUES ?';
    const result = await conn.query(sql, [inserts]);
    console.log('Inserted', result[0].affectedRows, 'rows');
  } catch (err) {
    console.error('Seeding error:', err.message);
  } finally {
    await conn.end();
  }
}

// run when executed directly
if (require.main === module) {
  const n = parseInt(process.argv[2] || '10', 10);
  run(n).catch(err => { console.error(err); process.exit(1); });
}

module.exports = { run };
