import React, { useState, useEffect } from 'react';
import { Layout, Menu, Row, Col, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logoweb.png';
import { SearchOutlined, UserOutlined, UpOutlined } from '@ant-design/icons';
import '../style/HeaderApp.css'; // Đảm bảo đường dẫn đến file CSS là chính xác

const { Header } = Layout;

const HeaderApp = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const navigate = useNavigate();

    const itemLogin = [
        {
            key: 'login',
            icon: <UserOutlined />,
            label: 'Login',
        },
    ];

    const handleSearchClick = () => {
        setSearchVisible(prev => !prev);
    };

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setInputFocused(false);
            setSearchVisible(false);
        }, 300);
    };

    const items = [
        {
            key: '',
            label: <img src={logo} alt="Home Icon" style={{ height: '50px' }} />,
        },
        {
            key: '',
            label: 'Trang chủ',
        },
        {
            key: 'search',
            label: (
                <div className={`search-container ${searchVisible ? 'active' : ''}`}>
                    <div className="search-wrapper">
                        <SearchOutlined
                            className="search-icon"
                            onClick={handleSearchClick}
                        />
                        {searchVisible && (
                            <Input
                                className="animated-input"
                                placeholder="Search..."
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                autoFocus
                            />
                        )}
                    </div>
                </div>
            ),
            children: inputFocused ? [
                {
                    key: 'phim-moi',
                    label: 'Phim Mới',
                },
                {
                    key: 'phim-kinh-di',
                    label: 'Phim Kinh Dị',
                },
                {
                    key: 'phim-hanh-dong',
                    label: 'Phim Hành Động',
                },
                {
                    key: 'phim-ngan',
                    label: 'Phim Ngắn',
                },
                {
                    key: 'phim-le',
                    label: 'Phim Lẻ',
                },
            ] : [],
        },
    ];

    const onClick = (e) => {
        navigate(`/${e.key}`);
    };

    // Hàm cuộn lên đầu trang
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Hiển thị nút khi cuộn xuống
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Layout>
            <Header className="header-taskbar">
                <Row style={{ width: '100%' }}>
                    <Col flex="auto">
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            items={items}
                            onClick={onClick}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                borderBottom: 'none',
                                width: '100%',
                            }}
                        />
                    </Col>
                    <Col flex="none">
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            items={itemLogin}
                            onClick={onClick}
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                borderBottom: 'none',
                            }}
                        />
                    </Col>
                </Row>
            </Header>
            <button
                className={`scroll-to-top ${showScrollButton ? 'show' : ''}`}
                onClick={scrollToTop}
            >
                <UpOutlined />
            </button>
        </Layout>
    );
};

export default HeaderApp;
