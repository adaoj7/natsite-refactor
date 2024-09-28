// import React from "react";
import Spacer from "../../components/Spacer";

interface DonateProps {
  createDonationSession: () => void;
}

export default function Donate() {
  const createDonationSession = () => null;

  return (
    <div className="flex flex-col">
      <div className="flex desktop:hidden">
        <DonateMobile createDonationSession={createDonationSession} />
      </div>
      <div className="desktop:block phone:hidden">
        <DonateDesktop createDonationSession={createDonationSession} />
      </div>
    </div>
  );
}

const DonateMobile = ({ createDonationSession }: DonateProps) => {
  return (
    <>
      <div className="flex justify-center items-center h-40 mt-24 font-medium text-2xl px-6 ">
        Click donate to be taken to a secure payment powered by Stripe
      </div>
      <form
        onSubmit={createDonationSession}
        className="flex justify-center content-center"
      >
        <button type="submit" className="bg-green-500 btn hover:btn-ghost">
          Donate
        </button>
      </form>
      <div className="flex justify-center text-lg mt-8 px-6">
        The Community Festival of Nativities is a recognized non-profit;
        monetary and in-kind donations are tax-deductible. Your generous
        contributions help us maintain this as a free event to the public.
      </div>
    </>
  );
};

const DonateDesktop = ({ createDonationSession }: DonateProps) => {
  return (
    <>
      <Spacer size="sm" />
      <div className="card">
        <div className="card-body gap-8">
          <div className="flex justify-center text-xl px-40">
            The Community Festival of Nativities is a recognized non-profit;
            monetary and in-kind donations are tax-deductible. Your generous
            contributions help us maintain this as a free event to the public.
          </div>
          <form
            onSubmit={createDonationSession}
            className="flex justify-center items-center gap-4"
          >
            <div className="flex justify-center">
              Click donate to be taken to a secure payment powered by Stripe
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-secondary btn-disabled"
            >
              Donate
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
