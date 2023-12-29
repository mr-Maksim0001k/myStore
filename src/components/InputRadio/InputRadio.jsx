import s from "./InputRadio.module.scss";

const inputCategory = [
  "Все о товаре",
  "Характеристики",
  "Отзывы",
  "Вопросы",
  "Видео",
];

const InputRadio = ({ onChange, value }) => {
  return (
    <div className={s.input_wrapper}>
      <div className={s.content}>
        {inputCategory.map((element) => {
          return (
            <div className={s.input_container} key={element}>
              <input
                checked={value === element}
                onChange={onChange}
                name="category"
                id={element}
                type="radio"
              />
              <label htmlFor={element}>{element}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputRadio;
