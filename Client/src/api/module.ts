import axios from "axios";

const viewModuleDetails = async (id: number) => {
    try {
        const res = await axios.get(`/modules?id=${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

const viewAllModules = async () => {
    try {
        const res = await axios.get(`/modules`);
        return res.data;
    } catch (err) {
        throw err;
    }
};
