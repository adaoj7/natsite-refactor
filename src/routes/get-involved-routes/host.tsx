import Spacer from "../../components/Spacer";
import Shifts from "../../components/Shifts";
import { useSelector } from "react-redux";

export default function Host() {
  const { user } = useSelector((state: any) => state.user);

  if (!user) {
    return <div>Please login to view this page</div>;
  } else if (!user.churchId) {
    return <div>Please complete your profile to view this page</div>;
  }

  return (
    <>
      <Spacer />
      <Shifts shiftType="host" />
    </>
  );
}
