import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://bfrqqibtuedofcxhdpvo.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmcnFxaWJ0dWVkb2ZjeGhkcHZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAwMjYzNTUsImV4cCI6MTk4NTYwMjM1NX0.WPmkCWY4hk94WWEqgQW5QvU8OJmae6zrINjA85dl77A";

const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("videos").select("*");
        }

    }
}