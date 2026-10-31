"use client";

import { useState, useEffect, useId } from "react";
import { useState, useEffect, useRef } from "react";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: "General" | "Work" | "Personal" | "Fitness" | "Urgent";
  dueDate?: string;
  createdAt: string;
}
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: "General" | "Work" | "Personal" | "Fitness" | "Urgent";
  dueDate?: string;
  createdAt: string;
}

const INITIAL_TODOS: Todo[] = [
  {
    id: "task-1",
    title: "Morning 30-minute cardio & stretching",
    description: "Start the day with warm-up stretches followed by 20 min HIIT cardio session.",
    completed: false,
    priority: "high",
    category: "Fitness",
    dueDate: "2026-10-30",
    createdAt: "2026-10-29",
  },
  {
    id: "task-2",
    title: "Review daily meal prep & calorie intake",
    description: "Log breakfast, plan high-protein lunch, and ensure at least 2.5L water consumption.",
    completed: true,
    priority: "medium",
    category: "Personal",
    dueDate: "2026-10-29",
    createdAt: "2026-10-28",
  },
  {
    id: "task-3",
    title: "Team sprint alignment meeting",
    description: "Review progress on weekly deliverables and update Jira backlog items.",
    completed: false,
    priority: "medium",
    category: "Work",
    dueDate: "2026-10-31",
    createdAt: "2026-10-29",
  },
];
const INITIAL_TODOS: Todo[] = [
  {
    id: "task-1",
    title: "Morning 30-minute cardio & stretching",
    description: "Start the day with warm-up stretches followed by 20 min HIIT cardio session.",
    completed: false,
    priority: "high",
    category: "Fitness",
    dueDate: "2026-10-30",
    createdAt: "2026-10-29T07:30:00.000Z",
  },
  {
    id: "task-2",
    title: "Review daily meal prep & calorie intake",
    description: "Log breakfast, plan high-protein lunch, and ensure at least 2.5L water consumption.",
    completed: true,
    priority: "medium",
    category: "Personal",
    dueDate: "2026-10-29",
    createdAt: "2026-10-28T12:00:00.000Z",
  },
  {
    id: "task-3",
    title: "Team sprint alignment meeting",
    description: "Review progress on weekly deliverables and update Jira backlog items.",
    completed: false,
    priority: "medium",
    category: "Work",
    dueDate: "2026-10-31",
    createdAt: "2026-10-29T09:00:00.000Z",
  },
];

