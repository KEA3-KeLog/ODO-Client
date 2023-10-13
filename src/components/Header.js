import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Header.module.css';
import {useNavigate} from "react-router-dom";

function Header() {
    let navigate = useNavigate()

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container className={styles[`header-content`]}>
                    <Navbar.Brand onClick={() => { navigate('/') }}>
                        <img
                            alt="logo_ODO"
                            src={require('../assets/logo.png')}
                            width="180px"
                        />
                    </Navbar.Brand>
                    <input
                        type={"button"}
                        className={styles[`icon-profile-button`]}
                        onClick={()=>{console.log("아이콘버튼클릭")}}
                    />
                    <Nav.Link
                        className={styles.navigate}
                        onClick={() => { navigate('/') }}>메인페이지</Nav.Link>
                    <Nav.Link
                        className={styles.navigate}
                        onClick={() => { navigate('/') }}>상점</Nav.Link>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;