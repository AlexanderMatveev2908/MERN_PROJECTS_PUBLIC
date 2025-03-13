import Item from "../../components/Item/Item";
import Spinner from "../../components/Spinner/Spinner";
import { useFoodContext } from "../../hooks/useFoodContext";
import "./List.css";

const List = () => {
  const { list, isListLoading } = useFoodContext();

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {isListLoading ? (
          <Spinner style={{ width: "100%" }} />
        ) : (
          list.map((item) => <Item key={item._id} {...item} />)
        )}
      </div>
    </div>
  );
};
export default List;
