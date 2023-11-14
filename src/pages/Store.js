import "./Store.css";
import StoreContent from "../components/StoreContent";
import NavBar from '../components/Navigationbar';
import React from "react";
import ResizedComponent from "../components/ResizedComponent";

function Store() {
    return (
        <>
            <NavBar />
            <div className="screen">
                <div className="banner">
                    <div className="text-wrapper">상점</div>
                    <img className="icon-shop-store"
                         alt="Icon shop store"
                         src={require("../assets/icon_shopstore_black.svg").default}
                    />
                </div>
                <div className={"show-point"}>
                    <div className="show-point-text">보유
                        <img className={"icon-point"}
                             alt={""}
                             src={require("../assets/icon_point_black.svg").default}
                        />
                    </div>
                    <div className="text-wrapper-16">1,150 점</div>
                </div>
                <StoreContent/>
            </div>
        </>
    );
}

export default Store;