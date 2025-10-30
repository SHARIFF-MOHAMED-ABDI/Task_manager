// src/view.js
import { escapeHTML } from './utils.js';

/**
 * Render the tasks into the provided <ul> element.
 * @param {HTMLUListElement} listEl
 * @param {Array} tasks
 * @param {'all'|'active'|'completed'} filter
 */
export function renderTasks(listEl, tasks, filter) {
  const data = tasks.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  listEl.innerHTML = data.map(t => `
    <li class="task ${t.done ? 'done' : ''}" data-id="${escapeHTML(t.id)}">
      <div class="left">
        <input type="checkbox" ${t.done ? 'checked' : ''} aria-label="Mark ${escapeHTML(t.title)} as ${t.done ? 'incomplete' : 'complete'}">
        <span class="title">${escapeHTML(t.title)}</span>
      </div>
      <button class="delete" title="Delete task" aria-label="Delete task">✕</button>
    </li>
  `).join('');
}

/**
 * Update counts text content.
 * @param {HTMLElement} countsEl
 * @param {Array} tasks
 */
export function updateCounts(countsEl, tasks) {
  const total = tasks.length;
  const active = tasks.filter(t => !t.done).length;
  const completed = tasks.filter(t => t.done).length;
  countsEl.textContent = `${total} total, ${active} active, ${completed} completed`;
}

/**
 * Highlight the active filter button.
 * @param {HTMLElement} groupEl
 * @param {'all'|'active'|'completed'} filter
 */
export function applyFilterStyles(groupEl, filter) {
  const buttons = Array.from(groupEl.querySelectorAll('button[data-filter]'));
  buttons.forEach(btn => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });
}
