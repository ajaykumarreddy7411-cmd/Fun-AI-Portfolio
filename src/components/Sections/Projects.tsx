import React, { useState, useEffect } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const cached = localStorage.getItem('portfolio-repos-cache');
        const cachedTime = localStorage.getItem('portfolio-repos-time');
        
        // Cache for 1 hour
        if (cached && cachedTime && (Date.now() - parseInt(cachedTime)) < 3600000) {
          setRepos(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const res = await fetch('https://api.github.com/users/ajaykumarreddy7411-cmd/repos?sort=updated&per_page=10');
        if (!res.ok) throw new Error('Failed to fetch from GitHub API');
        
        const data = await res.json();
        
        // Filter out forks and sort by stars/custom priority
        let filtered = data.filter((r: any) => !r.fork);
        // sort by stars
        filtered.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
        
        const topRepos = filtered.slice(0, 6);
        
        setRepos(topRepos);
        localStorage.setItem('portfolio-repos-cache', JSON.stringify(topRepos));
        localStorage.setItem('portfolio-repos-time', Date.now().toString());
      } catch (err) {
        setError('Failed to load repositories. Please check github.com/ajaykumarreddy7411-cmd');
      } finally {
        setLoading(false);
      }
    };

    // Simulate longer loading for dramatic effect
    const timer = setTimeout(() => {
      fetchRepos();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

  if (loading) {
    return (
      <div className="text-cyan-300">
        <div className="text-fuchsia-400 font-bold mb-2">[AI AGENT] Connect to GitHub API...</div>
        <div>[████░░░░░░░░░░] 40% - Authenticating...</div>
        <div className="animate-pulse mt-2">Fetching repository data...</div>
      </div>
    );
  }

  return (
    <div className="my-2">
      <div className="text-fuchsia-400 font-bold mb-2">
        [AI AGENT] Scan complete. Found {repos.length} key projects:
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo, i) => (
          <div key={repo.id} className="border border-cyan-500/30 p-3 hover:bg-cyan-500/10 transition-colors">
            <div className="text-yellow-400 font-bold">{i + 1}. {repo.name}</div>
            <div className="flex gap-4 text-xs my-1 text-cyan-200">
              {repo.stargazers_count > 0 && <span>⭐ {repo.stargazers_count}</span>}
              {repo.forks_count > 0 && <span>🍴 {repo.forks_count}</span>}
              {repo.language && <span>📝 {repo.language}</span>}
            </div>
            <div className="text-sm text-gray-300 mb-2 whitespace-normal break-words">
              {repo.description || 'No description provided.'}
            </div>
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noreferrer"
              className="text-[#00ff00] hover:underline"
            >
              → View Source
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
