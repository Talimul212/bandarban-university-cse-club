// app/enroll/page.tsx

import { Suspense } from "react";
import FormDetails from "./FormDetails";

export default function EnrollPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-lg">
          Loading enrollment page...
        </div>
      }
    >
      <FormDetails />
    </Suspense>
  );
}
