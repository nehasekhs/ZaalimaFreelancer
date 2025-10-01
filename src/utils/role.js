export function isFreelancerEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return email.toLowerCase().endsWith('.co');
}

export function deriveUserType(email) {
  return isFreelancerEmail(email) ? 'freelancer' : 'client';
}

export function isFreelancer(userOrEmail) {
  if (!userOrEmail) return false;
  if (typeof userOrEmail === 'string') return isFreelancerEmail(userOrEmail);
  const email = userOrEmail.email || '';
  const userType = userOrEmail.userType;
  if (userType) return userType === 'freelancer';
  return isFreelancerEmail(email);
}

export function isClient(userOrEmail) {
  return !isFreelancer(userOrEmail);
}


