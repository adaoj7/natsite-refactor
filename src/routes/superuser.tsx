import Spacer from "../components/Spacer";

export default function SuperUser() {
  return (
    <>
      <div className="flex desktop:hidden">
        <SuperUserMobile />
      </div>
      <div className="phone:hidden desktop:flex">
        <SuperUserDesktop />
      </div>
    </>
  );
}

export function SuperUserMobile() {
  return (
    <>
      <Spacer />
      <div>Hello There</div>
    </>
  );
}

export function SuperUserDesktop() {
  return (
    <>
      <Spacer />
      <div>Hello There</div>
    </>
  );
}
