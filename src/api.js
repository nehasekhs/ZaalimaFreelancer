const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function handleRes(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.message || res.statusText || "Request failed";
    throw new Error(msg);
  }
  return data;
}

// Helper function to get headers with optional authentication
function getHeaders() {
  const token = localStorage.getItem('token');
  const headers = { "Content-Type": "application/json" };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return headers;
}

export async function signupApi(form) {
  const res = await fetch(`${API}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // important for httpOnly cookie
    body: JSON.stringify(form),
  });
  return handleRes(res);
}

export async function loginApi(form) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(form),
  });
  return handleRes(res);
}


export async function logoutApi() {
  const res = await fetch(`${API}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return handleRes(res);
}
export async function getProfileApi() {
  const token = localStorage.getItem("token"); // must exist
  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`${API}/api/profile`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    credentials: "include", // in case backend uses cookies too
  });

  return handleRes(res);
}

export async function updateProfileApi(updates) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const res = await fetch(`${API}/api/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    credentials: "include",
    body: JSON.stringify(updates),
  });
  return handleRes(res);
}

// Freelancer API functions
export async function getTopFreelancersApi(limit = 6) {
  const res = await fetch(`${API}/api/freelancers/top?limit=${limit}`, {
    method: "GET",
    headers: getHeaders(),
    credentials: "include",
  });
  return handleRes(res);
}

export async function getFreelancersByCategoryApi(category, limit = 10) {
  const res = await fetch(`${API}/api/freelancers/category/${category}?limit=${limit}`, {
    method: "GET",
    headers: getHeaders(),
    credentials: "include",
  });
  return handleRes(res);
}

export async function postProjectApi(projectData) {
  const res = await fetch(`${API}/api/projects`, {
    method: "POST",
    headers: getHeaders(),
    credentials: "include",
    body: JSON.stringify(projectData),
  });
  return handleRes(res);
}

// Review API functions
export async function getFreelancerReviewsApi(freelancerId, page = 1, limit = 10, sort = "newest") {
  const res = await fetch(`${API}/api/reviews/freelancer/${freelancerId}?page=${page}&limit=${limit}&sort=${sort}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return handleRes(res);
}

export async function submitReviewApi(reviewData) {
  const token = localStorage.getItem("token");
  
  const headers = { 
    "Content-Type": "application/json"
  };
  
  // Add authorization header only if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  const res = await fetch(`${API}/api/reviews`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify(reviewData),
  });
  return handleRes(res);
}

export async function updateReviewHelpfulnessApi(reviewId, isHelpful) {
  const res = await fetch(`${API}/api/reviews/${reviewId}/helpful`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ isHelpful }),
  });
  return handleRes(res);
}