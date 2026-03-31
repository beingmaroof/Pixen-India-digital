"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PremiumNavbar } from "@/components";
import { Footer } from "@/components";
import { DarkPageWrapper, FadeIn } from "@/components/DarkUI";
import { useAuth } from "@/contexts/AuthContext";
import {
  logOut,
  updateUserData,
  getUserData,
  getUserPayments,
} from "@/lib/auth";

// Detect OS and browser from userAgent
function getDeviceInfo(): { os: string; browser: string } {
  if (typeof window === 'undefined') return { os: 'Unknown OS', browser: 'Unknown Browser' };
  const ua = navigator.userAgent;
  let os = 'Unknown OS';
  if (/Windows NT/i.test(ua)) os = 'Windows';
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Linux/i.test(ua)) os = 'Linux';

  let browser = 'Unknown Browser';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/OPR\/|Opera/i.test(ua)) browser = 'Opera';
  else if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) browser = 'Chrome';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';
  else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';

  return { os, browser };
}

export default function ProfilePage() {
  const { user, userData, loading, isAuthenticated, refreshUserData } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDob, setEditDob] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCompany, setEditCompany] = useState("");
  const [editJobTitle, setEditJobTitle] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: "", type: "" });

  const [activeTab, setActiveTab] = useState("general");

  // Notifications State
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [productUpdates, setProductUpdates] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [notifMessage, setNotifMessage] = useState({ text: "", type: "" });

  // Logout Modal State
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // --- Payment History State ---
  const [payments, setPayments] = useState<any[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (userData?.display_name) {
      setEditName(userData.display_name);
    }
    if (userData) {
      setEditDob(userData.dob || "");
      setEditGender(userData.gender || "");
      setEditPhone(userData.phone || "");
      setEditCompany(userData.company || "");
      setEditJobTitle(userData.job_title || "");
      setEditLocation(userData.location || "");
    }
  }, [userData]);

  useEffect(() => {
    const prefs_str = localStorage.getItem("pixen_notification_prefs");
    if (prefs_str) {
      try {
        const prefs = JSON.parse(prefs_str);
        if (typeof prefs.marketingEmails !== 'undefined') setMarketingEmails(prefs.marketingEmails);
        if (typeof prefs.productUpdates !== 'undefined') setProductUpdates(prefs.productUpdates);
        if (typeof prefs.newsletter !== 'undefined') setNewsletter(prefs.newsletter);
      } catch (e) {}
    }
  }, []);


  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Fallback: force hard redirect after 4s if Supabase hangs
    const fallbackTimer = setTimeout(() => {
      window.location.href = '/login';
    }, 4000);
    try {
      await logOut();
      clearTimeout(fallbackTimer);
    } catch {
      clearTimeout(fallbackTimer);
    } finally {
      // Always hard-navigate to ensure session is flushed from the browser
      window.location.href = '/login';
    }
  };


  const handleSaveNotifications = () => {
    const prefs = { marketingEmails, productUpdates, newsletter };
    localStorage.setItem("pixen_notification_prefs", JSON.stringify(prefs));
    setNotifMessage({ text: "Preferences saved successfully!", type: "success" });
    setTimeout(() => setNotifMessage({ text: "", type: "" }), 3000);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      setSaveMessage({ text: "Name cannot be empty.", type: "error" });
      return;
    }

    if (editPhone && !/^\+?[0-9]{10,15}$/.test(editPhone.replace(/\s|-/g, ''))) {
      setSaveMessage({ text: "Please enter a valid phone number.", type: "error" });
      return;
    }

    setIsSaving(true);

    try {
      const targetUid = userData?.uid || user?.id;

      if (!targetUid) {
        setSaveMessage({ text: "User ID not found.", type: "error" });
        setIsSaving(false);
        return;
      }

      const { error } = await updateUserData(targetUid, {
        display_name: editName.trim(),
        dob: editDob || null,
        gender: editGender || null,
        phone: editPhone || null,
        company: editCompany || null,
        job_title: editJobTitle || null,
        location: editLocation || null,
      });

      if (error) {
        setSaveMessage({ text: `Update failed: ${error.message}`, type: "error" });
      } else {
        await refreshUserData();
        const updatedData = await getUserData(targetUid);
        
        if (updatedData) {
          setEditName(updatedData.display_name || "");
          setEditDob(updatedData.dob || "");
          setEditGender(updatedData.gender || "");
          setEditPhone(updatedData.phone || "");
          setEditCompany(updatedData.company || "");
          setEditJobTitle(updatedData.job_title || "");
          setEditLocation(updatedData.location || "");
        }
        
        setSaveMessage({ text: "Profile updated successfully!", type: "success" });
        setIsEditing(false);
      }
    } catch (err) {
      setSaveMessage({ text: "An unexpected error occurred. Please try again.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (activeTab === "billing" && user) {
      setLoadingPayments(true);
      getUserPayments(user.id).then(({ data }) => {
        if (data) setPayments(data);
        setLoadingPayments(false);
      });
    }
  }, [activeTab, user]);

  if (loading) {
    return (
      <DarkPageWrapper>
        <PremiumNavbar />
        <main className="min-h-screen flex justify-center items-center">
          <div className="animate-spin h-10 w-10 border-b-2 border-purple-500 rounded-full"></div>
        </main>
        <Footer />
      </DarkPageWrapper>
    );
  }

  if (!isAuthenticated) {
    return (
      <DarkPageWrapper>
        <PremiumNavbar />
        <main className="min-h-screen flex justify-center items-center">
          <p className="text-white/60">Please login to access your profile.</p>
        </main>
        <Footer />
      </DarkPageWrapper>
    );
  }

  const navButtonClass = (tabId: string) => `block w-full text-left py-3 px-4 rounded-xl transition-all duration-300 ${activeTab === tabId ? "bg-purple-500/10 text-purple-400 font-semibold border border-purple-500/20" : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent font-medium"}`;
  const inputClass = "w-full bg-[#02030A] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-white/20 disabled:bg-white/5 disabled:text-white/40 disabled:cursor-not-allowed disabled:border-transparent";
  const labelClass = "block text-sm font-semibold text-white/60 mb-2 uppercase tracking-wider";

  return (
    <DarkPageWrapper>
      <PremiumNavbar />

      <main className="min-h-screen pt-32 pb-20 relative z-10">
        <div className="container-custom max-w-6xl mx-auto">
          
          <FadeIn>
            {/* Header section abstract glow */}
            <div className="mb-12 relative">
              <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight relative z-10">
                Account <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Settings</span>
              </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 relative z-10">
              
              {/* Sidebar */}
              <div className="w-full md:w-1/3 lg:w-1/4">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sticky top-32">
                  <div className="text-center mb-8 pb-8 border-b border-white/10 relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/20 rounded-full flex items-center justify-center text-2xl font-extrabold text-white mx-auto shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                      {(loading || !userData) ? (
                        <div className="w-full h-full rounded-full animate-pulse bg-white/10" />
                      ) : (
                        (userData?.display_name || user?.email || 'U').charAt(0).toUpperCase()
                      )}
                    </div>
                    {(loading || !userData) ? (
                      <div className="h-4 w-32 bg-white/10 animate-pulse rounded mx-auto mt-4"></div>
                    ) : (
                      <>
                        <p className="mt-3 text-base font-bold text-white truncate max-w-full">{userData?.display_name || 'Your Account'}</p>
                        <p className="mt-0.5 text-xs text-white/40 truncate max-w-full">{user?.email}</p>
                      </>
                    )}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  </div>

                  <nav className="space-y-2">
                    <button onClick={() => setActiveTab("general")} className={navButtonClass("general")}>General Info</button>
                    <button onClick={() => setActiveTab("security")} className={navButtonClass("security")}>Security & Login</button>
                    <button onClick={() => setActiveTab("notifications")} className={navButtonClass("notifications")}>Notifications</button>
                    <button onClick={() => setActiveTab("billing")} className={navButtonClass("billing")}>Billing History</button>
                  </nav>

                  <div className="pt-6 mt-6 border-t border-white/10">
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="w-full text-center py-3 px-4 rounded-xl font-bold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Log Out
                    </button>
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div className="w-full md:w-2/3 lg:w-3/4">
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10 shadow-2xl relative overflow-hidden min-h-[600px]">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

                  <div className="relative z-10">
                    {/* ===== GENERAL TAB ===== */}
                    {activeTab === "general" && (
                      <div className="animate-fade-in">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-white/10 gap-4">
                          <h2 className="text-2xl font-bold text-white tracking-tight">General Information</h2>
                          {!isEditing && (
                            <button
                              onClick={() => setIsEditing(true)}
                              className="px-6 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all text-sm"
                            >
                              Edit Profile
                            </button>
                          )}
                        </div>

                        {saveMessage.text && (
                          <div className={`mb-8 p-4 rounded-xl backdrop-blur-sm border ${saveMessage.type === "success" ? "bg-green-500/10 border-green-500/30 text-green-300" : "bg-red-500/10 border-red-500/30 text-red-300"}`}>
                            {saveMessage.text}
                          </div>
                        )}

                        <div className="space-y-6">
                          {/* Row 1 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className={labelClass}>Display Name *</label>
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                disabled={!isEditing}
                                className={inputClass}
                                placeholder="E.g. John Doe"
                              />
                            </div>
                            <div>
                              <label className={labelClass}>Email Address</label>
                              <input
                                type="email"
                                value={user?.email || ""}
                                disabled
                                className={inputClass}
                              />
                              <p className="mt-2 text-xs font-medium text-white/40 uppercase tracking-widest">Email cannot be changed</p>
                            </div>
                          </div>

                          {/* Row 2 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className={labelClass}>Date of Birth</label>
                              <input
                                type="date"
                                value={editDob}
                                onChange={(e) => setEditDob(e.target.value)}
                                disabled={!isEditing}
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label className={labelClass}>Gender</label>
                              <select
                                value={editGender}
                                onChange={(e) => setEditGender(e.target.value)}
                                disabled={!isEditing}
                                className={inputClass}
                              >
                                <option value="" className="bg-gray-900">Select Gender</option>
                                <option value="male" className="bg-gray-900">Male</option>
                                <option value="female" className="bg-gray-900">Female</option>
                                <option value="other" className="bg-gray-900">Other</option>
                                <option value="prefer-not-to-say" className="bg-gray-900">Prefer not to say</option>
                              </select>
                            </div>
                          </div>

                          {/* Row 3 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className={labelClass}>Phone Number</label>
                              <input
                                type="tel"
                                value={editPhone}
                                onChange={(e) => setEditPhone(e.target.value)}
                                disabled={!isEditing}
                                className={inputClass}
                                placeholder="+91 98765 43210"
                              />
                            </div>
                            <div>
                              <label className={labelClass}>Company Name</label>
                              <input
                                type="text"
                                value={editCompany}
                                onChange={(e) => setEditCompany(e.target.value)}
                                disabled={!isEditing}
                                className={inputClass}
                                placeholder="Your company name"
                              />
                            </div>
                          </div>

                          {/* Row 4 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className={labelClass}>Job Title</label>
                              <select
                                value={editJobTitle}
                                onChange={(e) => setEditJobTitle(e.target.value)}
                                disabled={!isEditing}
                                className={inputClass}
                              >
                                <option value="" className="bg-gray-900">Select Job Title</option>
                                <option value="founder" className="bg-gray-900">Founder</option>
                                <option value="co-founder" className="bg-gray-900">Co-Founder</option>
                                <option value="ceo" className="bg-gray-900">C-Level Executive</option>
                                <option value="director" className="bg-gray-900">Director</option>
                                <option value="manager" className="bg-gray-900">Manager</option>
                                <option value="developer" className="bg-gray-900">Developer/Engineer</option>
                                <option value="designer" className="bg-gray-900">Designer</option>
                                <option value="marketing" className="bg-gray-900">Marketing Professional</option>
                                <option value="sales" className="bg-gray-900">Sales Professional</option>
                                <option value="freelancer" className="bg-gray-900">Freelancer</option>
                                <option value="student" className="bg-gray-900">Student</option>
                                <option value="other" className="bg-gray-900">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className={labelClass}>Location/City</label>
                              <input
                                type="text"
                                value={editLocation}
                                onChange={(e) => setEditLocation(e.target.value)}
                                disabled={!isEditing}
                                className={inputClass}
                                placeholder="City, Country"
                              />
                            </div>
                          </div>

                          {/* Actions */}
                          {isEditing && (
                            <div className="flex gap-4 pt-8 border-t border-white/10 mt-8">
                              <button
                                onClick={handleSaveProfile}
                                disabled={isSaving}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50"
                              >
                                {isSaving ? "Saving..." : "Save Changes"}
                              </button>
                              <button
                                onClick={() => {
                                  setIsEditing(false);
                                  if (userData) {
                                    setEditName(userData.display_name || "");
                                    setEditDob(userData.dob || "");
                                    setEditGender(userData.gender || "");
                                    setEditPhone(userData.phone || "");
                                    setEditCompany(userData.company || "");
                                    setEditJobTitle(userData.job_title || "");
                                    setEditLocation(userData.location || "");
                                  }
                                }}
                                className="bg-white/5 border border-white/10 text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-colors font-bold"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ===== SECURITY TAB ===== */}
                    {activeTab === "security" && (
                      <div className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-white tracking-tight mb-8 pb-6 border-b border-white/10">Security & Login</h2>

                        <div className="space-y-8">
                          {/* Change Password */}
                          <div className="border border-white/10 bg-white/5 rounded-2xl p-8 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />
                            <h3 className="text-xl font-bold text-white mb-6">Change Password</h3>
                            <div className="space-y-5 relative z-10">
                              <div>
                                <label className={labelClass}>Current Password</label>
                                <input type="password" className={inputClass} placeholder="••••••••" />
                              </div>
                              <div>
                                <label className={labelClass}>New Password</label>
                                <input type="password" className={inputClass} placeholder="••••••••" />
                              </div>
                              <div>
                                <label className={labelClass}>Confirm New Password</label>
                                <input type="password" className={inputClass} placeholder="••••••••" />
                              </div>
                              <button className="mt-4 bg-white/10 border border-white/20 text-white font-bold px-8 py-3 rounded-xl hover:bg-purple-600 hover:border-transparent hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
                                Update Password
                              </button>
                            </div>
                          </div>

                          {/* Active Sessions */}
                          <div className="border border-white/10 bg-white/5 rounded-2xl p-8">
                             <h3 className="text-xl font-bold text-white mb-6">Active Sessions</h3>
                             <div className="flex items-center justify-between p-4 bg-[#02030A] border border-white/10 rounded-xl">
                               <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 text-green-400">
                                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                 </div>
                                 <div>
                                   <p className="font-bold text-white">Current Session</p>
                                   <p className="text-sm text-white/40">
                                     {(() => { const d = getDeviceInfo(); return `${d.os} • ${d.browser} • Just now`; })()}
                                   </p>
                                 </div>
                               </div>
                               <span className="text-xs tracking-wider uppercase bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold border border-green-500/30">Active</span>
                             </div>
                           </div>
                        </div>
                      </div>
                    )}

                    {/* ===== NOTIFICATIONS TAB ===== */}
                    {activeTab === "notifications" && (
                      <div className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-white tracking-tight mb-8 pb-6 border-b border-white/10">Notification Preferences</h2>

                        {notifMessage.text && (
                          <div className={`mb-8 p-4 rounded-xl backdrop-blur-sm border ${notifMessage.type === "success" ? "bg-green-500/10 border-green-500/30 text-green-300" : "bg-red-500/10 border-red-500/30 text-red-300"}`}>
                            {notifMessage.text}
                          </div>
                        )}

                        <div className="border border-white/10 bg-white/5 rounded-2xl p-8">
                          <h3 className="text-xl font-bold text-white mb-6">Email Notifications</h3>
                          <div className="space-y-6">
                            
                            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
                              <div>
                                <p className="font-bold text-white text-lg">Marketing Emails</p>
                                <p className="text-sm text-white/50 mt-1">Receive updates about new features and promotions</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={marketingEmails} onChange={(e) => setMarketingEmails(e.target.checked)} />
                                <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                              </label>
                            </div>

                            <div className="w-full h-[1px] bg-white/10"></div>

                            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
                              <div>
                                <p className="font-bold text-white text-lg">Product Updates</p>
                                <p className="text-sm text-white/50 mt-1">Get notified about important product updates</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={productUpdates} onChange={(e) => setProductUpdates(e.target.checked)} />
                                <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                              </label>
                            </div>

                            <div className="w-full h-[1px] bg-white/10"></div>

                            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
                              <div>
                                <p className="font-bold text-white text-lg">Newsletter</p>
                                <p className="text-sm text-white/50 mt-1">Monthly newsletter with tips and insights</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
                                <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                              </label>
                            </div>

                          </div>
                          
                          <div className="pt-8 mt-4 border-t border-white/10">
                            <button onClick={handleSaveNotifications} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
                              Save Preferences
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ===== BILLING TAB ===== */}
                    {activeTab === "billing" && (
                      <div className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-white tracking-tight mb-8 pb-6 border-b border-white/10">Billing History</h2>

                        <div className="space-y-8">
                          {/* Current Plan */}
                          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-[#02030A] p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150" />
                            
                            <div className="relative z-10">
                              <div className="flex items-center justify-between mb-6">
                                <div>
                                  <h3 className="text-xl font-bold text-white">Current Plan</h3>
                                  <p className="text-white/60 mt-1 text-sm">Your subscription status</p>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border ${userData?.plan_status === 'active' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-white/10 text-white/70 border-white/20'}`}>
                                  {userData?.plan_status === 'active' ? 'Active' : 'Free Tier'}
                                </span>
                              </div>

                              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                                <div>
                                  <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">{userData?.active_plan || 'Free Plan'}</p>
                                  <p className="text-sm text-purple-300/60 mt-2 font-medium">
                                    {userData?.active_plan ? 'Renews automatically' : 'No active paid subscriptions'}
                                  </p>
                                </div>
                                <Link href="/pricing" className="bg-white text-gray-950 px-8 py-3 rounded-xl hover:bg-white/90 transition-colors font-bold text-center whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                                  {userData?.active_plan ? 'Change Plan' : 'View Premium Plans'}
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/* Billing History Table */}
                          <div className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden">
                            <div className="bg-[#02030A]/50 px-8 py-5 border-b border-white/10">
                              <h3 className="text-lg font-bold text-white">Payment History</h3>
                            </div>
                            
                            <div className="divide-y divide-white/5">
                              {loadingPayments ? (
                                <div className="p-12 text-center text-white/50">
                                  <svg className="animate-spin mx-auto h-8 w-8 text-purple-500 mb-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  <p className="font-semibold tracking-wide">Loading records...</p>
                                </div>
                              ) : payments.length === 0 ? (
                                <div className="p-12 text-center text-white/40">
                                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                                    <svg className="h-8 w-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  </div>
                                  <p className="text-lg font-bold text-white/70 mb-1">No transaction history</p>
                                  <p className="text-sm">Invoices will appear here once you make a purchase.</p>
                                </div>
                              ) : (
                                payments.map((payment) => (
                                  <div key={payment.id} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                                    <div>
                                      <p className="font-bold text-white text-lg">{payment.plan_name}</p>
                                      <p className="text-sm font-medium text-white/40 mt-1 uppercase tracking-wider">
                                        {new Date(payment.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                      </p>
                                    </div>
                                    <div className="md:text-right flex md:flex-col items-center md:items-end justify-between">
                                      <p className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-xl tracking-tight">₹{payment.amount}</p>
                                      <span className={`text-xs px-3 py-1 mt-1 rounded-full font-bold uppercase tracking-wider border ${payment.status?.toLowerCase() === 'completed' || payment.status?.toLowerCase() === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-white/10 text-white/70 border-white/20'}`}>
                                        {payment.status}
                                      </span>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>

                          {/* Payment Methods */}
                          <div className="border border-white/10 bg-white/5 rounded-2xl p-8">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-xl font-bold text-white">Payment Methods</h3>
                              <Link href="/payment" className="text-purple-400 hover:text-purple-300 font-bold text-sm tracking-wide transition-colors">Add New +</Link>
                            </div>
                            <div className="text-center py-10 text-white/40 border border-dashed border-white/10 rounded-xl">
                              <p className="font-medium">No saved payment methods</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </main>

      {/* Logout Confirmation Modal - Dark Theme */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#050815] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-sm w-full p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-[50px] pointer-events-none" />
            
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-white text-center mb-3">Log Out?</h3>
            <p className="text-white/50 text-center mb-8 text-sm leading-relaxed px-2">
              You will securely log out of your session. You can sign back in anytime.
            </p>
            
            <div className="flex flex-col gap-3 relative z-10">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full py-3.5 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Disconnecting...
                  </>
                ) : 'Confirm Logout'}
              </button>
              
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="w-full py-3.5 px-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold rounded-xl transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </DarkPageWrapper>
  );
}
