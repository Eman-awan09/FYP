// src/hooks/useMyProfile.js
import { useEffect, useState } from "react";
import { getMyProfileApi, updateMyProfileApi } from "../api/userApi";

export const useMyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMyProfileApi();
      setProfile(data.user);
    } catch (err) {
      console.error("Error loading profile:", err);
      const msg = err?.response?.data?.message || "Failed to load profile.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (updates) => {
    try {
      setSaving(true);
      setError("");
      const data = await updateMyProfileApi(updates);
      setProfile(data.user);
      return { success: true, message: data.message || "Profile updated." };
    } catch (err) {
      console.error("Error updating profile:", err);
      const msg =
        err?.response?.data?.message || "Failed to update profile.";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return { profile, loading, saving, error, saveProfile };
};