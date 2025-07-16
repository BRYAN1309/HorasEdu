import type React from "react";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface Material {
    id: number;
    title: string;
    content: string;
    media_url?: string;
    created_at: string;
    type: "article" | "video" | "image" | "youtube";
}

export interface Quiz {
    id: number;
    title: string;
    module_id: number;
    created_at: string;
    score?: number;
    completed: boolean;
}

export interface Module {
    id: number;
    title: string;
    description: string;
    course_id: number;
    materials: Material[];
    quiz: Quiz;
    completed: boolean;
    progress: number;
}

export interface Course {
    id: number;
    title: string;
    description: string;
    created_by: string;
    created_at: string;
    instructor: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    students: number;
    rating: number;
    modules: Module[];
    progress: number;
}

export interface ISidebarItems {
    icon: any;
    label: string;
    active: boolean;
}

export interface IDashboardContext {
    sidebarOpen: boolean;
    sidebarItems: ISidebarItems[];
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSidebarItems: React.Dispatch<React.SetStateAction<ISidebarItems[]>>;
}
