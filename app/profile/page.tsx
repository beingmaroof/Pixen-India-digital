"use client";
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar, Footer } from "@/components";
import { useAuth } from "@/contexts/AuthContext";
import {
  logOut,
  updateUserData,
  getUserData,
} from "@/lib/auth";

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

  // 🔥 FIX: Redirect only AFTER loading completes
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (userData?.display_name) {
      setEditName(userData.display_name);
    }
    // Initialize other fields from userData when available
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
    // Load notification preferences from localStorage
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
    await logOut();
    router.push("/");
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

    // Validate phone number if provided
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

      console.log('Saving profile data...', { targetUid });

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
        console.error('Update error:', error);
        setSaveMessage({ text: `Update failed: ${error.message}`, type: "error" });
      } else {
        console.log('Profile updated successfully');
        
        // Refresh user data in the global context
        await refreshUserData();
        
        // Also update local state immediately
        const updatedData = await getUserData(targetUid);
        console.log('Fetched updated data:', updatedData);
        
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
      console.error('Unexpected error during save:', err);
      setSaveMessage({ text: "An unexpected error occurred. Please try again.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  // 🔥 FIX 1: ONLY check loading here
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex justify-center items-center">
          <div className="animate-spin h-10 w-10 border-b-2 border-primary-600 rounded-full"></div>
        </main>
        <Footer />
      </>
    );
  }

  // 🔥 FIX 2: Separate auth check
  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex justify-center items-center">
          <p className="text-gray-600">Please login to access your profile.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container-custom max-w-5xl mx-auto">

          {/* Sidebar */}
          <div className="flex flex-col md:flex-row gap-8">

            <div className="w-full md:w-1/4 bg-white rounded-xl p-6 shadow">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  {user?.email?.charAt(0)}
                </div>
                <p className="mt-2 text-sm text-gray-500">{user?.email}</p>
              </div>

              <button onClick={() => setActiveTab("general")} className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${activeTab === "general" ? "bg-primary-100 text-primary-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}`}>General Info</button>
              <button onClick={() => setActiveTab("security")} className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${activeTab === "security" ? "bg-primary-100 text-primary-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}`}>Security & Login</button>
              <button onClick={() => setActiveTab("notifications")} className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${activeTab === "notifications" ? "bg-primary-100 text-primary-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}`}>Notifications</button>
              <button onClick={() => setActiveTab("billing")} className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${activeTab === "billing" ? "bg-primary-100 text-primary-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}`}>Billing History</button>

              <div className="pt-6 mt-4 border-t border-gray-100">
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full text-center py-2.5 px-4 rounded-xl font-semibold text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-3/4 bg-white rounded-xl p-6 shadow">

              {activeTab === "general" && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">General Information</h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {saveMessage.text && (
                    <div className={`mb-4 p-4 rounded-lg ${saveMessage.type === "success" ? "bg-green-100 border border-green-400 text-green-800" : "bg-red-100 border border-red-400 text-red-800"}`}>
                      {saveMessage.text}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Row 1: Display Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Name *</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          disabled={!isEditing}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={user?.email || ""}
                          disabled
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                      </div>
                    </div>

                    {/* Row 2: Date of Birth & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        <input
                          type="date"
                          value={editDob}
                          onChange={(e) => setEditDob(e.target.value)}
                          disabled={!isEditing}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <select
                          value={editGender}
                          onChange={(e) => setEditGender(e.target.value)}
                          disabled={!isEditing}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Phone Number & Company Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          disabled={!isEditing}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <input
                          type="text"
                          value={editCompany}
                          onChange={(e) => setEditCompany(e.target.value)}
                          disabled={!isEditing}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    {/* Row 4: Job Title & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                        <select
                          value={editJobTitle}
                          onChange={(e) => setEditJobTitle(e.target.value)}
                          disabled={!isEditing}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                        >
                          <option value="">Select Job Title</option>
                          <option value="founder">Founder</option>
                          <option value="co-founder">Co-Founder</option>
                          <option value="ceo">Chief Executive Officer (CEO)</option>
                          <option value="cto">Chief Technology Officer (CTO)</option>
                          <option value="cfo">Chief Financial Officer (CFO)</option>
                          <option value="cmo">Chief Marketing Officer (CMO)</option>
                          <option value="director">Director</option>
                          <option value="manager">Manager</option>
                          <option value="senior-manager">Senior Manager</option>
                          <option value="team-lead">Team Lead</option>
                          <option value="developer">Developer/Engineer</option>
                          <option value="senior-developer">Senior Developer</option>
                          <option value="full-stack-developer">Full Stack Developer</option>
                          <option value="frontend-developer">Frontend Developer</option>
                          <option value="backend-developer">Backend Developer</option>
                          <option value="designer">Designer</option>
                          <option value="ui-ux-designer">UI/UX Designer</option>
                          <option value="graphic-designer">Graphic Designer</option>
                          <option value="marketing-specialist">Marketing Specialist</option>
                          <option value="digital-marketer">Digital Marketer</option>
                          <option value="seo-specialist">SEO Specialist</option>
                          <option value="content-writer">Content Writer</option>
                          <option value="sales-executive">Sales Executive</option>
                          <option value="business-development">Business Development</option>
                          <option value="hr-manager">HR Manager</option>
                          <option value="operations-manager">Operations Manager</option>
                          <option value="project-manager">Project Manager</option>
                          <option value="product-manager">Product Manager</option>
                          <option value="consultant">Consultant</option>
                          <option value="freelancer">Freelancer</option>
                          <option value="intern">Intern</option>
                          <option value="student">Student</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location/City</label>
                        <input
                          type="text"
                          value={editLocation}
                          onChange={(e) => setEditLocation(e.target.value)}
                          disabled={!isEditing}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                          {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            // Reset form to original values
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
                          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeTab === "security" && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security & Login</h2>

                  <div className="space-y-6">
                    {/* Change Password Section */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter current password"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                            placeholder="Confirm new password"
                          />
                        </div>
                        <button className="mt-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                          Update Password
                        </button>
                      </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Current Session</p>
                            <p className="text-sm text-gray-600">Last active: Just now</p>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "notifications" && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>

                  {notifMessage.text && (
                    <div className={`mb-6 p-4 rounded-lg transform transition-all border ${notifMessage.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
                      <div className="flex items-center gap-2">
                        {notifMessage.type === "success" && (
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 11-16 0 8 8 0 0116 0zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        <p className="font-semibold">{notifMessage.text}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Email Notifications */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Marketing Emails</p>
                            <p className="text-sm text-gray-600">Receive updates about new features and promotions</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={marketingEmails} onChange={(e) => setMarketingEmails(e.target.checked)} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Product Updates</p>
                            <p className="text-sm text-gray-600">Get notified about important product updates</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={productUpdates} onChange={(e) => setProductUpdates(e.target.checked)} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Newsletter</p>
                            <p className="text-sm text-gray-600">Monthly newsletter with tips and insights</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Save Preferences */}
                    <div className="pt-4">
                      <button onClick={handleSaveNotifications} className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl font-bold">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "billing" && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing History</h2>

                  <div className="space-y-6">
                    {/* Current Plan */}
                    <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-primary-50 to-primary-100">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                          <p className="text-gray-600 mt-1">Your current subscription plan</p>
                        </div>
                        <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">Active</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-3xl font-bold text-gray-900">Free</p>
                          <p className="text-sm text-gray-600 mt-1">No active paid subscriptions</p>
                        </div>
                        <Link href="/pricing" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium inline-block text-center">
                          Upgrade Plan
                        </Link>
                      </div>
                    </div>

                    {/* Billing History Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
                      </div>
                      <div className="divide-y divide-gray-200">
                        <div className="p-6 text-center text-gray-500">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="mt-2 font-medium">No billing history</p>
                          <p className="text-sm mt-1">When you make purchases, they&apos;ll appear here</p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">Add Payment Method</button>
                      </div>
                      <div className="text-center py-8 text-gray-500">
                        <p>No payment methods saved</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

            </div>

          </div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in relative border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Log out of your account?</h3>
            <p className="text-gray-500 text-center mb-8 text-sm px-4">
              You will need to sign back in to access your profile and settings.
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center justify-center py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg disabled:bg-red-400"
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Logging out...
                  </>
                ) : 'Sign Out'}
              </button>
              
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="w-full py-3 px-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
