import React, { useEffect, useState } from 'react';
import { GoStar, GoHistory, GoGitPullRequest, GoIssueOpened, GoRepo } from 'react-icons/go';

// Reads public numbers straight from the GitHub API in the visitor's browser,
// so there is no outside stats service or access token to maintain.
const USER = 'nvnsudharsan';
const API = 'https://api.github.com';
const CACHE_KEY = 'gh-stats-v2';
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

// Grade: same formula as github-readme-stats (src/calculateRank.js), all-commits mode.
// Weighted CDFs of commits, PRs, issues, reviews, stars and followers give a percentile;
// lower is better, and the ring shows 100 minus that percentile.
const expCdf = (x) => 1 - 2 ** -x;
const logNormCdf = (x) => x / (1 + x);
function calculateRank({ commits, prs, issues, reviews, stars, followers }) {
  const score =
    2 * expCdf(commits / 1000) +
    3 * expCdf(prs / 50) +
    1 * expCdf(issues / 25) +
    1 * expCdf(reviews / 2) +
    4 * logNormCdf(stars / 50) +
    1 * logNormCdf(followers / 10);
  const percentile = (1 - score / 12) * 100;
  const thresholds = [1, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
  const levels = ['S', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];
  return { level: levels[thresholds.findIndex((t) => percentile <= t)], percentile };
}

async function loadStats() {
  const [user, repos, commits, prs, issues, reviews] = await Promise.all([
    getJson(`users/${USER}`),
    getOwnRepos(),
    getJson(`search/commits?q=author:${USER}&per_page=1`),
    getJson(`search/issues?q=author:${USER}+type:pr&per_page=1`),
    getJson(`search/issues?q=author:${USER}+type:issue&per_page=1`),
    getJson(`search/issues?q=type:pr+reviewed-by:${USER}&per_page=1`),
  ]);
  const stats = {
    stars: repos.filter((r) => !r.fork).reduce((sum, r) => sum + r.stargazers_count, 0),
    commits: commits.total_count,
    prs: prs.total_count,
    issues: issues.total_count,
    reviews: reviews.total_count,
    followers: user.followers,
    repos: user.public_repos,
  };
  return { ...stats, rank: calculateRank(stats) };
}

function GradeRing({ rank }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const filled = rank ? (100 - rank.percentile) / 100 : 0;
  return (
    <div className="gh-grade" title={rank ? `Top ${rank.percentile.toFixed(1)}% (github-readme-stats rank)` : ''}>
      <svg viewBox="0 0 80 80" width="88" height="88" aria-hidden="true">
        <circle className="gh-grade-track" cx="40" cy="40" r={radius} />
        <circle
          className="gh-grade-fill"
          cx="40"
          cy="40"
          r={radius}
          strokeDasharray={`${circumference * filled} ${circumference}`}
          transform="rotate(-90 40 40)"
        />
        <text className="gh-grade-letter" x="40" y="40" textAnchor="middle" dominantBaseline="central">
          {rank ? rank.level : '…'}
        </text>
      </svg>
      <span className="gh-grade-caption">{rank ? `Top ${Math.round(rank.percentile)}%` : 'Grade'}</span>
    </div>
  );
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
        <div className="gh-card-body">
          <ul className="gh-card-list">
            {rows.map(([Icon, label, value]) => (
              <li key={label}>
                <Icon className="gh-card-icon" aria-hidden="true" />
                <span>{label}</span>
                <strong>{value == null ? '…' : value.toLocaleString()}</strong>
              </li>
            ))}
          </ul>
          <GradeRing rank={stats && stats.rank} />
        </div>
      )}
    </a>
  );
}

export default GitHubStats;
