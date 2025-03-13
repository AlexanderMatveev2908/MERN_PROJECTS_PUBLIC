import PropTypes from "prop-types";
import {
  placeOrderFields,
  singleRowNames,
  styleInput,
} from "./placeOrderFields";

const Fields = ({ placeOrderForm, handleChangePlaceForm }) => {
  const content = placeOrderFields.map((field, i) => {
    const isStartRow = i % 2 === 0;

    if (singleRowNames.includes(field.name))
      return (
        <input
          key={field._id}
          type={field.type}
          name={field.name}
          value={placeOrderForm[field.name]}
          onChange={handleChangePlaceForm}
          placeholder={field.placeholder}
          className={styleInput}
          required
        />
      );

    if (isStartRow)
      return (
        <div key={field._id} className="flex gap-3">
          <input
            type={field.type}
            name={field.name}
            value={placeOrderForm[field.name]}
            onChange={handleChangePlaceForm}
            placeholder={field.placeholder}
            className={styleInput}
            required
          />
          {placeOrderFields[i + 1] &&
            !singleRowNames.includes(placeOrderFields[i + 1].name) && (
              <input
                type={placeOrderFields[i + 1].type}
                name={placeOrderFields[i + 1].name}
                value={placeOrderForm[placeOrderFields[i + 1].name]}
                onChange={handleChangePlaceForm}
                placeholder={placeOrderFields[i + 1].placeholder}
                className={styleInput}
                required
              />
            )}
        </div>
      );

    return null;
  });

  return content;
};

Fields.propTypes = {
  placeOrderForm: PropTypes.object.isRequired,
  handleChangePlaceForm: PropTypes.func.isRequired,
};

export default Fields;
