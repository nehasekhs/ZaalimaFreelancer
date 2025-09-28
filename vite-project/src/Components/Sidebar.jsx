import React from 'react';
import './dashboard.css';
import { NavLink } from 'react-router-dom';


function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className='dashboard-container'>
    <div className="sidebar">
      <h2>Freelancer Dashboard</h2>
      <div className='dashboard-content'>
      <ul>
        <li className={activeTab==='profile' ? 'active' : ''} ><NavLink to ="/freelancer/profile" onClick={() => setActiveTab('profile')} className={({isActive}) => isActive ? 'nav-active':''}>Profile</NavLink></li>
        <li className={activeTab==='find-work' ? 'active' : ''}><NavLink to ="/freelancer/find-work" onClick={() => setActiveTab('find-work')} className={({isActive}) => isActive ? 'nav-active':''}>Find Work</NavLink> </li>
        <li className={activeTab==='proposals' ? 'active' : ''}><NavLink to ="/freelancer/proposals" onClick={() => setActiveTab('proposals')} className={({isActive}) => isActive ? 'nav-active':''}>Proposals</NavLink> </li>
        <li className={activeTab==='messages' ? 'active' : ''}><NavLink to ="/freelancer/messages" onClick={() => setActiveTab('messages')} className={({isActive}) => isActive ? 'nav-active':''}>Messages</NavLink> </li>
        <li className={activeTab==='wallet' ? 'active' : ''}><NavLink to ="/freelancer/wallet" onClick={() => setActiveTab('wallet')} className={({isActive}) => isActive ? 'nav-active':''}>Wallet</NavLink> </li>
        <li className={activeTab==='reports' ? 'active' : ''}><NavLink to ="/freelancer/reports" onClick={() => setActiveTab('reports')} className={({isActive}) => isActive ? 'nav-active':''}>Reports</NavLink> </li>
        <li className={activeTab==='messages' ? 'active' : ''}><NavLink to ="/freelancer/settings" onClick={() => setActiveTab('settings')} className={({isActive}) => isActive ? 'nav-active':''}>Settings</NavLink> </li>
      </ul>
      </div>
    </div>
    </div>
  );
}

export default Sidebar;