import {
  INITIAL_PROFILES,
  INITIAL_SUBJECTS,
  INITIAL_CLASSES,
  INITIAL_CLASS_SUBJECTS,
  INITIAL_ENROLLMENTS,
  INITIAL_COURSES,
  INITIAL_LESSONS,
  INITIAL_MATERIALS,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_QUIZZES,
  INITIAL_QUIZ_QUESTIONS,
  SECURE_ANSWER_KEYS,
  INITIAL_QUIZ_ATTEMPTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_DISCUSSIONS,
  INITIAL_DISCUSSION_REPLIES,
  INITIAL_BADGES,
  INITIAL_STUDENT_BADGES,
  INITIAL_XP_EVENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
} from './supabase/mock-data';
import {
  Profile,
  Subject,
  Class,
  ClassSubject,
  Enrollment,
  Course,
  Lesson,
  Material,
  Assignment,
  AssignmentSubmission,
  Quiz,
  QuizQuestion,
  QuizAttempt,
  QuizResponse,
  Announcement,
  Discussion,
  DiscussionReply,
  Notification,
  XPEvent,
  Badge,
  StudentBadge,
  AuditLog,
  UserRole,
} from '@/types/database';

// In-memory persistent state (persists across renders in server node process)
let profiles = [...INITIAL_PROFILES];
let subjects = [...INITIAL_SUBJECTS];
let classes = [...INITIAL_CLASSES];
let classSubjects = [...INITIAL_CLASS_SUBJECTS];
let enrollments = [...INITIAL_ENROLLMENTS];
let courses = [...INITIAL_COURSES];
let lessons = [...INITIAL_LESSONS];
let materials = [...INITIAL_MATERIALS];
let assignments = [...INITIAL_ASSIGNMENTS];
let submissions = [...INITIAL_SUBMISSIONS];
let quizzes = [...INITIAL_QUIZZES];
let quizQuestions = [...INITIAL_QUIZ_QUESTIONS];
let quizAttempts = [...INITIAL_QUIZ_ATTEMPTS];
let quizResponses: QuizResponse[] = [
  {
    id: 'resp-1',
    attempt_id: 'cccccccc-1111-aaaa-aaaa-aaaaaaaaaaaa',
    question_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01',
    response: { selected_option_id: 'A' },
    is_correct: true,
    points_awarded: 50,
    saved_at: new Date(Date.now() - 3200000).toISOString(),
  },
  {
    id: 'resp-2',
    attempt_id: 'cccccccc-1111-aaaa-aaaa-aaaaaaaaaaaa',
    question_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02',
    response: { selected_option_id: 'B' },
    is_correct: true,
    points_awarded: 50,
    saved_at: new Date(Date.now() - 3100000).toISOString(),
  },
];
let announcements = [...INITIAL_ANNOUNCEMENTS];
let discussions = [...INITIAL_DISCUSSIONS];
let discussionReplies = [...INITIAL_DISCUSSION_REPLIES];
let badges = [...INITIAL_BADGES];
let studentBadges = [...INITIAL_STUDENT_BADGES];
let xpEvents = [...INITIAL_XP_EVENTS];
let notifications = [...INITIAL_NOTIFICATIONS];
let auditLogs = [...INITIAL_AUDIT_LOGS];

// Current session user ID (defaults to student Andi Pratama for client preview, or easily switched)
let currentUserId = '00000000-0000-0000-0000-000000000004';

