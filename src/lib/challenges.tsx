import React from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

// DSA CHALLENGE
export const DSA_QUESTIONS = [
  {
    question: "What is the time complexity of binary search in the worst case?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    answer: "O(log n)"
  },
  {
    question: "Which data structure uses LIFO (Last In First Out)?",
    options: ["Queue", "Stack", "Tree", "Graph"],
    answer: "Stack"
  },
  {
    question: "What is the optimal time complexity to merge two sorted arrays of size N and M?",
    options: ["O(N*M)", "O(N+M)", "O(N log M)", "O(M log N)"],
    answer: "O(N+M)"
  },
  {
    question: "Which sorting algorithm has the best worst-case time complexity?",
    options: ["Quick Sort", "Bubble Sort", "Merge Sort", "Insertion Sort"],
    answer: "Merge Sort"
  },
  {
    question: "What data structure is optimal for implementing a priority queue?",
    options: ["Array", "Linked List", "Hash Map", "Heap"],
    answer: "Heap"
  },
  {
    question: "In a Hash Table, what is the process of handling two keys hashing to the same index called?",
    options: ["Rehashing", "Collision Resolution", "Index Mapping", "Data Clashing"],
    answer: "Collision Resolution"
  },
  {
    question: "What graph traversal algorithm uses a Queue internally?",
    options: ["Depth First Search", "Breadth First Search", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
    answer: "Breadth First Search"
  },
  {
    question: "What is the space complexity of reversing a linked list in-place?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: "O(1)"
  },
  {
    question: "Which tree property ensures that the left child is smaller and the right child is greater than the parent?",
    options: ["AVL Property", "Heap Property", "Binary Search Property", "Red-Black Property"],
    answer: "Binary Search Property"
  },
  {
    question: "What algorithm paradigm does Dijkstra's shortest path algorithm follow?",
    options: ["Divide and Conquer", "Dynamic Programming", "Greedy", "Backtracking"],
    answer: "Greedy"
  }
];

export const startDSAChallenge = (): React.ReactNode => {
  const qIndex = Math.floor(Math.random() * DSA_QUESTIONS.length);
  const q = DSA_QUESTIONS[qIndex];
  
  return (
    <div className="text-yellow-400">
      <div>[DSA CHALLENGE INITIATED]</div>
      <div className="my-2">{q.question}</div>
      <div className="mb-2">
        Options:<br/>
        {q.options.map((opt, i) => (
          <div key={i}>- {opt}</div>
        ))}
      </div>
      <div className="text-cyan-400">Type your answer exactly as shown:</div>
    </div>
  );
};

export const validateDSAChallenge = (
  input: string, 
  unlockProjects: () => void, 
  setActiveChallenge: (c: any) => void,
  addAchievement: (id: string) => void
): React.ReactNode => {
  const isCorrect = DSA_QUESTIONS.some(q => q.answer.toLowerCase() === input.toLowerCase());
  
  setActiveChallenge('none');
  
  if (isCorrect) {
    unlockProjects();
    addAchievement('dsa_master');
    return (
      <div className="text-[#00ff00] font-bold">
        [SUCCESS] Answer correct. ACCESS GRANTED to Projects section.
        <br/>Type 'projects' or 'scan-github' to view.
      </div>
    );
  } else {
    return (
      <div className="text-red-500 font-bold">
        [FAILED] Incorrect answer. ACCESS DENIED. Type 'unlock projects' to try again.
      </div>
    );
  }
};

// SYSTEM DESIGN CHALLENGE
export const SD_QUESTIONS = [
  {
    question: "Design a URL shortener like bit.ly. What concept ensures identical long URLs generate unique short URLs if needed?",
    keywords: ["salt", "user id", "hash", "timestamp"]
  },
  {
    question: "How would you ensure quick data retrieval for a read-heavy application?",
    keywords: ["cache", "caching", "redis", "memcached", "cdn"]
  },
  {
    question: "What strategy would you use to distribute incoming API traffic across multiple servers?",
    keywords: ["load balancer", "load balancing", "nginx", "round robin"]
  },
  {
    question: "In a microservices architecture, how do you prevent cascading failures when one service goes down?",
    keywords: ["circuit breaker", "fallback", "timeout", "retry"]
  },
  {
    question: "What technique would you use to scale a relational database horizontally across multiple machines?",
    keywords: ["sharding", "partitioning", "read replica"]
  },
  {
    question: "How do you ensure message delivery guarantees between loosely coupled services?",
    keywords: ["message queue", "kafka", "rabbitmq", "pub/sub", "event driven"]
  },
  {
    question: "To serve static assets (images, CSS, JS) globally with low latency, what should you use?",
    keywords: ["cdn", "content delivery network", "cloudfront", "cloudflare"]
  },
  {
    question: "What architectural pattern would you use to handle bidirectional, real-time communication in a chat app?",
    keywords: ["websocket", "websockets", "socket.io", "long polling"]
  },
  {
    question: "How do you protect an API endpoint from being overwhelmed by too many requests from a single user?",
    keywords: ["rate limiting", "throttling", "token bucket"]
  },
  {
    question: "What property of distributed systems does the CAP theorem state you must trade off during a network partition?",
    keywords: ["consistency", "availability"]
  }
];

export const startSystemDesignChallenge = (): React.ReactNode => {
  const { setSdQuestionIndex } = usePortfolioStore.getState();
  const qIndex = Math.floor(Math.random() * SD_QUESTIONS.length);
  const q = SD_QUESTIONS[qIndex];
  
  setSdQuestionIndex(qIndex);
  
  return (
    <div className="text-yellow-400">
      <div>[SYSTEM DESIGN CHALLENGE INITIATED]</div>
      <div className="my-2">Scenario: {q.question}</div>
      <div className="text-cyan-400">Type your proposed solution concept:</div>
    </div>
  );
};

export const validateSystemDesignChallenge = (
  input: string,
  unlockAbout: () => void,
  setActiveChallenge: (c: any) => void,
  addAchievement: (id: string) => void
): React.ReactNode => {
  const { sdQuestionIndex } = usePortfolioStore.getState();
  const lowerInput = input.trim().toLowerCase();
  
  let isCorrect = false;
  let hint = "Consider things like Cache, Load Balancers, etc.";
  
  if (sdQuestionIndex >= 0 && sdQuestionIndex < SD_QUESTIONS.length) {
    const q = SD_QUESTIONS[sdQuestionIndex];
    isCorrect = q.keywords.some(kw => lowerInput.includes(kw));
    // Provide the first keyword as a hint if they fail
    hint = `You need to mention concepts like: '${q.keywords.join("', '")}'`;
  } else {
    // Fallback if state is lost
    isCorrect = SD_QUESTIONS.some(q => 
      q.keywords.some(kw => lowerInput.includes(kw))
    );
  }

  setActiveChallenge('none');

  if (isCorrect) {
    unlockAbout();
    addAchievement('system_architect');
    return (
      <div className="text-[#00ff00] font-bold">
        [IMPRESSIVE] Your architectural thinking is sound. ACCESS GRANTED to About section.
        <br/>Type 'about' to view.
      </div>
    );
  } else {
    return (
      <div className="text-red-500 font-bold">
        [INSUFFICIENT] Need more specific architectural concepts. <br/>
        HINT: {hint}
        <br/><br/>
        Type 'unlock about' to generate a new scenario and try again.
      </div>
    );
  }
};
