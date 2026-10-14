
import { ErrorLogDetail } from "@/features/ErrorLogDetail";

type Props = {
  params: Promise<{id: string}>
};

const ErrorLogDetailPage = async ({params}: Props) => {
  const {id: errorLogId} = await params;
return (

  <>
  <ErrorLogDetail errorLogId={errorLogId}/>
  </>
)
};

export default ErrorLogDetailPage;