import { NavLink } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useState, useEffect } from "react";
import logo from "/logo/logo.png";
import logoMobile from "/logo/logo_mobile.png";
import profileImg from "/icons/profile.png";
import {
  HeaderStyle,
  LogoStyle,
  ProfileImgStyle,
  LinkWrapperStyle,
} from "./Header.styles";

function Header() {
  const [logoImg, setLogoImg] = useState(logo);
  const [logoSize, setLogoSize] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLogoImg(logoMobile);
        setLogoSize(false);
      } else {
        setLogoImg(logo);
        setLogoSize(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header css={HeaderStyle}>
      <div css={LogoStyle}>
        <Logo
          srcLogo={logoImg}
          variant={logoSize ? "homeDesktop" : "homeMobile"}
        />
        <div css={LinkWrapperStyle}>
          <NavLink to="/board">자유게시판</NavLink>
          <NavLink to="/items">중고마켓</NavLink>
        </div>
      </div>
      <img css={ProfileImgStyle} src={profileImg} alt="프로필 이미지" />
    </header>
  );
}

export default Header;
