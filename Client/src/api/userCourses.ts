import api from "./api"

const getUserCourses = async (id: number) => {
    try {
        const res = await api.get("/")
    } catch (err) {
        throw err
    }
} 