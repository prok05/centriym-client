import {DashboardPanel} from "@/components/ui/DashboardPanel";
import {useLessonStore} from "@/store/lessonStore";
import {useInnerUserStore} from "@/store/innerUserStore";
import {useEffect} from "react";
import {useUserID} from "@/hooks/useUserID";

export default function DashboardPage() {


    return (
        <DashboardPanel />
    );
}