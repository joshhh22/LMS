export type UserRole = 'admin' | 'teacher' | 'student';
export type UserStatus = 'active' | 'suspended' | 'pending';
export type ContentStatus = 'draft' | 'published' | 'archived' | 'closed';
export type SubmissionStatus = 'draft' | 'submitted' | 'late' | 'graded' | 'resubmitted';
export type QuizAttemptStatus = 'in_progress' | 'completed' | 'timed_out';

export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string | null;
  role: UserRole;
  status: UserStatus;
  bio?: string | null;
  phone?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  icon?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Class {
  id: string;
  name: string;
  academic_year: string;
  description?: string | null;
  grade_level?: string | null;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
  homeroom_teacher?: Profile | null;
  student_count?: number;
}

export interface ClassTeacher {
  class_id: string;
  teacher_id: string;
  is_homeroom: boolean;
  assigned_at: string;
  teacher?: Profile;
  class?: Class;
}

export interface ClassSubject {
  id: string;
  class_id: string;
  subject_id: string;
  teacher_id?: string | null;
  schedule_day?: string | null;
  schedule_time_start?: string | null;
  schedule_time_end?: string | null;
  room?: string | null;
  created_at: string;
  subject?: Subject;
  teacher?: Profile;
  class?: Class;
}

export interface Enrollment {
  id: string;
  class_id: string;
  student_id: string;
  status: 'active' | 'completed' | 'dropped';
  joined_at: string;
  student?: Profile;
  class?: Class;
}

export interface Course {
  id: string;
  class_subject_id: string;
  title: string;
  description?: string | null;
  thumbnail_url?: string | null;
  status: ContentStatus;
  position: number;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
  lessons?: Lesson[];
  class_subject?: ClassSubject;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  content?: string | null;
  position: number;
  estimated_minutes: number;
  status: ContentStatus;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  materials?: Material[];
  progress?: LessonProgress;
}

export interface Material {
  id: string;
  lesson_id: string;
  title: string;
  material_type: 'pdf' | 'video' | 'link' | 'text' | 'document' | 'audio';
  storage_path?: string | null;
  external_url?: string | null;
  file_size_bytes?: number | null;
  metadata: Record<string, any>;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  lesson_id: string;
  student_id: string;
  completed_at?: string | null;
  last_position_seconds: number;
  updated_at: string;
}

export interface Assignment {
  id: string;
  class_subject_id: string;
  title: string;
  instructions: string;
  due_at?: string | null;
  max_score: number;
  allow_late_submission: boolean;
  submission_types: string[];
  attachment_urls: string[];
  status: ContentStatus;
  published_at?: string | null;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
  class_subject?: ClassSubject;
  submission_count?: number;
  my_submission?: AssignmentSubmission | null;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  text_answer?: string | null;
  storage_path?: string | null;
  file_name?: string | null;
  file_size_bytes?: number | null;
  submitted_at: string;
  status: SubmissionStatus;
  score?: number | null;
  feedback?: string | null;
  graded_by?: string | null;
  graded_at?: string | null;
  created_at: string;
  updated_at: string;
  student?: Profile;
  assignment?: Assignment;
}

export interface Quiz {
  id: string;
  class_subject_id: string;
  title: string;
  instructions?: string | null;
  duration_minutes: number;
  opens_at?: string | null;
  closes_at?: string | null;
  max_attempts: number;
  show_results_at: 'immediately' | 'after_close' | 'manual';
  is_published_results: boolean;
  status: ContentStatus;
  published_at?: string | null;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
  questions?: QuizQuestion[];
  class_subject?: ClassSubject;
  my_attempts?: QuizAttempt[];
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_type: 'multiple_choice' | 'short_answer' | 'essay';
  prompt: string;
  options: Array<{ id: string; text: string }>;
  points: number;
  position: number;
  created_at: string;
}

export interface QuizAnswerKey {
  question_id: string;
  answer_key: {
    correct_option_id?: string;
    accepted_answers?: string[];
  };
  explanation?: string | null;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  student_id: string;
  attempt_number: number;
  started_at: string;
  submitted_at?: string | null;
  score?: number | null;
  max_score?: number | null;
  status: QuizAttemptStatus;
  created_at: string;
  responses?: QuizResponse[];
}

export interface QuizResponse {
  id: string;
  attempt_id: string;
  question_id: string;
  response: {
    selected_option_id?: string;
    text?: string;
  };
  is_correct?: boolean | null;
  points_awarded?: number | null;
  saved_at: string;
}

export interface Announcement {
  id: string;
  class_id?: string | null;
  title: string;
  body: string;
  is_pinned: boolean;
  created_by?: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
  author?: Profile;
  class?: Class;
}

export interface Discussion {
  id: string;
  class_id: string;
  lesson_id?: string | null;
  author_id?: string | null;
  title: string;
  body: string;
  status: 'visible' | 'pinned' | 'archived' | 'hidden';
  created_at: string;
  updated_at: string;
  author?: Profile;
  class?: Class;
  replies?: DiscussionReply[];
  reply_count?: number;
}

export interface DiscussionReply {
  id: string;
  discussion_id: string;
  author_id?: string | null;
  body: string;
  status: 'visible' | 'hidden';
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface Notification {
  id: string;
  recipient_id: string;
  type: string;
  title: string;
  body?: string | null;
  target_url?: string | null;
  read_at?: string | null;
  created_at: string;
}

export interface XPEvent {
  id: string;
  student_id: string;
  event_type: string;
  source_id?: string | null;
  xp_delta: number;
  idempotency_key: string;
  created_at: string;
}

export interface Badge {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  icon_key?: string | null;
  criteria: Record<string, any>;
  xp_bonus: number;
  created_at: string;
}

export interface StudentBadge {
  student_id: string;
  badge_id: string;
  awarded_at: string;
  badge?: Badge;
}

export interface AuditLog {
  id: string;
  actor_id?: string | null;
  action: string;
  entity_type: string;
  entity_id?: string | null;
  metadata: Record<string, any>;
  created_at: string;
  actor?: Profile;
}

