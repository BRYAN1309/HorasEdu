import type React from 'react';

export interface LoginPayload {
	email: string;
	password: string;
}

export interface IAuthContext {
	name: string;
	email: string;
}

export interface RegisterPayload {
	name: string;
	email: string;
	password: string;
}

export interface Material {
	id: number;
	title: string;
	module_id: number;
	content: string;
	media_url?: string;
	image_url?: string;
	description: string;
	duration: number;
	created_at: string;
	type: 'article' | 'video' | 'image' | 'youtube';
	order: number;
	completed: boolean;
}

export interface Quiz {
	id: number;
	title: string;
	module_id: number;
	created_at: string;
	score?: number;
	lock: boolean;
	duration: number;
	pass_score: number;
	description: string;
	questions: Question[];
}

export interface FinalExam {
	id: number;
	title: string;
	course_id: number;
	created_at: string;
	score?: number;
	duration: number;
	pass_score: number;
	description: string;
	final_exam_questions: FinalExamQuestions[];
}

export interface FinalExamQuestions {
	id: number;
	final_exam_id: number;
	questions_text: string;
	option_a: string;
	option_b: string;
	option_c: string;
	option_d: string;
	correct_answer: string;
	correct_answer_value: string;
	explanation: string;
	created_at: string;
	url_image: string;
}

export interface Question {
	id: number;
	quiz_id: number;
	questions_text: string;
	option_a: string;
	option_b: string;
	option_c: string;
	option_d: string;
	correct_answer: string;
	correct_answer_value: string;
	explanation: string;
	created_at: string;
	url_image: string;
}

export type OptionKey = 'option_a' | 'option_b' | 'option_c' | 'option_d';

export interface Module {
	id: number;
	title: string;
	description: string;
	duration: number;
	total_materials: number;
	image_url: string;
	course_id: number;
	materials: Material[];
	completed: boolean;
	quiz: Quiz;
}

export interface Course {
	id: number;
	title: string;
	description: string;
	author: string;
	created_at: string;
	updated_at: Date;
	durasi: number;
	kesulitan: 'pemula' | 'menengah' | 'lanjutan';
	url_image: string;
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

export interface CourseDetails {
	id: number;
	title: string;
	description: string;
	durasi: number;
	author: string;
	kesulitan: 'pemula' | 'menengah' | 'lanjutan';
	url_image: string;
	modules: Module[];
	course_requirements: string[];
	course_learning: string[];
	created_at: string;
}

export interface CoursePreviewProps {
	course?: CourseDetails;
	isOpen: boolean;
	onClose: () => void;
	onAddCourse: (courseId: number) => Promise<void>;
}

export interface IMaterialsVisited {
	id: number;
	user_id: number;
	materials_id: number;
	created_at: string;
}

export interface IModuleVisited {
	id: number;
	user_id: number;
	module_id: number;
	created_at: string;
}

export interface IQuizVisited {
	id: number;
	user_id: number;
	module_id: number;
	created_at: string;
}

export interface IUserQuiz {
	id: number;
	created_at: Date;
	updated_at: Date;
	user_id: number;
	quiz_id: number;
	score: number;
}

export interface IUserFinalExam {
	id: number;
	created_at: Date;
	updated_at: Date;
	user_id: number;
	final_exam_id: number;
	score: number;
}

export interface IMessage {
	id: number;
	type: string;
	content: Promise<string> | string;
	timestamp: Date;
}

export interface IUser {
	email: string;
	name: string;
}