const CATEGORIES: Array<Todo["category"]> = ["General", "Work", "Personal", "Fitness", "Urgent"];
const PRIORITIES: Array<Todo["priority"]> = ["low", "medium", "high"];
const CATEGORIES: Array<Todo["category"]> = ["General", "Work", "Personal", "Fitness", "Urgent"];
const PRIORITIES: Array<Todo["priority"]> = ["low", "medium", "high"];

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  export default function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
    const [isLoaded, setIsLoaded] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Form State for creating a new todo
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPriority, setNewPriority] = useState<Todo["priority"]>("medium");
    const [newCategory, setNewCategory] = useState<Todo["category"]>("General");
    const [newDueDate, setNewDueDate] = useState("");
    const [isFormExpanded, setIsFormExpanded] = useState(false);
    // Form State for creating a new todo
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPriority, setNewPriority] = useState<Todo["priority"]>("medium");
    const [newCategory, setNewCategory] = useState<Todo["category"]>("General");
    const [newDueDate, setNewDueDate] = useState("");
    const [isFormExpanded, setIsFormExpanded] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Filter & Search & Sort state
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "completed">("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<"newest" | "oldest" | "priority">("newest");
    // Filter & Search & Sort state
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "completed">("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<"newest" | "oldest" | "priority">("newest");

    // Editing State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPriority, setEditPriority] = useState<Todo["priority"]>("medium");
    const [editCategory, setEditCategory] = useState<Todo["category"]>("General");
    const [editDueDate, setEditDueDate] = useState("");
    // Editing State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPriority, setEditPriority] = useState<Todo["priority"]>("medium");
    const [editCategory, setEditCategory] = useState<Todo["category"]>("General");
    const [editDueDate, setEditDueDate] = useState("");
    const [editError, setEditError] = useState<string | null>(null);

    // Load todos from localStorage on mount
    useEffect(() => {
      try {
        const stored = localStorage.getItem("fitnessapp_todos");
        if (stored) {
          setTodos(JSON.parse(stored));
        } else {
          setTodos(INITIAL_TODOS);
          // Load todos from localStorage safely on client mount
          useEffect(() => {
            try {
              const stored = localStorage.getItem("fitnessapp_todos");
              if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  setTodos(parsed);
                }
              } catch {
                setTodos(INITIAL_TODOS);
              } finally {
                setIsLoaded(true);
              }
            }, []);
        } catch (err) {
          console.warn("Could not load todos from localStorage:", err);
        } finally {
          setIsLoaded(true);
        }
      }, []);

    // Save todos to localStorage on change
    useEffect(() => {
      if (isLoaded) {
        localStorage.setItem("fitnessapp_todos", JSON.stringify(todos));
      }
    }, [todos, isLoaded]);
    // Save todos to localStorage on state changes
    useEffect(() => {
      if (!isLoaded) return;
      try {
        localStorage.setItem("fitnessapp_todos", JSON.stringify(todos));
      } catch (err) {
        console.warn("Could not save todos to localStorage:", err);
      }
    }, [todos, isLoaded]);

    // CREATE Todo
    const handleAddTodo = (e: React.FormEvent) => {
      // CREATE Todo
      const handleAddTodo = (e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
        if (e) {
          e.preventDefault();
          const trimmedTitle = newTitle.trim();
          if (!trimmedTitle) return;
        }

        const newTodo: Todo = {
          id: "task-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
          title: trimmedTitle,
          description: newDescription.trim(),
          completed: false,
          priority: newPriority,
          category: newCategory,
          dueDate: newDueDate || undefined,
          createdAt: new Date().toISOString().split("T")[0],
        };
        const trimmedTitle = newTitle.trim();
        if (!trimmedTitle) {
          setFormError("Please enter a task title first!");
          inputRef.current?.focus();
          return;
        }

        setTodos((prev) => [newTodo, ...prev]);
        setNewTitle("");
        setNewDescription("");
        setNewDueDate("");
        setNewPriority("medium");
        setNewCategory("General");
        setIsFormExpanded(false);
      };
      setFormError(null);

      // UPDATE: Toggle completion status
      const handleToggleComplete = (id: string) => {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
        const now = new Date();
        const newTodo: Todo = {
          id: "task-" + Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 7),
          title: trimmedTitle,
          description: newDescription.trim(),
          completed: false,
          priority: newPriority,
          category: newCategory,
          dueDate: newDueDate || undefined,
          createdAt: now.toISOString(),
        };

        // EDIT: Start editing
        const handleStartEdit = (todo: Todo) => {
          setEditingId(todo.id);
          setEditTitle(todo.title);
          setEditDescription(todo.description);
          setEditPriority(todo.priority);
          setEditCategory(todo.category);
          setEditDueDate(todo.dueDate || "");
        };
        // Add new task to the top of list
        setTodos((prev) => [newTodo, ...prev]);

        // EDIT: Cancel editing
        const handleCancelEdit = () => {
          setEditingId(null);
        };
        // Clear form inputs
        setNewTitle("");
        setNewDescription("");
        setNewDueDate("");
        setNewPriority("medium");
        setNewCategory("General");
        setIsFormExpanded(false);

        // UPDATE: Save edit changes
        const handleSaveEdit = (id: string) => {
          const trimmed = editTitle.trim();
          if (!trimmed) return;
          // Ensure the new task is visible by resetting filters if they would hide it
          if (statusFilter === "completed") {
            setStatusFilter("all");
          }
          if (searchQuery) {
            setSearchQuery("");
          }
          if (categoryFilter !== "all" && categoryFilter !== newCategory) {
            setCategoryFilter("all");
          }
          if (priorityFilter !== "all" && priorityFilter !== newPriority) {
            setPriorityFilter("all");
          }
          setSortBy("newest");

          setTodos((prev) =>
            prev.map((t) =>
              t.id === id
                ? {
                  // Success feedback
                  setSuccessMessage(`Task "${trimmedTitle}" added!`);
    setTimeout(() => {
                    setSuccessMessage(null);
                  }, 3500);

          // Keep focus on input for fast repeated entry
          inputRef.current?.focus();
        };

        // UPDATE: Toggle completion status
        const handleToggleComplete = (id: string) => {
          setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
          );
        };

        // EDIT: Start editing
        const handleStartEdit = (todo: Todo) => {
          setEditingId(todo.id);
          setEditTitle(todo.title);
          setEditDescription(todo.description || "");
          setEditPriority(todo.priority);
          setEditCategory(todo.category);
          setEditDueDate(todo.dueDate || "");
          setEditError(null);
        };

        // EDIT: Cancel editing
        const handleCancelEdit = () => {
          setEditingId(null);
          setEditError(null);
        };

        // UPDATE: Save edit changes
        const handleSaveEdit = (id: string) => {
          const trimmed = editTitle.trim();
          if (!trimmed) {
            setEditError("Title cannot be empty.");
            return;
          }

          setTodos((prev) =>
            prev.map((t) =>
              t.id === id
                ? {
                  ...t,
                  title: trimmed,
                  description: editDescription.trim(),
                  priority: editPriority,
                  category: editCategory,
                  dueDate: editDueDate || undefined,
                }
                : t
            )
          );
          setEditingId(null);
        };
          : t
      )
    );
    setEditingId(null);
    setEditError(null);
  };

  // DELETE Todo
  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  // DELETE single Todo
  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // DELETE all completed
  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };
  // DELETE all completed
  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  // Reset to default sample tasks
  const handleResetDefaults = () => {
    setTodos(INITIAL_TODOS);
  };
  // Reset to default sample tasks
  const handleResetDefaults = () => {
    setTodos(INITIAL_TODOS);
    try {
      localStorage.setItem("fitnessapp_todos", JSON.stringify(INITIAL_TODOS));
    } catch { }
    setSuccessMessage("Loaded demo tasks!");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Filtered & Sorted items
  const filteredTodos = todos
    .filter((todo) => {
      // Search
      const matchSearch =
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;
      // Filtered & Sorted items
      const filteredTodos = todos
        .filter((todo) => {
          // Search
          const matchSearch =
            todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            todo.description.toLowerCase().includes(searchQuery.toLowerCase());
          if (!matchSearch) return false;

          // Status
          if (statusFilter === "active" && todo.completed) return false;
          if (statusFilter === "completed" && !todo.completed) return false;
          // Status
          if (statusFilter === "active" && todo.completed) return false;
          if (statusFilter === "completed" && !todo.completed) return false;

          // Category
          if (categoryFilter !== "all" && todo.category !== categoryFilter) return false;
          // Category
          if (categoryFilter !== "all" && todo.category !== categoryFilter) return false;

          // Priority
          if (priorityFilter !== "all" && todo.priority !== priorityFilter) return false;
          // Priority
          if (priorityFilter !== "all" && todo.priority !== priorityFilter) return false;

          return true;
        })
        .sort((a, b) => {
          if (sortBy === "newest") {
            return b.createdAt.localeCompare(a.createdAt);
          }
          if (sortBy === "oldest") {
            return a.createdAt.localeCompare(b.createdAt);
          }
          if (sortBy === "priority") {
            const pMap = { high: 3, medium: 2, low: 1 };
            return pMap[b.priority] - pMap[a.priority];
          }
          return 0;
        });
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        const timeA = new Date(a.createdAt).getTime() || 0;
        const timeB = new Date(b.createdAt).getTime() || 0;
        return timeB - timeA;
      }
      if (sortBy === "oldest") {
        const timeA = new Date(a.createdAt).getTime() || 0;
        const timeB = new Date(b.createdAt).getTime() || 0;
        return timeA - timeB;
      }
      if (sortBy === "priority") {
        const pMap = { high: 3, medium: 2, low: 1 };
        return pMap[b.priority] - pMap[a.priority];
      }
      return 0;
    });

  // Analytics
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  // Analytics
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  TaskFlow
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Organize, prioritize, and accomplish your daily tasks
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto space-y-7">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    TaskFlow
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Organize, prioritize, and accomplish your tasks effortlessly
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetDefaults}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Reset to default sample tasks"
                >
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetDefaults}
                      className="px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="Reset to default demo tasks"
                    >
                      Load Demo Tasks
                    </button>
                    {completedCount > 0 && (
                      <button
                        type="button"
                        onClick={handleClearCompleted}
                        className="px-3.5 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/60 transition"
                      >
                        Clear Completed ({completedCount})
                      </button>
                    )}
                  </div>
                </header>

                {/* Overview Stats Bar */}
                <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Tasks</p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{totalCount}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Pending</p>
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Pending</p>
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{pendingCount}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Completed</p>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Completed</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{completedCount}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Completion</p>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Progress</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                </section>

                {/* FEEDBACK NOTIFICATION ALERTS */}
                {successMessage && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 px-4 py-3 rounded-xl flex items-center justify-between shadow-sm animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">{successMessage}</span>
                    </div>
                    <button
                      onClick={() => setSuccessMessage(null)}
                      className="text-emerald-500 hover:text-emerald-700 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {formError && (
                  <div className="bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 px-4 py-3 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">{formError}</span>
                    </div>
                    <button
                      onClick={() => setFormError(null)}
                      className="text-rose-500 hover:text-rose-700 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* CREATE TASK SECTION */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                  <form onSubmit={handleAddTodo} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <input
                          ref={inputRef}
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="What needs to be done? (e.g., Hit 10,000 steps today)"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm font-medium"
                          onChange={(e) => {
                            setNewTitle(e.target.value);
                            if (formError) setFormError(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleAddTodo(e);
                            }
                          }}
                          placeholder="What needs to be done? (Type task title & press Enter)"
                          className={`w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm font-medium transition ${formError ? "border-rose-400 ring-1 ring-rose-400" : "border-slate-200 dark:border-slate-700/80"
                            }`}
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsFormExpanded(!isFormExpanded)}
                          className={`px-3 py-3 text-sm font-medium rounded-xl border transition flex items-center gap-1.5 ${isFormExpanded
                  className={`px-3 py-3.5 text-sm font-medium rounded-xl border transition flex items-center gap-1.5 cursor-pointer ${isFormExpanded
                            ? "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700"
                            : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-800"
                            }`}
                          title="Toggle more details like description, priority, and date"
                  }`}
                        title="Toggle optional fields: description, category, priority, due date"
                >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${isFormExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span>{isFormExpanded ? "Simple" : "Details"}</span>
                        <span>{isFormExpanded ? "Less" : "Options"}</span>
                      </button>

                      <button
                        type="submit"
                        disabled={!newTitle.trim()}
                        className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-sm shadow-indigo-600/30 transition flex items-center gap-2 text-sm"
                        onClick={handleAddTodo}
                        className="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold rounded-xl shadow-sm shadow-indigo-600/30 transition flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add Task</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded fields */}
                  {/* Optional / Expanded fields */}
                  {isFormExpanded && (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn">
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-3">
                          <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Add an optional detailed note or instructions..."
                            rows={2}
                            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                            Category
                          </label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value as Todo["category"])}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 text-sm"
                          >
                            {CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                            Priority
                          </label>
                          <select
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value as Todo["priority"])}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 text-sm"
                          >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                            Due Date
                          </label>
                          <input
                            type="date"
                            value={newDueDate}
                            onChange={(e) => setNewDueDate(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 text-sm"
                          />
                        </div>
                      </div>
            )}
                    </form>
        </section>

                {/* SEARCH, FILTER & SORT CONTROLS */}
                <section className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </span>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tasks..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Filter pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                      {(["all", "active", "completed"] as const).map((filter) => (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setStatusFilter(filter)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition ${statusFilter === filter
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition cursor-pointer ${statusFilter === filter
                            ? "bg-slate-900 text-white dark:bg-indigo-600 dark:text-white shadow-sm"
                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                  }`}
                >
                      {filter}
                    </button>
              ))}
                  </div>

                  {/* Secondary Select Dropdowns */}
                  {/* Dropdowns */}
                  <div className="flex items-center gap-2">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">All Categories</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">All Priorities</option>
                      {PRIORITIES.map((p) => (
                        <option key={p} value={p}>
                          {p.toUpperCase()}
                        </option>
                      ))}
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="newest">Sort: Newest</option>
                      <option value="oldest">Sort: Oldest</option>
                      <option value="priority">Sort: High Priority</option>
                    </select>
                  </div>
              </div>
            </section>

            {/* TASK LIST */}
            <section className="space-y-3">
              {filteredTodos.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-sm">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/80 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">No tasks found</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                    {searchQuery || statusFilter !== "all" || categoryFilter !== "all" || priorityFilter !== "all"
                      ? "Try clearing your search query or filters to see all tasks."
                      : "You're all caught up! Add your first task using the box above."}
                    ? "Try clearing your active filters or search query to see your tasks."
                  : "You have no tasks yet! Type a task name above and click 'Add Task'."}
                  </p>
                  {(searchQuery || statusFilter !== "all" || categoryFilter !== "all" || priorityFilter !== "all") && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setCategoryFilter("all");
                        setPriorityFilter("all");
                      }}
                      className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>
              ) : (
                filteredTodos.map((todo) => {
                  const isEditing = editingId === todo.id;

                  return (
                    <div
                      key={todo.id}
                      className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 sm:p-5 transition-all shadow-sm ${todo.completed
                        ? "border-slate-200/70 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 opacity-75"
                  className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 sm:p-5 transition-all shadow-sm ${todo.completed
                        ? "border-slate-200/70 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 opacity-75"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                  }`}
                >
                  {isEditing ? (
                    /* EDIT MODE */
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          Editing Task
                          Edit Task
                        </span>
                        {editError && <span className="text-xs font-medium text-rose-500">{editError}</span>}
                      </div>

                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-semibold text-slate-900 dark:text-white"
                        onChange={(e) => {
                          setEditTitle(e.target.value);
                          if (editError) setEditError(null);
                        }}
                        className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-semibold text-slate-900 dark:text-white"
                        placeholder="Task title"
                        autoFocus
                      />

                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-800 dark:text-slate-200"
                        className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-800 dark:text-slate-200"
                        placeholder="Task description (optional)"
                        rows={2}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                            Category
                          </label>
                          <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value as Todo["category"])}
                            className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                          >
                            {CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                            Priority
                          </label>
                          <select
                            value={editPriority}
                            onChange={(e) => setEditPriority(e.target.value as Todo["priority"])}
                            className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                          >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                            Due Date
                          </label>
                          <input
                            type="date"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      {/* Edit actions */}
                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                          className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(todo.id)}
                          disabled={!editTitle.trim()}
                          className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg shadow-sm transition"
                          className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* VIEW MODE */
                    <div className="flex items-start justify-between gap-4">
                      {/* Checkbox and content */}
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        <button
                          type="button"
                          onClick={() => handleToggleComplete(todo.id)}
                          className={`mt - 1 flex - shrink - 0 w - 5 h - 5 rounded - md border flex items - center justify - center transition - colors ${
                  todo.completed
                          className={`mt-1 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${todo.completed
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "border-slate-300 dark:border-slate-600 hover:border-indigo-500"
                    }`
                }
                          }`}
              aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
                        >
              {todo.completed && (
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3
                  onClick={() => handleToggleComplete(todo.id)}
                  className={`text-base font-semibold cursor-pointer select-none transition ${todo.completed
                              className={`text-base font-semibold cursor-pointer select-none transition ${todo.completed
                    ? "line-through text-slate-400 dark:text-slate-500"
                    : "text-slate-900 dark:text-white"
                    }`}
                              }`}
                            >
                {todo.title}
              </h3>

              {/* Category badge */}
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                {todo.category}
              </span>

              {/* Priority badge */}
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${todo.priority === "high"
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${todo.priority === "high"
                  ? "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40"
                  : todo.priority === "medium"
                    ? "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40"
                    : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40"
                  }`}
                                  ? "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40"
              : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40"
                              }`}
                            >
              {todo.priority}
            </span>
          </div>

          {todo.description && (
            <p
              className={`text-xs sm:text-sm leading-relaxed ${todo.completed
                              className={`text-xs sm:text-sm leading-relaxed ${todo.completed
                ? "text-slate-400 dark:text-slate-600 line-through"
                : "text-slate-600 dark:text-slate-400"
                }`}
                              }`}
                            >
          {todo.description}
        </p>
                          )}

        {/* Footer details: Due date & created date */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400 dark:text-slate-500">
          {todo.dueDate && (
            <span className="flex items-center gap-1 font-medium text-slate-500 dark:text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Due: {todo.dueDate}
            </span>
          )}
          <span>Created: {todo.createdAt}</span>
          <span>
            Created: {todo.createdAt.includes("T") ? todo.createdAt.split("T")[0] : todo.createdAt}
          </span>
        </div>
      </div>
    </div>

                      {/* Action buttons (Edit & Delete) */ }
  <div className="flex items-center gap-1.5 flex-shrink-0">
    {/* Edit Button */}
    <button
      type="button"
      onClick={() => handleStartEdit(todo)}
      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition"
      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition cursor-pointer"
      title="Edit Task"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </button>

    {/* Delete Button */}
    <button
      type="button"
      onClick={() => handleDeleteTodo(todo.id)}
      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition"
      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition cursor-pointer"
      title="Delete Task"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  </div>
                    </div >
                  )
}
                </div >
              );
            })
          )}
        </section >
      </div >
    </div >
    </div >
  );
  }
}
