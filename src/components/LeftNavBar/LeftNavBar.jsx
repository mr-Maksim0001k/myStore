import { useState } from "react";
import { Link } from "react-router-dom";
import s from "./LeftNavBar.module.scss";
import { categories } from "../category";

const LeftNavBar = () => {
  const [activeCategories, setActiveCategories] = useState(new Set());

  const handleCategoryClick = (categoryId) => {
    if (activeCategories.has(categoryId)) {
      activeCategories.delete(categoryId);
    } else {
      activeCategories.add(categoryId);
    }
    setActiveCategories(new Set(activeCategories));
  };

  const renderSubcategories = (subcategories, parentId = "") => {
    return (
      <ul className={s.subcategories}>
        {subcategories.map((subcategory) => (
          <li key={subcategory.id}>
            <div onClick={() => handleCategoryClick(subcategory.id)}>
              <Link
                className={s.subcategoriesLi}
                to={`/category/${parentId}/${subcategory.id}`}
              >
                {subcategory.name}
              </Link>
            </div>
            {activeCategories.has(subcategory.id) &&
              subcategory.subcategories &&
              renderSubcategories(
                subcategory.subcategories,
                `${parentId}/${subcategory.id}`
              )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={s.container}>
      <ul className={s.category_menu}>
        {categories.map((category) => (
          <li key={category.id}>
            <div onClick={() => handleCategoryClick(category.id)}>
              <Link to={`/category/${category.id}`}>{category.name}</Link>
            </div>
            {activeCategories.has(category.id) &&
              category.subcategories &&
              renderSubcategories(category.subcategories, category.id)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftNavBar;
