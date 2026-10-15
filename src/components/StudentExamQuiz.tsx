import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Award,
  BookOpen,
  CheckSquare,
  Flame,
  Clock,
  Layers,
  ChevronRight,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LessonData {
  title: string;
  concept: string;
  audioNarration: string;
  keyPoints: string[];
  exampleProblem: string;
}

interface HomeworkTask {
  id: number;
  task: string;
  estimatedMinutes: number;
  points: number;
}

interface StudentExamQuizProps {
  lang?: string;
}

type GradeLevel = 'foundational' | 'primary' | 'middle' | 'secondary';
type SubjectKey = 'math' | 'science' | 'social' | 'english';
type LearningMode = 'lesson' | 'quiz' | 'homework';

export const StudentExamQuiz: React.FC<StudentExamQuizProps> = ({ lang = 'en' }) => {
  // Navigation & Grade States
  const [grade, setGrade] = useState<GradeLevel>('foundational');
  const [subject, setSubject] = useState<SubjectKey>('math');
  const [activeMode, setActiveMode] = useState<LearningMode>('lesson');

  // Quiz State
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // Lesson State
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [isLessonLoading, setIsLessonLoading] = useState(false);

  // Homework State
  const [homeworkTasks, setHomeworkTasks] = useState<HomeworkTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [streakCount, setStreakCount] = useState<number>(3);

  // Audio State
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 1. Fetch Quiz Questions when subject or grade changes
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/student/quiz?subject=${subject}&grade=${grade}&lang=${lang}`);
        const data = await res.json();
        if (data.success && data.questions) {
          setQuestions(data.questions);
          setCurrentIndex(0);
          setSelectedOption(null);
          setHasSubmitted(false);
          setScore(0);
          setIsQuizComplete(false);
        }
      } catch (err) {
        console.error('Error fetching quiz', err);
      }
    };

    fetchQuiz();
  }, [subject, grade, lang]);

  // 2. Fetch Daily Lesson
  useEffect(() => {
    const fetchLesson = async () => {
      setIsLessonLoading(true);
      try {
        const res = await fetch(`/api/student/lessons?subject=${subject}&grade=${grade}&lang=${lang}`);
        const data = await res.json();
        if (data.success && data.lesson) {
          setLesson(data.lesson);
        }
      } catch (err) {
        console.error('Error fetching lesson', err);
      } finally {
        setIsLessonLoading(false);
      }
    };

    fetchLesson();
  }, [subject, grade, lang]);

  // 3. Fetch Homework Tasks
  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const res = await fetch(`/api/student/homework?subject=${subject}&grade=${grade}&lang=${lang}`);
        const data = await res.json();
        if (data.success && data.tasks) {
          setHomeworkTasks(data.tasks);
          setCompletedTasks([]);
        }
      } catch (err) {
        console.error('Error fetching homework', err);
      }
    };

    fetchHomework();
  }, [subject, grade, lang]);

  // Stop speech synthesis on unmount or tab change
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeMode, grade, subject]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQ) return;
    setHasSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      setIsQuizComplete(true);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setScore(0);
    setIsQuizComplete(false);
  };

  // Unified Speech Reader for questions and lessons
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();

    const clean = text.replace(/[*#>`$]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'te' ? 'te-IN' : 'en-IN';
    utterance.rate = 0.92;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleTaskCompletion = (taskId: number) => {
    setCompletedTasks((prev) => {
      const exists = prev.includes(taskId);
      const updated = exists ? prev.filter((id) => id !== taskId) : [...prev, taskId];
      if (updated.length === homeworkTasks.length && !exists) {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        setStreakCount((s) => s + 1);
      }
      return updated;
    });
  };

  // Grade metadata definitions
  const grades = [
    {
      id: 'foundational' as const,
      label: '🐣 Classes 1–3 (From Scratch)',
      subtitle: 'Zero to Basic (Numbers, Phonics, Plants)',
      badge: 'Level 0: Foundational',
      color: 'border-amber-300 bg-amber-50 text-amber-900',
    },
    {
      id: 'primary' as const,
      label: '📘 Classes 4–5 (Primary)',
      subtitle: 'Multiplication, Fractions, Water Cycle',
      badge: 'Level 1: Primary',
      color: 'border-blue-300 bg-blue-50 text-blue-900',
    },
    {
      id: 'middle' as const,
      label: '📗 Classes 6–8 (Middle School)',
      subtitle: 'Integers, Cells, Indian Freedom',
      badge: 'Level 2: Middle',
      color: 'border-emerald-300 bg-emerald-50 text-emerald-900',
    },
    {
      id: 'secondary' as const,
      label: '🎓 Classes 9–10 (Board Exam)',
      subtitle: 'Quadratic Eqns, Light, Constitution',
      badge: 'Level 3: Board Prep',
      color: 'border-indigo-300 bg-indigo-50 text-indigo-900',
    },
  ];

  const subjects = [
    { id: 'math' as const, label: '🔢 Mathematics', telugu: 'గణితం' },
    { id: 'science' as const, label: '🔬 Science', telugu: 'సైన్స్' },
    { id: 'social' as const, label: '🌍 Social Studies', telugu: 'సాంఘిక శాస్త్రం' },
    { id: 'english' as const, label: '📖 English & Reading', telugu: 'ఇంగ్లీష్' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
      {/* 1. TOP TITLE & LEVEL-UP BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center space-x-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>NIPUN Bharat & State SCERT Aligned</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Student Learning & Exam Center: Scratch to Class 10
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-2xl">
            Designed for poor and out-of-school children to learn everything step-by-step from zero. Includes daily spoken lessons, practice exams, and daily homework.
          </p>
        </div>

        {/* Study Streak Counter */}
        <div className="flex items-center space-x-3 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl shrink-0">
          <Flame className="w-6 h-6 text-amber-500 animate-bounce" />
          <div>
            <div className="text-xs font-bold text-amber-900">Daily Study Streak</div>
            <div className="text-sm font-extrabold text-amber-700">{streakCount} Days Active 🔥</div>
          </div>
        </div>
      </div>

      {/* 2. GRADE LEVEL PROGRESSION (From Scratch to Class 10) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>Step 1: Select Student Class / Grade Level</span>
          <span className="text-indigo-600 font-semibold">Progressive Level-Up System</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {grades.map((g) => (
            <button
              key={g.id}
              onClick={() => setGrade(g.id)}
              className={`p-3 rounded-2xl border text-left transition relative ${
                grade === g.id
                  ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="text-xs sm:text-sm font-bold text-slate-900">{g.label}</div>
              <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{g.subtitle}</div>
              <div className="mt-2 inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                {g.badge}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. STRICT ACADEMIC SUBJECT TABS (No Agri, No Health!) */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Step 2: Choose Academic Subject
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setSubject(s.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-1.5 ${
                subject === s.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{s.label}</span>
              {lang === 'te' && <span className="opacity-75 text-xs font-normal">({s.telugu})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* 4. MODE SWITCHER: Daily Lessons | Practice Exam | Daily Homework */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap gap-1 text-xs font-bold">
        <button
          onClick={() => setActiveMode('lesson')}
          className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-2 ${
            activeMode === 'lesson'
              ? 'bg-white text-indigo-700 shadow-xs font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>📚 Daily Lesson (Learn from Scratch)</span>
        </button>

        <button
          onClick={() => setActiveMode('quiz')}
          className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-2 ${
            activeMode === 'quiz'
              ? 'bg-white text-blue-700 shadow-xs font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>📝 Practice Exam Quiz ({questions.length} Qs)</span>
        </button>

        <button
          onClick={() => setActiveMode('homework')}
          className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-2 ${
            activeMode === 'homework'
              ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>🎯 Daily Homework Tasks ({completedTasks.length}/{homeworkTasks.length})</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* 5A. MODE 1: DAILY LESSON (Learn Without Going to School) */}
      {/* ========================================================= */}
      {activeMode === 'lesson' && lesson && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-indigo-50/60 border border-indigo-200 rounded-3xl p-5 sm:p-7 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                  Self-Study Lesson For Out-of-School & Rural Students
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                  {lesson.title}
                </h4>
              </div>

              {/* Spoken Narration Teacher Button */}
              <button
                onClick={() => speakText(lesson.audioNarration || lesson.concept)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-xs transition shrink-0 ${
                  isSpeaking
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? 'Stop Teacher Voice' : '🔊 Listen to Teacher (గురువు మాట)'}</span>
              </button>
            </div>

            {/* Concept Explanation */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-indigo-100 shadow-2xs space-y-2">
              <div className="text-xs font-bold text-indigo-900 uppercase">Core Concept:</div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                {lesson.concept}
              </p>
            </div>

            {/* Key Bullet Points */}
            {lesson.keyPoints && lesson.keyPoints.length > 0 && (
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-indigo-100 shadow-2xs space-y-2">
                <div className="text-xs font-bold text-slate-700 uppercase">Key Takeaways to Remember:</div>
                <ul className="space-y-1.5">
                  {lesson.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Example Problem Walkthrough */}
            {lesson.exampleProblem && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs sm:text-sm text-emerald-950">
                <div className="font-bold uppercase text-[11px] text-emerald-800 mb-1">
                  💡 Solved Practice Example:
                </div>
                <div className="font-mono bg-white px-3 py-2 rounded-xl border border-emerald-100 text-emerald-900 font-semibold">
                  {lesson.exampleProblem}
                </div>
              </div>
            )}

            {/* Transition to quiz */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveMode('quiz')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 shadow-xs"
              >
                <span>Take Practice Quiz for this Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5B. MODE 2: PRACTICE EXAM & QUIZ */}
      {/* ========================================================= */}
      {activeMode === 'quiz' && (
        <div className="animate-fade-in">
          {isQuizComplete ? (
            <div className="text-center py-10 space-y-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 p-8">
              <div className="w-16 h-16 rounded-3xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">
                Great Job! Practice Exam Completed 🎉
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                You scored <span className="font-bold text-indigo-700 text-lg">{score}</span> out of{' '}
                <span className="font-bold text-slate-900 text-lg">{questions.length}</span>! Keep practicing daily to build your foundation and score high marks in school.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleRestartQuiz}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm inline-flex items-center space-x-2 transition shadow-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Practice Again</span>
                </button>
                <button
                  onClick={() => setActiveMode('homework')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm inline-flex items-center space-x-2 transition shadow-xs"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Go to Daily Homework</span>
                </button>
              </div>
            </div>
          ) : currentQ ? (
            <div className="space-y-5">
              {/* Progress and Question Counter */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-mono text-indigo-600 font-semibold uppercase">
                    {grade} • {subject}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-700">Score: {score}</span>
                  <button
                    onClick={() => speakText(`${currentQ.question}. ${currentQ.options.join(', ')}`)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                    title="Listen aloud to this question"
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* Question Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 text-slate-900 font-semibold text-base sm:text-lg leading-relaxed">
                {currentQ.question}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50/30';

                  if (hasSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-50 border-rose-500 text-rose-900';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-blue-50 border-blue-600 text-blue-900 font-bold ring-2 ring-blue-100';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={hasSubmitted}
                      className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {hasSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {hasSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {hasSubmitted && (
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm border leading-relaxed animate-fade-in ${
                    selectedOption === currentQ.correctIndex
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="font-bold mb-1">
                    {selectedOption === currentQ.correctIndex ? '🎉 Correct Answer!' : '❌ Not quite right!'}
                  </div>
                  <div>{currentQ.explanation}</div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end pt-2">
                {!hasSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-xs"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-1.5 transition shadow-xs"
                  >
                    <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'Complete Practice'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 text-sm">Loading questions...</div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 5C. MODE 3: DAILY HOMEWORK & TASK CHECKLIST */}
      {/* ========================================================= */}
      {activeMode === 'homework' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-7 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Daily Practical Assignment & Practice Challenge
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                  Today's Homework Tasks for {grades.find((g) => g.id === grade)?.label}
                </h4>
              </div>

              <div className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shrink-0">
                Completed: <span className="text-emerald-600 font-extrabold">{completedTasks.length}</span> of {homeworkTasks.length}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600">
              Complete these hands-on tasks in your notebook or with family members to maintain your daily streak and earn knowledge points!
            </p>

            {/* Task Checklist Items */}
            <div className="space-y-2.5">
              {homeworkTasks.map((t) => {
                const isDone = completedTasks.includes(t.id);
                return (
                  <div
                    key={t.id}
                    onClick={() => toggleTaskCompletion(t.id)}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-4 ${
                      isDone
                        ? 'bg-emerald-50/80 border-emerald-400 text-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition shrink-0 ${
                          isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isDone && <Check className="w-4 h-4" />}
                      </div>
                      <span className={`text-xs sm:text-sm font-medium ${isDone ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                        {t.task}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{t.estimatedMinutes}m</span>
                      </span>
                      <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                        +{t.points} pts
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Completion Banner */}
            {completedTasks.length === homeworkTasks.length && homeworkTasks.length > 0 && (
              <div className="bg-emerald-100 border border-emerald-300 rounded-2xl p-4 text-center text-emerald-900 font-bold text-xs sm:text-sm animate-fade-in">
                🎉 All homework tasks completed for today! Your study streak is now {streakCount} days!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentExamQuiz;
