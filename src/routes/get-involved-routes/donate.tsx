interface DonateProps {}

export default function Donate() {
  return (
    <div className="flex flex-col">
      <div className="flex desktop:hidden">
        <DonateMobile />
      </div>
      <div className="phone:hidden desktop:block">
        <DonateDesktop />
      </div>
    </div>
  );
}

const DonateMobile = () => {
  return (
    <div className="card">
      <div className="card-body gap-8">
        <div className="card-title justify-center text-2xl">
          Friends of the Nativity
        </div>
        <div className="flex justify-center text-center text-xl">
          The Community Festival of Nativities is a recognized non-profit;
          monetary and in-kind donations are tax-deductible. Your generous
          contributions help us maintain this as a free event to the public.
        </div>
        <div className="m-auto text-xl text-primary">
          <div>GOLD 250+</div>
          <div>FRANKINCENSE 150+</div>
          <div>MYRRH 50+</div>
        </div>
        <div className="flex justify-center italic">
          Sponsorship contributions will be listed on our printed program and
          website.
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <div className="card-title justify-center underline">PayPal</div>
            <div className="text-center text-xl">@Peorianativity</div>
            <div className="text-center text-sm">
              Please select "Friends and Family" so that we do not incur
              additional fees
            </div>
          </div>
          <div>
            <div className="card-title justify-center underline">Venmo</div>
            <div className="text-center text-xl">@Nativity-22</div>
          </div>
          <div>
            <div className="card-title justify-center underline">Check</div>
            <div className="flex flex-col text-center text-xl">
              <div>Community Festival of Nativities</div>
              <div>6529 N Cedarbrook Ln</div>
              <div>Peoria, IL 61614</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DonateDesktop = () => {
  return (
    <div className="card">
      <div className="card-body gap-8">
        <div className="card-title justify-center text-2xl">
          Friends of the Nativity
        </div>
        <div className="flex justify-center px-40 text-center text-xl">
          The Community Festival of Nativities is a recognized non-profit;
          monetary and in-kind donations are tax-deductible. Your generous
          contributions help us maintain this as a free event to the public.
        </div>
        <div className="m-auto text-xl text-primary">
          <div>GOLD 250+</div>
          <div>FRANKINCENSE 150+</div>
          <div>MYRRH 50+</div>
        </div>
        <div className="flex justify-center italic">
          Sponsorship contributions will be listed on our printed program and
          website.
        </div>
        <div className="grid grid-cols-3">
          <div>
            <div className="card-title justify-center underline">PayPal</div>
            <div className="text-center text-xl">@Peorianativity</div>
            <div className="text-center text-sm">
              Please select "Friends and Family" so that we do not incur
              additional fees
            </div>
          </div>
          <div>
            <div className="card-title justify-center underline">Venmo</div>
            <div className="text-center text-xl">@Nativity-22</div>
          </div>
          <div>
            <div className="card-title justify-center underline">Check</div>
            <div className="flex flex-col text-center text-xl">
              <div>Community Festival of Nativities</div>
              <div>6529 N Cedarbrook Ln</div>
              <div>Peoria, IL 61614</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
