// src/store.js
import { Task } from './Task.js';

const KEY = 'awda_week6_tasks';

export function loadTasks() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.map(Task.from).filter(Boolean) : [];
  } catch (e) {
    console.warn('Failed to load tasks, resetting', e);
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks', e);
  }
}

export function clearAll() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