export const db = {
  // Profiles & Auth
  getCurrentUser(): Profile {
    return profiles.find((p) => p.id === currentUserId) || profiles[3];
  },

  setCurrentUser(userId: string) {
    const user = profiles.find((p) => p.id === userId);
    if (user) {
      currentUserId = userId;
    }
  },

  getProfiles(): Profile[] {
    return [...profiles];
  },

  getProfileById(id: string): Profile | undefined {
    return profiles.find((p) => p.id === id);
  },

  updateProfile(id: string, updates: Partial<Profile>) {
    profiles = profiles.map((p) =>
      p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p
    );
    return profiles.find((p) => p.id === id);
  },

  createUser(fullName: string, role: UserRole, email: string) {
    const newId = `user-${Date.now()}`;
    const newProfile: Profile = {
      id: newId,
      full_name: fullName,
      role,
      status: 'active',
      bio: `Akun ${role} baru untuk ${fullName}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    profiles.push(newProfile);

    // Audit log
    this.addAuditLog(currentUserId, 'CREATE_USER', 'profile', newId, {
      full_name: fullName,
      role,
      email,
    });

    return newProfile;
  },

  // Subjects
  getSubjects(): Subject[] {
    return [...subjects];
  },

  createSubject(name: string, code: string, description?: string) {
    const newSubject: Subject = {
      id: `subj-${Date.now()}`,
      name,
      code,
      description: description || null,
      icon: 'BookOpen',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    subjects.push(newSubject);
    this.addAuditLog(currentUserId, 'CREATE_SUBJECT', 'subject', newSubject.id, { name, code });
    return newSubject;
  },

  // Classes
  getClasses(user?: Profile): Class[] {
    const activeUser = user || this.getCurrentUser();
    if (activeUser.role === 'admin') {
      return [...classes];
    }
    if (activeUser.role === 'teacher') {
      const assignedClassIds = classSubjects
        .filter((cs) => cs.teacher_id === activeUser.id)
        .map((cs) => cs.class_id);
      return classes.filter((c) => assignedClassIds.includes(c.id));
    }
    // Student
    const enrolledClassIds = enrollments
      .filter((e) => e.student_id === activeUser.id && e.status === 'active')
      .map((e) => e.class_id);
    return classes.filter((c) => enrolledClassIds.includes(c.id));
  },

  getClassById(classId: string): Class | undefined {
    return classes.find((c) => c.id === classId);
  },

  createClass(name: string, academicYear: string, gradeLevel: string, description?: string) {
    const newClass: Class = {
      id: `class-${Date.now()}`,
      name,
      academic_year: academicYear,
      grade_level: gradeLevel,
      description: description || null,
      created_by: currentUserId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    classes.push(newClass);
    this.addAuditLog(currentUserId, 'CREATE_CLASS', 'class', newClass.id, { name, academicYear });
    return newClass;
  },

  // Class Subjects
  getClassSubjects(classId?: string): ClassSubject[] {
    const list = classId ? classSubjects.filter((cs) => cs.class_id === classId) : classSubjects;
    return list.map((cs) => ({
      ...cs,
      subject: subjects.find((s) => s.id === cs.subject_id),
      teacher: profiles.find((p) => p.id === cs.teacher_id),
      class: classes.find((c) => c.id === cs.class_id),
    }));
  },

  // Enrollments
  getEnrollments(classId?: string): Enrollment[] {
    const list = classId ? enrollments.filter((e) => e.class_id === classId) : enrollments;
    return list.map((e) => ({
      ...e,
      student: profiles.find((p) => p.id === e.student_id),
      class: classes.find((c) => c.id === e.class_id),
    }));
  },

  enrollStudent(classId: string, studentId: string) {
    const existing = enrollments.find((e) => e.class_id === classId && e.student_id === studentId);
    if (existing) {
      existing.status = 'active';
      return existing;
    }
    const newEnrollment: Enrollment = {
      id: `enr-${Date.now()}`,
      class_id: classId,
      student_id: studentId,
      status: 'active',
      joined_at: new Date().toISOString(),
    };
    enrollments.push(newEnrollment);
    this.addAuditLog(currentUserId, 'ENROLL_STUDENT', 'enrollment', newEnrollment.id, {
      class_id: classId,
      student_id: studentId,
    });
    return newEnrollment;
  },

  // Courses & Lessons & Materials
  getCourses(classSubjectId?: string): Course[] {
    const list = classSubjectId
      ? courses.filter((c) => c.class_subject_id === classSubjectId)
      : courses;
    return list.map((c) => ({
      ...c,
      class_subject: this.getClassSubjects().find((cs) => cs.id === c.class_subject_id),
      lessons: this.getLessons(c.id),
    }));
  },

  getCourseById(courseId: string): Course | undefined {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return undefined;
    return {
      ...course,
      class_subject: this.getClassSubjects().find((cs) => cs.id === course.class_subject_id),
      lessons: this.getLessons(course.id),
    };
  },

  createCourse(classSubjectId: string, title: string, description?: string) {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      class_subject_id: classSubjectId,
      title,
      description: description || null,
      status: 'published',
      position: courses.filter((c) => c.class_subject_id === classSubjectId).length + 1,
      created_by: currentUserId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    courses.push(newCourse);
    this.addAuditLog(currentUserId, 'CREATE_COURSE', 'course', newCourse.id, { title });
    return newCourse;
  },

  getLessons(courseId: string): Lesson[] {
    return lessons
      .filter((l) => l.course_id === courseId)
      .map((l) => ({
        ...l,
        materials: materials.filter((m) => m.lesson_id === l.id),
      }));
  },

  getLessonById(lessonId: string): Lesson | undefined {
    const l = lessons.find((item) => item.id === lessonId);
    if (!l) return undefined;
    return {
      ...l,
      materials: materials.filter((m) => m.lesson_id === l.id),
    };
  },

  createLesson(courseId: string, title: string, content: string, estimatedMinutes = 30) {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      course_id: courseId,
      title,
      content,
      position: lessons.filter((l) => l.course_id === courseId).length + 1,
      estimated_minutes: estimatedMinutes,
      status: 'published',
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    lessons.push(newLesson);
    this.addAuditLog(currentUserId, 'CREATE_LESSON', 'lesson', newLesson.id, { title });
    return newLesson;
  },

  getMaterials(lessonId?: string): Material[] {
    return lessonId ? materials.filter((m) => m.lesson_id === lessonId) : [...materials];
  },

  createMaterial(
    lessonId: string,
    title: string,
    materialType: Material['material_type'],
    externalUrl?: string
  ) {
    const newMat: Material = {
      id: `mat-${Date.now()}`,
      lesson_id: lessonId,
      title,
      material_type: materialType,
      external_url: externalUrl || null,
      metadata: {},
      position: materials.filter((m) => m.lesson_id === lessonId).length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    materials.push(newMat);
    return newMat;
  },

  // Assignments
  getAssignments(classSubjectId?: string): Assignment[] {
    const list = classSubjectId
      ? assignments.filter((a) => a.class_subject_id === classSubjectId)
      : assignments;

    return list.map((a) => {
      const classSub = this.getClassSubjects().find((cs) => cs.id === a.class_subject_id);
      const mySub = submissions.find(
        (s) => s.assignment_id === a.id && s.student_id === currentUserId
      );
      const subCount = submissions.filter((s) => s.assignment_id === a.id).length;
      return {
        ...a,
        class_subject: classSub,
        my_submission: mySub || null,
        submission_count: subCount,
      };
    });
  },

  getAssignmentById(id: string): Assignment | undefined {
    const a = assignments.find((item) => item.id === id);
    if (!a) return undefined;
    const classSub = this.getClassSubjects().find((cs) => cs.id === a.class_subject_id);
    const mySub = submissions.find(
      (s) => s.assignment_id === a.id && s.student_id === currentUserId
    );
    const subCount = submissions.filter((s) => s.assignment_id === a.id).length;
    return {
      ...a,
      class_subject: classSub,
      my_submission: mySub || null,
      submission_count: subCount,
    };
  },

  createAssignment(data: {
    class_subject_id: string;
    title: string;
    instructions: string;
    due_at?: string;
    max_score?: number;
    allow_late_submission?: boolean;
    submission_types?: string[];
  }) {
    const newAsg: Assignment = {
      id: `asg-${Date.now()}`,
      class_subject_id: data.class_subject_id,
      title: data.title,
      instructions: data.instructions,
      due_at: data.due_at || null,
      max_score: data.max_score || 100,
      allow_late_submission: data.allow_late_submission ?? true,
      submission_types: data.submission_types || ['text', 'file'],
      attachment_urls: [],
      status: 'published',
      published_at: new Date().toISOString(),
      created_by: currentUserId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    assignments.push(newAsg);
    this.addAuditLog(currentUserId, 'CREATE_ASSIGNMENT', 'assignment', newAsg.id, {
      title: data.title,
    });
    return newAsg;
  },

  // Submissions
  getSubmissions(assignmentId?: string): AssignmentSubmission[] {
    const list = assignmentId
      ? submissions.filter((s) => s.assignment_id === assignmentId)
      : submissions;

    return list.map((s) => ({
      ...s,
      student: profiles.find((p) => p.id === s.student_id),
      assignment: assignments.find((a) => a.id === s.assignment_id),
    }));
  },

  submitAssignment(assignmentId: string, studentId: string, textAnswer?: string, fileName?: string) {
    const existingIndex = submissions.findIndex(
      (s) => s.assignment_id === assignmentId && s.student_id === studentId
    );

    const submissionData: AssignmentSubmission = {
      id: existingIndex >= 0 ? submissions[existingIndex].id : `sub-${Date.now()}`,
      assignment_id: assignmentId,
      student_id: studentId,
      text_answer: textAnswer || null,
      file_name: fileName || null,
      submitted_at: new Date().toISOString(),
      status: 'submitted',
      score: null,
      feedback: null,
      created_at: existingIndex >= 0 ? submissions[existingIndex].created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      submissions[existingIndex] = submissionData;
    } else {
      submissions.push(submissionData);
    }

    // Award XP for submitting assignment (idempotent)
    this.grantXp(
      studentId,
      'assignment_submitted',
      assignmentId,
      150,
      `xp_asg_${assignmentId}_${studentId}`
    );

    // Notify teacher
    const asg = assignments.find((a) => a.id === assignmentId);
    if (asg && asg.created_by) {
      this.sendNotification(
        asg.created_by,
        'assignment_submission',
        'Tugas Baru Dikumpulkan',
        `Siswa telah mengumpulkan tugas "${asg.title}".`,
        `/app/teacher/assignments/${assignmentId}/submissions`
      );
    }

    return submissionData;
  },

  gradeSubmission(submissionId: string, teacherId: string, score: number, feedback?: string) {
    const sub = submissions.find((s) => s.id === submissionId);
    if (!sub) throw new Error('Submission not found');

    sub.score = score;
    sub.feedback = feedback || null;
    sub.status = 'graded';
    sub.graded_by = teacherId;
    sub.graded_at = new Date().toISOString();
    sub.updated_at = new Date().toISOString();

    // Audit log
    this.addAuditLog(teacherId, 'GRADE_ASSIGNMENT', 'assignment_submission', submissionId, {
      score,
      student_id: sub.student_id,
    });

    // Notify student
    const asg = assignments.find((a) => a.id === sub.assignment_id);
    this.sendNotification(
      sub.student_id,
      'grade_published',
      'Nilai Tugas Dipublikasikan',
      `Tugas "${asg?.title || 'Tugas'}" Anda telah dinilai: ${score}/100.`,
      `/app/student/assignments/${sub.assignment_id}`
    );

    // Check if score is 100 -> award Perfect Score badge
    if (score >= 100) {
      this.awardBadge(sub.student_id, 'PERFECT_SCORE');
    }

    return sub;
  },

  // Quizzes
  getQuizzes(classSubjectId?: string): Quiz[] {
    const list = classSubjectId
      ? quizzes.filter((q) => q.class_subject_id === classSubjectId)
      : quizzes;

    return list.map((q) => ({
      ...q,
      questions: quizQuestions.filter((qq) => qq.quiz_id === q.id),
      class_subject: this.getClassSubjects().find((cs) => cs.id === q.class_subject_id),
      my_attempts: quizAttempts.filter(
        (qa) => qa.quiz_id === q.id && qa.student_id === currentUserId
      ),
    }));
  },

  getQuizById(id: string): Quiz | undefined {
    const q = quizzes.find((item) => item.id === id);
    if (!q) return undefined;
    return {
      ...q,
      questions: quizQuestions.filter((qq) => qq.quiz_id === q.id),
      class_subject: this.getClassSubjects().find((cs) => cs.id === q.class_subject_id),
      my_attempts: quizAttempts.filter(
        (qa) => qa.quiz_id === q.id && qa.student_id === currentUserId
      ),
    };
  },

  createQuiz(data: {
    class_subject_id: string;
    title: string;
    instructions?: string;
    duration_minutes: number;
    max_attempts?: number;
    questions: Array<{
      prompt: string;
      options: Array<{ id: string; text: string }>;
      correct_option_id: string;
      points: number;
    }>;
  }) {
    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      class_subject_id: data.class_subject_id,
      title: data.title,
      instructions: data.instructions || null,
      duration_minutes: data.duration_minutes,
      opens_at: new Date().toISOString(),
      closes_at: new Date(Date.now() + 14 * 86400000).toISOString(),
      max_attempts: data.max_attempts || 1,
      show_results_at: 'immediately',
      is_published_results: true,
      status: 'published',
      published_at: new Date().toISOString(),
      created_by: currentUserId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    quizzes.push(newQuiz);

    data.questions.forEach((q, idx) => {
      const qId = `q-${Date.now()}-${idx}`;
      quizQuestions.push({
        id: qId,
        quiz_id: newQuiz.id,
        question_type: 'multiple_choice',
        prompt: q.prompt,
        options: q.options,
        points: q.points,
        position: idx + 1,
        created_at: new Date().toISOString(),
      });
      // Store answer key securely
      SECURE_ANSWER_KEYS[qId] = {
        correct_option_id: q.correct_option_id,
        explanation: 'Kunci jawaban diverifikasi guru.',
      };
    });

    this.addAuditLog(currentUserId, 'CREATE_QUIZ', 'quiz', newQuiz.id, { title: data.title });
    return newQuiz;
  },

  submitQuizAttempt(
    quizId: string,
    studentId: string,
    responses: Record<string, string> // question_id -> selected_option_id
  ) {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) throw new Error('Quiz not found');

    const previousAttempts = quizAttempts.filter(
      (qa) => qa.quiz_id === quizId && qa.student_id === studentId
    );
    if (previousAttempts.length >= quiz.max_attempts) {
      throw new Error(`Batas percobaan kuis (${quiz.max_attempts}x) telah tercapai.`);
    }

    const questions = quizQuestions.filter((qq) => qq.quiz_id === quizId);
    let totalScore = 0;
    let maxScore = 0;

    const attemptId = `attempt-${Date.now()}`;

    questions.forEach((question) => {
      maxScore += question.points;
      const selected = responses[question.id];
      const answerKey = SECURE_ANSWER_KEYS[question.id];
      const isCorrect = answerKey ? answerKey.correct_option_id === selected : false;
      const pointsAwarded = isCorrect ? question.points : 0;
      totalScore += pointsAwarded;

      quizResponses.push({
        id: `resp-${Date.now()}-${question.id}`,
        attempt_id: attemptId,
        question_id: question.id,
        response: { selected_option_id: selected },
        is_correct: isCorrect,
        points_awarded: pointsAwarded,
        saved_at: new Date().toISOString(),
      });
    });

    const attempt: QuizAttempt = {
      id: attemptId,
      quiz_id: quizId,
      student_id: studentId,
      attempt_number: previousAttempts.length + 1,
      started_at: new Date(Date.now() - 10 * 60000).toISOString(),
      submitted_at: new Date().toISOString(),
      score: totalScore,
      max_score: maxScore,
      status: 'completed',
      created_at: new Date().toISOString(),
    };
    quizAttempts.push(attempt);

    // Grant XP for completing quiz
    this.grantXp(
      studentId,
      'quiz_completed',
      quizId,
      200,
      `xp_quiz_${quizId}_${studentId}_attempt_${attempt.attempt_number}`
    );

    // If score is 100%
    if (totalScore === maxScore && maxScore > 0) {
      this.awardBadge(studentId, 'PERFECT_SCORE');
    }

    return attempt;
  },

  // Announcements
  getAnnouncements(classId?: string): Announcement[] {
    const list = classId
      ? announcements.filter((a) => a.class_id === classId || a.class_id === null)
      : announcements;

    return list.map((a) => ({
      ...a,
      author: profiles.find((p) => p.id === a.created_by),
      class: classes.find((c) => c.id === a.class_id),
    }));
  },

  createAnnouncement(title: string, body: string, classId?: string | null) {
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      class_id: classId || null,
      title,
      body,
      is_pinned: false,
      created_by: currentUserId,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    announcements.unshift(newAnn);

    this.addAuditLog(currentUserId, 'CREATE_ANNOUNCEMENT', 'announcement', newAnn.id, { title });
    return newAnn;
  },

  // Discussions
  getDiscussions(classId?: string): Discussion[] {
    const list = classId ? discussions.filter((d) => d.class_id === classId) : discussions;

    return list.map((d) => {
      const reps = discussionReplies
        .filter((r) => r.discussion_id === d.id)
        .map((r) => ({
          ...r,
          author: profiles.find((p) => p.id === r.author_id),
        }));
      return {
        ...d,
        author: profiles.find((p) => p.id === d.author_id),
        class: classes.find((c) => c.id === d.class_id),
        replies: reps,
        reply_count: reps.length,
      };
    });
  },

  createDiscussion(classId: string, title: string, body: string) {
    const newDisc: Discussion = {
      id: `disc-${Date.now()}`,
      class_id: classId,
      author_id: currentUserId,
      title,
      body,
      status: 'visible',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    discussions.unshift(newDisc);
    return newDisc;
  },

  replyDiscussion(discussionId: string, body: string) {
    const newReply: DiscussionReply = {
      id: `reply-${Date.now()}`,
      discussion_id: discussionId,
      author_id: currentUserId,
      body,
      status: 'visible',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    discussionReplies.push(newReply);
    return newReply;
  },

  // Notifications
  getNotifications(userId?: string): Notification[] {
    const targetId = userId || currentUserId;
    return notifications
      .filter((n) => n.recipient_id === targetId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  sendNotification(recipientId: string, type: string, title: string, body?: string, targetUrl?: string) {
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      recipient_id: recipientId,
      type,
      title,
      body: body || null,
      target_url: targetUrl || null,
      read_at: null,
      created_at: new Date().toISOString(),
    };
    notifications.unshift(newNotif);
    return newNotif;
  },

  markNotificationAsRead(id: string) {
    const notif = notifications.find((n) => n.id === id);
    if (notif) {
      notif.read_at = new Date().toISOString();
    }
  },

  markAllNotificationsAsRead(userId?: string) {
    const targetId = userId || currentUserId;
    notifications.forEach((n) => {
      if (n.recipient_id === targetId) {
        n.read_at = new Date().toISOString();
      }
    });
  },

  // Gamification: XP & Badges
  getXpEvents(studentId?: string): XPEvent[] {
    const targetId = studentId || currentUserId;
    return xpEvents
      .filter((e) => e.student_id === targetId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  getTotalXp(studentId?: string): number {
    const targetId = studentId || currentUserId;
    return xpEvents
      .filter((e) => e.student_id === targetId)
      .reduce((sum, e) => sum + e.xp_delta, 0);
  },

  grantXp(
    studentId: string,
    eventType: string,
    sourceId: string | null,
    xpDelta: number,
    idempotencyKey: string
  ) {
    // Check idempotency
    const existing = xpEvents.find((e) => e.idempotency_key === idempotencyKey);
    if (existing) {
      return { duplicate: true, totalXp: this.getTotalXp(studentId) };
    }

    const newEvent: XPEvent = {
      id: `xp-${Date.now()}`,
      student_id: studentId,
      event_type: eventType,
      source_id: sourceId,
      xp_delta: xpDelta,
      idempotency_key: idempotencyKey,
      created_at: new Date().toISOString(),
    };
    xpEvents.push(newEvent);

    return { duplicate: false, totalXp: this.getTotalXp(studentId) };
  },

  getBadges(): Badge[] {
    return [...badges];
  },

  getStudentBadges(studentId?: string): StudentBadge[] {
    const targetId = studentId || currentUserId;
    return studentBadges
      .filter((sb) => sb.student_id === targetId)
      .map((sb) => ({
        ...sb,
        badge: badges.find((b) => b.id === sb.badge_id),
      }));
  },

  awardBadge(studentId: string, badgeCode: string) {
    const badge = badges.find((b) => b.code === badgeCode);
    if (!badge) return;

    const existing = studentBadges.find(
      (sb) => sb.student_id === studentId && sb.badge_id === badge.id
    );
    if (existing) return;

    studentBadges.push({
      student_id: studentId,
      badge_id: badge.id,
      awarded_at: new Date().toISOString(),
    });

    if (badge.xp_bonus > 0) {
      this.grantXp(
        studentId,
        'badge_awarded',
        badge.id,
        badge.xp_bonus,
        `xp_badge_${badge.id}_${studentId}`
      );
    }
  },

  getLeaderboard(classId?: string): Array<{
    student: Profile;
    totalXp: number;
    level: number;
    rank: number;
  }> {
    const enrolledStudents = this.getEnrollments(classId).map((e) => e.student!);
    // Deduplicate
    const uniqueStudents = Array.from(new Set(enrolledStudents.map((s) => s.id)))
      .map((id) => enrolledStudents.find((s) => s.id === id)!)
      .filter(Boolean);

    const scores = uniqueStudents.map((student) => {
      const totalXp = this.getTotalXp(student.id);
      const level = Math.floor(Math.sqrt(totalXp / 100)) + 1;
      return { student, totalXp, level };
    });

    scores.sort((a, b) => b.totalXp - a.totalXp);

    return scores.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  },

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return auditLogs
      .map((log) => ({
        ...log,
        actor: profiles.find((p) => p.id === log.actor_id),
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  addAuditLog(
    actorId: string,
    action: string,
    entityType: string,
    entityId: string,
    metadata: Record<string, any> = {}
  ) {
    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      actor_id: actorId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata,
      created_at: new Date().toISOString(),
    };
    auditLogs.unshift(log);
    return log;
  },
};

