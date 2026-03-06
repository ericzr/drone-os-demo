import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router';

export function AppLayout() {
  return (
    <div className="flex bg-slate-950 min-h-screen font-sans text-slate-100">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64">
        <Header />
        <main className="flex-1 overflow-auto p-8 pt-24 bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
