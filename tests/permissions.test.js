const test = require('node:test');
const assert = require('node:assert/strict');

// Simulated access control policies reflecting the PostgreSQL RLS rules
function is_admin(user) {
  return user && user.role === 'admin' && user.status === 'active';
}

function can_access_class(user, classId, classTeachers, enrollments) {
  if (is_admin(user)) return true;
  if (user.role === 'teacher') {
    return classTeachers.some((ct) => ct.teacher_id === user.id && ct.class_id === classId);
  }
  if (user.role === 'student') {
    return enrollments.some((e) => e.student_id === user.id && e.class_id === classId && e.status === 'active');
  }
  return false;
}

function can_read_submission(user, submission, classTeachers) {
  if (is_admin(user)) return true;
  if (user.role === 'student') {
    return submission.student_id === user.id;
  }
  if (user.role === 'teacher') {
    return classTeachers.some(
      (ct) => ct.teacher_id === user.id && ct.class_id === submission.class_id
    );
  }
  return false;
}

function can_read_quiz_answer_keys(user) {
  // Hard Rule: Quiz answer keys are NEVER exposed directly to students
  if (user.role === 'student') return false;
  return is_admin(user) || user.role === 'teacher';
}

function can_elevate_role(currentUser, targetUserId, newRole) {
  // Only an active admin can change roles
  if (!is_admin(currentUser)) return false;
  return ['admin', 'teacher', 'student'].includes(newRole);
}

test('Permissions: Admin has full access to all classes and submissions', () => {
  const adminUser = { id: 'admin-1', role: 'admin', status: 'active' };
  const classTeachers = [{ class_id: 'class-1', teacher_id: 'teacher-1' }];
  const enrollments = [{ class_id: 'class-1', student_id: 'student-1', status: 'active' }];

  assert.equal(can_access_class(adminUser, 'class-1', classTeachers, enrollments), true);
  assert.equal(can_access_class(adminUser, 'unrelated-class', classTeachers, enrollments), true);
  assert.equal(can_read_submission(adminUser, { student_id: 'student-1', class_id: 'class-1' }, classTeachers), true);
  assert.equal(can_read_quiz_answer_keys(adminUser), true);
});

test('Permissions: Teacher can only access assigned classes and cannot access unrelated classes', () => {
  const teacherUser = { id: 'teacher-1', role: 'teacher', status: 'active' };
  const classTeachers = [{ class_id: 'class-assigned', teacher_id: 'teacher-1' }];
  const enrollments = [];

  assert.equal(can_access_class(teacherUser, 'class-assigned', classTeachers, enrollments), true);
  assert.equal(can_access_class(teacherUser, 'class-unassigned', classTeachers, enrollments), false);
  assert.equal(can_read_quiz_answer_keys(teacherUser), true);
});

test('Permissions: Student cannot access other students private submissions or answer keys', () => {
  const student1 = { id: 'student-1', role: 'student', status: 'active' };
  const student2 = { id: 'student-2', role: 'student', status: 'active' };
  const classTeachers = [{ class_id: 'class-1', teacher_id: 'teacher-1' }];

  const sub1 = { student_id: 'student-1', class_id: 'class-1' };
  const sub2 = { student_id: 'student-2', class_id: 'class-1' };

  // Student 1 can read own submission
  assert.equal(can_read_submission(student1, sub1, classTeachers), true);
  // Student 1 CANNOT read student 2 submission
  assert.equal(can_read_submission(student1, sub2, classTeachers), false);

  // Student CANNOT read answer keys
  assert.equal(can_read_quiz_answer_keys(student1), false);
  assert.equal(can_read_quiz_answer_keys(student2), false);
});

test('Permissions: Student cannot elevate their own role to Admin or Teacher', () => {
  const studentUser = { id: 'student-1', role: 'student', status: 'active' };

  assert.equal(can_elevate_role(studentUser, studentUser.id, 'admin'), false);
  assert.equal(can_elevate_role(studentUser, studentUser.id, 'teacher'), false);

  const adminUser = { id: 'admin-1', role: 'admin', status: 'active' };
  assert.equal(can_elevate_role(adminUser, 'student-1', 'teacher'), true);
});
