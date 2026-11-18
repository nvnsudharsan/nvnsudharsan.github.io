import React, { useEffect, useState } from 'react';
import { GoStar, GoHistory, GoGitPullRequest, GoIssueOpened, GoRepo } from 'react-icons/go';

// Reads public numbers straight from the GitHub API in the visitor's browser,
// so there is no outside stats service or access token to maintain.
const USER = 'nvnsudharsan';
const API = 'https://api.github.com';
const CACHE_KEY = 'gh-stats-v1';
const CACHE_MS = 6 * 60 * 60 * 1000; // ask GitHub at most every 6 hours per visitor

async function getJson(path) {
  const res = await fetch(`${API}/${path}`, { headers: { Accept: 'application/vnd.github+json' } });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
}

async function getOwnRepos() {
  const repos = [];
  for (let page = 1; page <= 5; page += 1) {
    const batch = await getJson(`users/${USER}/repos?per_page=100&type=owner&page=${page}`);
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos;
}

async function loadStats() {
  const [user, repos, commits, prs, issues] = await Promise.all([
    getJson(`users/${USER}`),
    getOwnRepos(),
    getJson(`search/commits?q=author:${USER}&per_page=1`),
    getJson(`search/issues?q=author:${USER}+type:pr&per_page=1`),
    getJson(`search/issues?q=author:${USER}+type:issue&per_page=1`),
  ]);
  return {
    stars: repos.filter((r) => !r.fork).reduce((sum, r) => sum + r.stargazers_count, 0),
    commits: commits.total_count,
    prs: prs.total_count,
    issues: issues.total_count,
    repos: user.public_repos,
  };
}

function readCache() {
  try {
    const saved = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (saved && Date.now() - saved.time < CACHE_MS) return saved.stats;
  } catch (e) {
    /* no storage or bad entry: fetch fresh */
  }
  return null;
}

function writeCache(stats) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), stats }));
  } catch (e) {
    /* storage unavailable: fine, just no caching */
  }
}

function GitHubStats() {
  const [stats, setStats] = useState(readCache);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (stats) return undefined;
    let cancelled = false;
    loadStats()
      .then((fresh) => {
        if (cancelled) return;
        setStats(fresh);
        writeCache(fresh);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [stats]);

  const rows = [
    [GoStar, 'Total stars', stats && stats.stars],
    [GoHistory, 'Commits', stats && stats.commits],
    [GoGitPullRequest, 'Pull requests', stats && stats.prs],
    [GoIssueOpened, 'Issues', stats && stats.issues],
    [GoRepo, 'Public repositories', stats && stats.repos],
  ];

  return (
    <a className="gh-card" href={`https://github.com/${USER}`} target="_blank" rel="noopener noreferrer">
      <div className="gh-card-title">GitHub</div>
      {failed ? (
        <p className="gh-card-note">See my work on GitHub &rarr;</p>
      ) : (
        <ul className="gh-card-list">
          {rows.map(([Icon, label, value]) => (
            <li key={label}>
              <Icon className="gh-card-icon" aria-hidden="true" />
              <span>{label}</span>
              <strong>{value == null ? '…' : value.toLocaleString()}</strong>
            </li>
          ))}
        </ul>
      )}
    </a>
  );
}

export default GitHubStats;
