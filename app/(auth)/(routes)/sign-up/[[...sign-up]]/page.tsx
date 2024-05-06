import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <SignUp
      appearance={{
        // baseTheme: dark,
        elements: {
          card: "shadow-2xl",
          formButtonPrimary: "bg-slate-900",
        },
      }}
    />
  );
}
