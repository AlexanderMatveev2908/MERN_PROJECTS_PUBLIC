import "./PlaceOrder.css";
import CartTotal from "./../../comp/CartTotal.jsx/CartTotal";
import { useFormV2 } from "../../hooks/useFormV2/useFormV2";
const PlaceOrder = () => {
  const {
    handleChange,
    handlePlaceOrder,
    orderLoading,
    orderVals: {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zip,
      country,
      phone,
    },
  } = useFormV2();

  return (
    <form onSubmit={handlePlaceOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            onChange={(e) => handleChange(e, "orderVals")}
            value={firstName}
            required
            placeholder="First name..."
          />
          <input
            type="text"
            name="lastName"
            onChange={(e) => handleChange(e, "orderVals")}
            value={lastName}
            required
            placeholder="Last name..."
          />
        </div>

        <input
          type="email"
          name="email"
          onChange={(e) => handleChange(e, "orderVals")}
          value={email}
          required
          placeholder="Email address..."
        />

        <input
          type="text"
          name="street"
          onChange={(e) => handleChange(e, "orderVals")}
          value={street}
          required
          placeholder="Street..."
        />

        <div className="multi-fields">
          <input
            type="text"
            name="city"
            onChange={(e) => handleChange(e, "orderVals")}
            value={city}
            required
            placeholder="City..."
          />
          <input
            type="text"
            name="state"
            onChange={(e) => handleChange(e, "orderVals")}
            value={state}
            required
            placeholder="State..."
          />
        </div>

        <div className="multi-fields">
          <input
            type="text"
            name="zip"
            onChange={(e) => handleChange(e, "orderVals")}
            value={zip}
            required
            placeholder="Zip code..."
          />
          <input
            type="text"
            name="country"
            onChange={(e) => handleChange(e, "orderVals")}
            value={country}
            required
            placeholder="Country..."
          />
        </div>

        <input
          type="text"
          name="phone"
          onChange={(e) => handleChange(e, "orderVals")}
          value={phone}
          required
          placeholder="Phone number..."
        />
      </div>

      <div className="place-order-right">
        <CartTotal>
          <button type="submit">
            {orderLoading ? "PLACING ORDER..." : "PROCEED TO PAYMENT"}
          </button>
        </CartTotal>
      </div>
    </form>
  );
};
export default PlaceOrder;
