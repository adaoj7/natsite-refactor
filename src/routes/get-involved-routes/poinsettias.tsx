import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink } from "react-router-dom";

interface PoinsettiasProps {
  form: SiteLink;
  isLoading: boolean;
}

interface SiteLink {
  linkType: string;
  linkName: string;
  link: string;
}

export function Poinsettias() {
  const { data: poinsettiaForm, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await axios.get("/api/links", {
        params: { linkType: "poinsettias" },
      });
      return response.data;
    },
  });
  return (
    <>
      <div className="flex desktop:hidden">
        <PoinsettiasMobile form={poinsettiaForm} isLoading={isLoading} />
      </div>
      <div className="phone:hidden desktop:flex">
        <PoinsettiasDesktop form={poinsettiaForm} isLoading={isLoading} />
      </div>
    </>
  );
}

export function PoinsettiasMobile({ form, isLoading }: PoinsettiasProps) {
  console.log("form", form, isLoading);
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title justify-center text-2xl">
          Poinsettia Sponsorship
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div>
            Poinsettias are red, in 8" pots, large, and are $15.00 each.
          </div>
          <div className="flex flex-col gap-2">
            <div>
              All orders should be placed through an organizational
              representative if possible. Payment can be made via Check, Venmo,
              or PayPal.
            </div>
            <div>
              <span className="font-semibold">Check:</span> Please talk to your
              representative
            </div>
            <div>
              <span className="font-semibold">Venmo:</span> @Nativity-22 (Peoria
              Poinsettia)
            </div>
            <div>
              <span className="font-semibold">PayPal:</span> @peorianativity
              (Melinda Iund)
            </div>
            <div>
              <span className="font-semibold">
                When paying with Venmo or PayPal, please remember to choose
                "friends," not a business.
              </span>
            </div>
          </div>
          <div>
            If you are not from one of the sponsoring groups and would like to
            purchase poinsettias, please fill out the form below to place an
            order. After placing your order, you will receive payment
            information via email.
          </div>
          <div>
            Poinsettias must be picked up on Monday, December 9th, between 9 AM
            and 8 PM. Poinsettias not picked up by 8 PM will be donated to local
            nursing homes.
          </div>
          <div className="mt-4 flex justify-center">
            {isLoading || !form ? (
              <div className="btn btn-disabled">Place Poinsettia Order</div>
            ) : (
              <NavLink to={form.link} className="btn">
                Place Poinsettia Order
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PoinsettiasDesktop({ form, isLoading }: PoinsettiasProps) {
  return (
    <div className="card">
      <div className="card-body gap-8">
        <div className="card-title justify-center text-2xl">
          Poinsettia Sponsorship
        </div>
        <div className="flex flex-col justify-center gap-4 px-16 text-xl">
          <div className="flex flex-col justify-center gap-4">
            <div>
              Poinsettias are red, in 8" pots, large, and are $15.00 each.
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <span className="italic">
                  All orders should be placed through an organizational
                  representative if possible.
                </span>{" "}
                Payment can be made via Check, Venmo, or PayPal.
              </div>
              <div>
                <span className="font-semibold">Check:</span> Please talk to
                your representative
              </div>
              <div>
                <span className="font-semibold">Venmo:</span> @Nativity-22
                (Peoria Poinsettia)
              </div>
              <div>
                <span className="font-semibold">PayPal:</span> @peorianativity
                (Melinda Iund)
              </div>
              <div>
                <span className="font-semibold">
                  When paying with Venmo or PayPal, please remember to choose
                  "friends," not a business.
                </span>
              </div>
            </div>
            <div>
              If you are not from one of the sponsoring groups and would like to
              purchase poinsettias, please fill out the form below to place an
              order. After placing your order, you will receive payment
              information via email.
            </div>
            <div>
              Poinsettias must be picked up on Monday, December 9th, between 9
              AM and 8 PM. Poinsettias not picked up by 8 PM will be donated to
              local nursing homes.
            </div>
            <div className="mt-4 flex justify-center">
              {isLoading || !form ? (
                <div className="btn btn-disabled">Place Poinsettia Order</div>
              ) : (
                <NavLink to={form.link} className="btn">
                  Place Poinsettia Order
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
