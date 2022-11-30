import CategoryItem from "../category-item/category-item.component.jsx";
import "./menu.styles.scss";

const Menu = ({ categories }) => {
  return (
    <div className="menu-container">
      {categories.map((category) => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};

export default Menu;
