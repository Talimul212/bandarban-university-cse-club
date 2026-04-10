import EnrollmentForm from "@/app/models/EnrollmentForm";
import dbConnect from "@/lib/dbconnect";
import EnrollManagement from "./EnrollManagement";

async function getEnrollments() {
  await dbConnect();
  const enrollments = await EnrollmentForm.find({}).lean();

  return JSON.parse(JSON.stringify(enrollments));
}

export default async function EnrollmentsPage() {
  const data = await getEnrollments();

  return <EnrollManagement data={data} />;
}
