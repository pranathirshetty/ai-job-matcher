"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../core/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { 
  User, 
  Briefcase, 
  Globe, 
  Loader2, 
  Edit3, 
  Save, 
  X 
} from "lucide-react";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      try {
        const docRef = doc(db, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile(data);
          setEditForm({
            name: data.name,
            username: data.username,
            skills: data.skills.join(", "),
            role: data.experience?.role,
            company: data.experience?.company,
            years: data.experience?.years,
            domain: data.preferences?.domain
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user]);

  async function handleUpdate() {
    try {
      const docRef = doc(db, "profiles", user.uid);
      const updatedData = {
        name: editForm.name,
        username: editForm.username,
        skills: editForm.skills.split(",").map(s => s.trim()),
        experience: {
          role: editForm.role,
          company: editForm.company,
          years: Number(editForm.years)
        },
        preferences: { domain: editForm.domain }
      };
      await updateDoc(docRef, updatedData);
      setProfile(updatedData);
      setIsEditing(false);
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  }

  if (authLoading || loading) return (
    <div className="flex h-screen items-center justify-center bg-[#CFD9F4]">
      <Loader2 className="animate-spin text-[#185D72]" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen w-full py-12 px-4" style={{ background: "linear-gradient(135deg, #CFD9F4 0%, #FFFFFF 100%)" }}>
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] p-10 shadow-xl mb-8 flex flex-col md:flex-row items-center gap-8 relative">
          <button 
            onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
            className="absolute top-6 right-6 flex items-center gap-2 bg-[#185D72] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-all"
          >
            {isEditing ? <><Save size={16}/> Save</> : <><Edit3 size={16}/> Edit Profile</>}
          </button>

          <div className="w-28 h-28 bg-[#185D72] rounded-[2rem] flex items-center justify-center text-white text-4xl font-black">
            {profile?.name?.[0]}
          </div>

          <div className="text-center md:text-left">
            {isEditing ? (
              <input 
                className="bg-[#EBF1FF] border-none rounded-lg p-2 text-2xl font-bold text-[#185D72] outline-none"
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
              />
            ) : (
              <h1 className="text-4xl font-black text-[#185D72]">{profile?.name}</h1>
            )}
            <p className="text-slate-500 font-bold">@{profile?.username}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Work Details */}
          <div className="bg-white/50 backdrop-blur-md border border-white rounded-[2.5rem] p-8 shadow-lg">
            <h2 className="text-lg font-black text-[#185D72] mb-6 flex items-center gap-2 uppercase tracking-widest"><Briefcase size={20}/> Experience</h2>
            <div className="space-y-4">
              <DetailRow label="Current Role" value={profile?.experience?.role} isEditing={isEditing} field="role" editForm={editForm} setEditForm={setEditForm} />
              <DetailRow label="Company" value={profile?.experience?.company} isEditing={isEditing} field="company" editForm={editForm} setEditForm={setEditForm} />
              <DetailRow label="Experience" value={`${profile?.experience?.years} Years`} isEditing={isEditing} field="years" editForm={editForm} setEditForm={setEditForm} />
            </div>
          </div>

          {/* Preferences & Skills */}
          <div className="bg-white/50 backdrop-blur-md border border-white rounded-[2.5rem] p-8 shadow-lg">
            <h2 className="text-lg font-black text-[#185D72] mb-6 flex items-center gap-2 uppercase tracking-widest"><Globe size={20}/> Preferences</h2>
            <div className="space-y-4">
              <DetailRow label="Domain" value={profile?.preferences?.domain} isEditing={isEditing} field="domain" editForm={editForm} setEditForm={setEditForm} />
              <div className="pt-4 border-t border-slate-200">
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-3">Skills Portfolio</label>
                {isEditing ? (
                  <textarea 
                    className="w-full bg-[#EBF1FF] rounded-xl p-3 text-sm text-[#185D72] outline-none"
                    value={editForm.skills}
                    onChange={(e) => setEditForm({...editForm, skills: e.target.value})}
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile?.skills?.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#EBF1FF] text-[#185D72] rounded-lg text-xs font-bold">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, isEditing, field, editForm, setEditForm }) {
  return (
    <div>
      <span className="text-[10px] font-black text-slate-400 uppercase block">{label}</span>
      {isEditing ? (
        <input 
          className="w-full bg-[#EBF1FF] rounded-lg p-2 mt-1 text-[#185D72] font-bold text-sm outline-none"
          value={editForm[field]}
          onChange={(e) => setEditForm({...editForm, [field]: e.target.value})}
        />
      ) : (
        <p className="text-[#185D72] font-bold">{value || "Not Set"}</p>
      )}
    </div>
  );
}