const test = require('node:test');
const assert = require('node:assert/strict');

// Business Rule 1: Score range validation
function validateScore(score, maxScore = 100) {
  if (typeof score !== 'number' || Number.isNaN(score)) return false;
  return score >= 0 && score <= maxScore;
}

// Business Rule 2: Objective Quiz Auto-grading
function autoGradeQuiz(responses, secureAnswerKeys, questionPoints) {
  let totalScore = 0;
  for (const [qId, selectedOption] of Object.entries(responses)) {
    const key = secureAnswerKeys[qId];
    if (key && key.correct_option_id === selectedOption) {
      totalScore += questionPoints[qId] || 0;
    }
  }
  return totalScore;
}

// Business Rule 3: Attempt limit enforcement
function canStartAttempt(currentAttemptsCount, maxAttempts = 1) {
  return currentAttemptsCount < maxAttempts;
}

// Business Rule 4: Idempotent XP granting
class XpManager {
  constructor() {
    this.events = new Map();
  }

  grantXp(studentId, delta, idempotencyKey) {
    if (this.events.has(idempotencyKey)) {
      return { success: true, duplicate: true, delta: 0 };
    }
    this.events.set(idempotencyKey, { studentId, delta });
    return { success: true, duplicate: false, delta };
  }

  getTotalXp(studentId) {
    let sum = 0;
    for (const evt of this.events.values()) {
      if (evt.studentId === studentId) sum += evt.delta;
    }
    return sum;
  }
}

// Business Rule 5: Level calculation
function calculateLevel(xp) {
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;
  const currentLevelBase = (level - 1) * (level - 1) * 100;
  const nextLevelBase = level * level * 100;
  const xpInLevel = xp - currentLevelBase;
  const xpNeeded = nextLevelBase - currentLevelBase;
  const progress = Math.min(100, Math.max(0, Math.round((xpInLevel / (xpNeeded || 1)) * 100)));
  return { level, currentXp: xpInLevel, nextLevelXp: xpNeeded, progress };
}

test('Business Rules: Score validation respects 0 <= score <= max_score', () => {
  assert.equal(validateScore(95, 100), true);
  assert.equal(validateScore(0, 100), true);
  assert.equal(validateScore(100, 100), true);
  assert.equal(validateScore(-5, 100), false);
  assert.equal(validateScore(105, 100), false);
  assert.equal(validateScore('invalid', 100), false);
});

test('Business Rules: Objective quiz auto-grading correctly calculates score against server keys', () => {
  const answerKeys = {
    'q-1': { correct_option_id: 'A' },
    'q-2': { correct_option_id: 'C' },
  };
  const points = { 'q-1': 50, 'q-2': 50 };

  // All correct
  assert.equal(autoGradeQuiz({ 'q-1': 'A', 'q-2': 'C' }, answerKeys, points), 100);
  // One correct
  assert.equal(autoGradeQuiz({ 'q-1': 'A', 'q-2': 'B' }, answerKeys, points), 50);
  // Zero correct
  assert.equal(autoGradeQuiz({ 'q-1': 'D', 'q-2': 'B' }, answerKeys, points), 0);
});

test('Business Rules: Attempt limit prevents exceeding maximum allowed attempts', () => {
  assert.equal(canStartAttempt(0, 2), true);
  assert.equal(canStartAttempt(1, 2), true);
  assert.equal(canStartAttempt(2, 2), false); // Exceeded
  assert.equal(canStartAttempt(3, 2), false);
});

test('Business Rules: Idempotent XP granting prevents duplicate awards on repeated triggers', () => {
  const manager = new XpManager();
  const key = 'xp_asg_123_student_456';

  // First trigger: grants XP
  const r1 = manager.grantXp('student-1', 150, key);
  assert.equal(r1.duplicate, false);
  assert.equal(r1.delta, 150);
  assert.equal(manager.getTotalXp('student-1'), 150);

  // Duplicate trigger with same idempotency key: rejected duplicate
  const r2 = manager.grantXp('student-1', 150, key);
  assert.equal(r2.duplicate, true);
  assert.equal(r2.delta, 0);
  assert.equal(manager.getTotalXp('student-1'), 150);
});

test('Business Rules: Level math calculates correct level and progression', () => {
  const l0 = calculateLevel(0);
  assert.equal(l0.level, 1);
  assert.equal(l0.progress, 0);

  const l150 = calculateLevel(150);
  assert.equal(l150.level, 2); // sqrt(1.5) + 1 = 2
  assert.ok(l150.progress > 0 && l150.progress <= 100);
});

