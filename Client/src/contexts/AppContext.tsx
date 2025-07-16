import React, { createContext, useContext, useState } from "react";
import type { IDashboardContext, ISidebarItems } from "../types/types";
import { Home, Book, Award, Settings, HelpCircle } from "lucide-react";

const AppContext = createContext<IDashboardContext | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarItems, setSidebarItems] = useState<ISidebarItems[]>([
        { icon: Home, label: "Dashboard", active: false },
        { icon: Book, label: "Courses", active: false },
        { icon: Award, label: "Achievements", active: false },
        { icon: Settings, label: "Settings", active: false },
        { icon: HelpCircle, label: "Support", active: false },
    ]);

    return (
        <AppContext.Provider
            value={{
                sidebarOpen,
                sidebarItems,
                setSidebarOpen,
                setSidebarItems,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): IDashboardContext => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useDashboardContext must be used within a DashboardProvider");
    }
    return context;
};
