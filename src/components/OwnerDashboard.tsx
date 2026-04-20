import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MessageSquare, IndianRupee, Settings, LogOut, CheckCircle, Clock } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';

// Define interfaces for future real data
interface Booking {
  id: string;
  name: string;
  room: string;
  dates: string;
  status: 'Confirmed' | 'Pending';
  price: string;
}

interface Query {
  id: string;
  name: string;
  issue: string;
  time: string;
  status: 'Open' | 'Resolved';
}

const dummyBookings: Booking[] = [];
const dummyQueries: Query[] = [];

export function OwnerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'bookings' | 'queries' | 'guests' | 'revenue'>('bookings');

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass border-r border-border/50 flex flex-col justify-between sticky top-0 md:h-screen">
        <div>
          <div className="p-6">
            <h2 className="text-2xl font-bold tracking-tighter text-primary">
              Rahul <span className="text-foreground">Admin</span>
            </h2>
          </div>
          <nav className="px-4 py-2 space-y-2">
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'bookings' ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-primary/10'}`}
            >
              <Calendar size={20} />
              <span className="font-medium">Bookings</span>
            </button>
            <button 
              onClick={() => setActiveTab('queries')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'queries' ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-primary/10'}`}
            >
              <MessageSquare size={20} />
              <span className="font-medium">Help Desk</span>
            </button>
            <button 
              onClick={() => setActiveTab('guests')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'guests' ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-primary/10'}`}
            >
              <Users size={20} />
              <span className="font-medium">Guests</span>
            </button>
            <button 
              onClick={() => setActiveTab('revenue')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'revenue' ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-primary/10'}`}
            >
              <IndianRupee size={20} />
              <span className="font-medium">Revenue</span>
            </button>
          </nav>
        </div>
        
        <div className="p-4 space-y-4 border-t border-border/50">
          <div className="flex items-center justify-between px-4">
            <span className="text-sm font-medium">Appearance</span>
            <ThemeToggle />
          </div>
          <button onClick={() => navigate('/')} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Back to Website</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto w-full max-w-[100vw]">
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Owner</h1>
            <p className="text-foreground/70">Here is what's happening at Rahul Apartment today.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Bookings', value: '0', icon: Calendar, color: 'text-blue-500' },
            { label: 'Active Guests', value: '0', icon: Users, color: 'text-green-500' },
            { label: 'Open Queries', value: '0', icon: MessageSquare, color: 'text-yellow-500' },
            { label: 'Monthly Revenue', value: '₹0', icon: IndianRupee, color: 'text-primary' },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass flex items-center space-x-4"
            >
              <div className={`p-4 rounded-xl bg-background ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-foreground/60 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Changing Tabs */}
        {activeTab === 'bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-3xl p-6 overflow-x-auto">
            <h2 className="text-xl font-bold mb-6">Recent Bookings</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 text-foreground/60">
                  <th className="pb-4 font-medium px-4">Booking ID</th>
                  <th className="pb-4 font-medium px-4">Guest Name</th>
                  <th className="pb-4 font-medium px-4">Room</th>
                  <th className="pb-4 font-medium px-4">Dates</th>
                  <th className="pb-4 font-medium px-4">Price</th>
                  <th className="pb-4 font-medium px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {dummyBookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 px-4 text-center text-foreground/50">
                      No bookings found. Incoming bookings will appear here.
                    </td>
                  </tr>
                ) : (
                  dummyBookings.map((b, idx) => (
                    <tr key={idx} className="border-b border-border/20 last:border-0 hover:bg-background/40 transition-colors">
                      <td className="py-4 px-4 font-medium">{b.id}</td>
                      <td className="py-4 px-4">{b.name}</td>
                      <td className="py-4 px-4">{b.room}</td>
                      <td className="py-4 px-4">{b.dates}</td>
                      <td className="py-4 px-4">{b.price}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${b.status === 'Confirmed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                          {b.status === 'Confirmed' ? <CheckCircle size={14} /> : <Clock size={14} />}
                          <span>{b.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === 'queries' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-xl font-bold mb-6">Help Desk & Queries</h2>
            {dummyQueries.length === 0 ? (
              <div className="glass p-8 rounded-2xl text-center text-foreground/50">
                No active queries or help desk tickets.
              </div>
            ) : (
              dummyQueries.map((q, idx) => (
                <div key={idx} className="glass p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-transform hover:-translate-y-1">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-bold">{q.name}</span>
                      <span className="text-xs px-2 py-1 bg-border rounded-full text-foreground/70">{q.time}</span>
                    </div>
                    <p className="text-foreground/80">{q.issue}</p>
                  </div>
                  <div>
                     <span className={`inline-flex px-4 py-2 rounded-xl text-sm font-semibold ${q.status === 'Open' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                      {q.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
        
        {activeTab === 'guests' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-xl font-bold mb-6">Guest Directory</h2>
            <div className="glass p-8 rounded-2xl text-center text-foreground/50">
              No guests found. Registered guests arriving soon will be listed here.
            </div>
          </motion.div>
        )}

        {activeTab === 'revenue' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Revenue Analytics</h2>
              <button className="px-4 py-2 bg-primary/10 text-primary rounded-xl font-semibold hover:bg-primary/20 transition-colors">
                Download Report
              </button>
            </div>
            <div className="glass p-8 rounded-2xl text-center text-foreground/50 h-64 flex flex-col items-center justify-center">
              <IndianRupee size={48} className="mb-4 text-border" />
              Not enough data to generate revenue graphs.
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
