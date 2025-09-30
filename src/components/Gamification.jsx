import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gamification = ({ userId, userType = 'client' }) => {
  const [userStats, setUserStats] = useState({
    level: 1,
    experience: 0,
    experienceToNext: 100,
    points: 0,
    achievements: [],
    badges: [],
    streak: 0,
    rank: 'Beginner'
  });
  const [recentAchievements, setRecentAchievements] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showAchievements, setShowAchievements] = useState(false);

  useEffect(() => {
    fetchUserStats();
    fetchLeaderboard();
  }, [userId]);

  const fetchUserStats = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/gamification/stats/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setUserStats(data.stats || userStats);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      // Fallback to mock data
      setUserStats({
        level: 5,
        experience: 750,
        experienceToNext: 1000,
        points: 1250,
        achievements: [
          { id: '1', name: 'First Project', description: 'Posted your first project', icon: '🎯', earnedAt: new Date().toISOString() },
          { id: '2', name: 'Top Rated', description: 'Achieved 5-star rating', icon: '⭐', earnedAt: new Date().toISOString() },
          { id: '3', name: 'Quick Responder', description: 'Responded to messages within 1 hour', icon: '⚡', earnedAt: new Date().toISOString() }
        ],
        badges: [
          { id: '1', name: 'Reliable Client', description: 'Always pays on time', icon: '💎', color: 'gold' },
          { id: '2', name: 'Great Communicator', description: 'Excellent communication skills', icon: '💬', color: 'blue' }
        ],
        streak: 7,
        rank: 'Expert'
      });
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/gamification/leaderboard`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Fallback to mock data
      setLeaderboard([
        { rank: 1, name: 'Sarah Johnson', points: 2500, level: 10, avatar: null, badge: '👑' },
        { rank: 2, name: 'Mike Chen', points: 2300, level: 9, avatar: null, badge: '🥈' },
        { rank: 3, name: 'Emily Rodriguez', points: 2100, level: 8, avatar: null, badge: '🥉' },
        { rank: 4, name: 'You', points: 1250, level: 5, avatar: null, badge: '🎯' },
        { rank: 5, name: 'Alex Thompson', points: 1100, level: 4, avatar: null, badge: '⭐' }
      ]);
    }
  };

  const getRankColor = (rank) => {
    if (rank <= 3) return 'text-yellow-400';
    if (rank <= 10) return 'text-blue-400';
    if (rank <= 25) return 'text-green-400';
    return 'text-gray-400';
  };

  const getLevelColor = (level) => {
    if (level >= 10) return 'text-purple-400';
    if (level >= 5) return 'text-blue-400';
    if (level >= 3) return 'text-green-400';
    return 'text-yellow-400';
  };

  const getBadgeColor = (color) => {
    switch (color) {
      case 'gold': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'silver': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'bronze': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'blue': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'green': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'purple': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const experiencePercentage = (userStats.experience / userStats.experienceToNext) * 100;

  return (
    <div className="space-y-6">
      {/* User Stats Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Your Progress</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Level</span>
            <span className={`text-2xl font-bold ${getLevelColor(userStats.level)}`}>
              {userStats.level}
            </span>
          </div>
        </div>

        {/* Experience Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Experience</span>
            <span>{userStats.experience} / {userStats.experienceToNext} XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${experiencePercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-pink-500 to-violet-500 h-3 rounded-full"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">{userStats.points}</div>
            <div className="text-sm text-gray-400">Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{userStats.streak}</div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{userStats.achievements.length}</div>
            <div className="text-sm text-gray-400">Achievements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{userStats.badges.length}</div>
            <div className="text-sm text-gray-400">Badges</div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Achievements</h3>
          <button
            onClick={() => setShowAchievements(!showAchievements)}
            className="text-pink-400 hover:text-pink-300 text-sm font-medium"
          >
            {showAchievements ? 'Hide' : 'View All'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userStats.achievements.slice(0, showAchievements ? userStats.achievements.length : 6).map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{achievement.name}</h4>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Earned {new Date(achievement.earnedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {userStats.badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 ${getBadgeColor(badge.color)} text-center`}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <h4 className="font-semibold text-sm">{badge.name}</h4>
              <p className="text-xs opacity-75 mt-1">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Leaderboard</h3>
        <div className="space-y-3">
          {leaderboard.map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-lg ${
                user.name === 'You' ? 'bg-pink-500/20 border border-pink-500/30' : 'bg-gray-700/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{user.badge}</span>
                  <span className={`font-bold ${getRankColor(user.rank)}`}>
                    #{user.rank}
                  </span>
                </div>
                <img
                  src={user.avatar || '/default-avatar.png'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-medium">{user.name}</div>
                  <div className="text-gray-400 text-sm">Level {user.level}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-pink-400 font-semibold">{user.points} pts</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Achievements Popup */}
      <AnimatePresence>
        {recentAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg p-4 shadow-xl z-50"
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🎉</div>
              <div>
                <div className="text-white font-semibold">Achievement Unlocked!</div>
                <div className="text-pink-100 text-sm">
                  {recentAchievements[0].name}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gamification;
