import type React from "react";
import api from "./api";
import type { Course } from "../types/types";

export const viewCourseDetails = async (id: number) => {
    try {
        const res = await api.get(`/courses/view_details?course_id=${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const viewAllCourse = async (setter: React.Dispatch<React.SetStateAction<Course[]>>) => {
    try {
        const res = await api.get(`/courses`);
        setter(res.data.data);
        // return res.data;
    } catch (err) {
        throw err;
    }
};
