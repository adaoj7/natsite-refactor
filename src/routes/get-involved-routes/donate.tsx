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
      <div className="card mt-8">
        <div className="card-body gap-8">
          <div className="flex justify-center text-xl">
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

const DonateDesktop = ({ createDonationSession }: DonateProps) => {
  return (
    <>
      <div className="card mt-8">
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
