import { auth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface TeacherModeSwitchInterface {}

const TeacherModeSwitch = () => {
  const { sessionClaims } = auth();

  const isTeacher = sessionClaims?.metadata.role === "admin";

  return isTeacher ? <Button>Teacher Mode</Button> : null;
};

export default TeacherModeSwitch;
