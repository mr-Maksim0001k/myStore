import s from "./Footer.module.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import masterCardSvg from "../../assets/svg/mastercard-logo.svg";
import visaCardSvg from "../../assets/svg/visa-logo.svg";
import { useEffect, useState } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const Footer = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const checkIfUserAtBottom = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const buffer = 100; // Или любое другое значение по вашему усмотрению

    setIsAtBottom(scrollTop + windowHeight >= documentHeight - buffer);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkIfUserAtBottom);
    return () => {
      window.removeEventListener("scroll", checkIfUserAtBottom);
    };
  }, []);

  return (
    <div className={s.container}>
      <div className={s.navBar}>
        <h3 className={s.titleFooter}>Скачивайие приложения</h3>
      </div>
      <div className={s.wrapper}>
        <div className={s.columnSocialBlock}>
          <div className={s.rowSocialBlock}>
            <h3>Информация о компании</h3>
            <div className={s.iconsContainer}>
              <li>
                <InstagramIcon />
              </li>
              <li>
                <FacebookIcon />
              </li>
              <li>
                <YouTubeIcon />
              </li>
              <li>
                <TwitterIcon />
              </li>
            </div>
          </div>
        </div>

        <div className={s.column}>
          <div className={s.row}>
            <h3>Информация о компании</h3>
            <li>О нас</li>
            <li>Условия использования сайта</li>
            <li>Вакансии</li>
            <li>Все категории</li>
            <li>ROZETKA.PL</li>
          </div>
        </div>
        <div className={s.column}>
          <div className={s.row}>
            <h3>Информация о компании</h3>
            <li>Доставка и оплата</li>
            <li>Кредит</li>
            <li>Гарантия</li>
            <li>Возврат товара</li>
            <li>Сервисные центры</li>
          </div>
        </div>
        <div className={s.column}>
          <div className={s.row}>
            <h3>Информация о компании</h3>
            <li>Бонусный счёт</li>
            <li>Подарочные сертификаты</li>
            <li>Rozetka Обмен</li>
            <li>Корпоративным клиентам</li>
          </div>
        </div>
        <div className={s.column}>
          <div className={s.row}>
            <h3>Информация о компании</h3>
            <li>Бонусный счёт</li>
            <li>Подарочные сертификаты</li>
            <li>Rozetka Обмен</li>
            <li>Корпоративным клиентам</li>
          </div>
        </div>
        <div className={s.column}>
          <div className={s.row}>
            <h3>Продавать на Розетке</h3>
            <li>Сотрудничество с нами</li>
            <li>Франчайзинг</li>
            <li>Аренда помещений</li>
          </div>
        </div>
      </div>
      <div className={s.bottomFooterSection}>
        <div className={s.containerSvg}>
          <img
            className={s.masterCardSvg}
            src={masterCardSvg}
            alt="mastercard"
          />
          <img className={s.visaCardSvg} src={visaCardSvg} alt="visacard" />
        </div>
        <p className={s.footerCopyright}>
          © 2023 Интернет-магазин «myStore™» — используется на основании
          лицензии правообладателя myStoreTeam
        </p>
      </div>
      {isAtBottom && (
        <ArrowCircleUpIcon
          className={s.arrowUpIcon}
          color="primary"
          onClick={scrollToTop}
        />
      )}
    </div>
  );
};

export default Footer;
